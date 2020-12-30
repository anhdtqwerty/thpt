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
    majors: {
      // code: major
    },
    generations: {
      // code: major
    }
  },
  actions: {
    async fetchMajors({ commit }, options) {
      const majorList = await api.Major.fetch(options)
      commit('changeState', { majors: _.keyBy(majorList, 'code') })
    },
    async fetchGenerations({ commit }, options) {
      const generationList = await api.Generation.fetch(options)
      commit('changeState', { generations: _.keyBy(generationList, 'code') })
    },
    async createStudent({ state, dispatch, commit }, userData) {
      delete userData.major
      let user = {}
      try {
        user = await api.User.create({ ...userData })
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
          // eslint-disable-next-line
          const {
            username,
            username_indexing,
            username_no
          } = await dispatch('user/generateUserName', student.name, {
            root: true
          })
          student = {
            ...student,
            email: student.email ? student.email : `${username}@quanlylop.com`,
            username,
            username_indexing,
            username_no
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
        await dispatch('createStudent', {
          ...student,
          name: student.name.trim(),
          phone: student.phone + '',
          rootMajor: _.get(student, '.major.root.id'),
          generation: _.get(student, 'generation.id'),
          majors: [_.get(student, 'major.id')].filter(i => !!i)
        })
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
    loading(state) {
      return state.loading
    },
    majors(state) {
      return state.majors
    },
    generations(state) {
      return state.generations
    },
    student: state => key =>
      state.migrateStudents.findIndex(student => student.key === key)
  }
}
