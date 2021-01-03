import axios from '@/plugins/axios'
import alert from '@/plugins/alert'
import api from '@/plugins/api'
import _ from 'lodash'
const PRODUCT_API = '/students/'
export default {
  namespaced: true,
  state: {
    students: [],
    student: null,
    loading: false,
    grade: {
      // code: grade
    },
    generations: {
      // code: grade
    },
    classes: {}
  },
  actions: {
    async fetchGrades({ commit }, options) {
      const gradeList = await api.Grade.fetch(options)
      commit('changeState', { grade: _.keyBy(gradeList, 'code') })
    },
    async fetchClasses({ commit }, options) {
      const classes = await api.Class.fetch(options)
      console.log(classes)
      commit('changeState', { classes: _.keyBy(classes, 'title') })
    },
    async fetchGenerations({ commit }, options) {
      const generationList = await api.Generation.fetch(options)
      commit('changeState', { generations: _.keyBy(generationList, 'code') })
    },
    async createStudent({ state, dispatch, commit }, userData) {
      let user = {}
      try {
        user = await api.User.create({ ...userData, type: 'student' })
      } catch (e) {
        commit('receiveStudent', { ...userData, uploadStatus: 'failed' })
        return
      }
      try {
        await api.Student.create({
          ...userData,
          user: user.id,
          code: userData.username
        })
        commit('receiveStudent', {
          ...userData,
          uploadStatus: 'success'
        })
      } catch (e) {
        await api.User.remove(user.id)
        commit('receiveStudent', { ...userData, uploadStatus: 'failed' })
      }
    },
    async validateStudents({ commit, state, dispatch }) {
      commit('setLoading', true)
      for (let student of state.students) {
        student.uploadStatus = 'validate'
        commit('receiveStudent', student)
        let duplicate = {}
        if (student.email) {
          duplicate.email =
            (await api.Student.count({ email: student.email })) > 0
        }
        if (student.phone) {
          duplicate.phone =
            (await api.Student.count({ phone: student.phone })) > 0
        }

        if (duplicate.phone || duplicate.email) {
          student.uploadStatus = 'duplicated'
          student.duplicated = duplicate
        } else {
          student.uploadStatus = 'ready'
          student = {
            ...student
          }
        }

        commit('receiveStudent', student)
      }
      commit('setLoading', false)
      alert.success('Students Validated')
    },
    async migrateStudents({ commit, state, rootState, dispatch }) {
      commit('setLoading', true)
      for (const student of state.students) {
        if (student.uploadStatus === 'duplicated') continue
        student.uploadStatus = 'loading'
        commit('receiveStudent', student)

        if (student.username) {
          await dispatch('createStudent', {
            ...student,
            name: student.name.trim(),
            phone: student.phone + '',
            email: student.email
              ? student.email
              : `random${Date.now()}@quanlylop.com`
          })
        } else {
          const { username, username_indexing, username_no } = await dispatch(
            'user/generateStudentCode',
            student.name,
            {
              root: true
            }
          )
          await dispatch('createStudent', {
            ...student,
            name: student.name.trim(),
            phone: student.phone + '',
            email: student.email
              ? student.email
              : `random${Date.now()}@quanlylop.com`,
            username,
            username_indexing,
            username_no,
            gender: student.gender === 'Nữ' ? 'female' : 'male',
            data: { ...student }
          })
        }
      }
      commit('setLoading', false)
      alert.success('Student updated')
    },
    removeStudent({ commit }, id) {
      return axios
        .delete(PRODUCT_API + id)
        .then(student => {
          commit('removeDep', student.id)
        })
        .catch(e => console.log(e))
    },
    async removeStudents({ dispatch }, ids) {
      for (let id of ids) {
        await dispatch('removeStudent', id)
      }
    },
    setCurrentStudent({ commit }, student) {
      commit('setStudent', student)
    },
    setStudents({ commit }, students) {
      commit('setStudents', students)
    },
    clearStudents({ commit }) {
      commit('setStudents', [])
    }
  },
  mutations: {
    setStudents(state, deps) {
      state.students = deps
    },
    setLoading(state, loading) {
      state.loading = loading
    },
    setStudent(state, dep) {
      state.student = dep
    },
    receiveStudent(state, dep) {
      const i = state.students.findIndex(d => d.key === dep.key)
      if (i > -1) {
        state.students.splice(i, 1, dep)
      } else {
        state.students.unshift(dep)
      }
    },
    removeStudent(state, id) {
      const i = state.students.findIndex(d => d.id === id)
      if (i > -1) {
        state.students.splice(i, 1)
      }
    }
  },
  getters: {
    students(state) {
      return state.students
    },
    classes(state) {
      return state.classes
    },
    loading(state) {
      return state.loading
    },
    grade(state) {
      return state.grade
    },
    generations(state) {
      return state.generations
    },
    student: state => key =>
      state.migrateStudents.findIndex(student => student.key === key)
  }
}
