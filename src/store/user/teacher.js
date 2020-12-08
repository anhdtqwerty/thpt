/* eslint-disable vue/valid-v-slot */
import axios from '@/plugins/axios'
import alert from '@/plugins/alert'
import { Teacher, User } from '@/plugins/api'

const UPLOAD_API = '/upload/'
const DESTROY_API = '/upload/files/'

export default {
  namespaced: true,
  state: {
    teachers: {},
    count: 0,
    avatar: {}
  },
  actions: {
    uploadAvatar({ commit }, formData) {
      return axios
        .post(UPLOAD_API, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(response => {
          commit('setAvatar', response[0])
          alert.success('Upload successfully!')
        })
        .catch(e => alert.error(e))
    },
    destroyAvatar({ commit }, id) {
      return axios
        .delete(DESTROY_API + id)
        .then(staff => {
          console.log('Remove success')
        })
        .catch(e => alert.error(e))
    },
    async fetchTeachers({ commit }, options) {
      commit('setTeachers', await Teacher.fetch(options))
    },
    async countTeachers({ commit }, options) {
      commit('setCount', await Teacher.count(options))
    },
    async fetchTeacher({ commit }, teacherId) {
      commit('setTeacher', await Teacher.fetchOne(teacherId))
    },
    async createTeacher({ commit }, { data }) {
      try {
        const user = await User.create({ ...data })
        if (user) {
          data.user = user.id
          data.code = user.username
          commit('setTeacher', await Teacher.create({ ...data }))
          alert.success('Tạo Giáo Viên Thành Công!')
        } else {
          alert.error('Tạo Thất Bại!')
        }
      } catch (error) {
        console.error(error)
      }
    },
    async removeTeacher({ commit }, teacher) {
      if (teacher.user) {
        await User.remove(teacher.user)
      }
      await Teacher.remove(teacher.id)
      commit('removeTeacher', teacher.id)
      alert.success('Xóa thành công!')
    },
    setTeacher({ commit, state }, teacher) {
      commit('setTeacher', teacher)
    },
    async removeTeachers({ dispatch }, items) {
      await Promise.all(items.map(item => dispatch('removeTeacher', item)))
    },
    async updateTeachers({ dispatch }, items) {
      await Promise.all(
        items.map(item => dispatch('updateTeacher', { data: item }))
      )
    },

    async updateTeacher({ commit }, { id, ...teacher }) {
      const updatedMajor = await Teacher.update(id, teacher)
      commit('changeDeepState', {
        teacher: {
          [teacher.id]: updatedMajor
        }
      })
      alert.success('Cập nhật thành công!')
    }
  },
  mutations: {
    setTeachers(state, teachers) {
      state.teachers = teachers.reduce(
        (accumulator, currentValue) => ({
          ...accumulator,
          [currentValue.id]: currentValue
        }),
        {}
      )
    },
    setTeacher(state, teacher) {
      state.teachers = {
        ...state.teachers,
        [teacher.id]: teacher
      }
    },
    removeTeacher(state, teacherId) {
      delete state.teachers[teacherId]
      state.teachers = { ...state.teachers }
    },
    setCount(state, count) {
      state.count = count
    },
    setAvatar(state, avatar) {
      state.teacher = {
        ...state.teacher,
        avatar: avatar
      }
      state.avatar = avatar
    }
  },
  getters: {
    teachers: state => {
      return Object.values(state.teachers)
    },
    teacher: state => id => {
      return state.teachers[id]
    },
    count: state => {
      return state.count
    },
    avatar: state => {
      return state.avatar
    }
  }
}
