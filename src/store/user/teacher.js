/* eslint-disable vue/valid-v-slot */
import axios from '@/plugins/axios'
import alert from '@/plugins/alert'
import { Teacher, User } from '@/plugins/api'

const UPLOAD_API = '/upload/'
const DESTROY_API = '/upload/files/'

export default {
  namespaced: true,
  state: {
    teacher: {},
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
          alert.success('Remove success')
          commit('setAvatar', null)
        })
        .catch(e => alert.error(e))
    },
    async fetchTeacher({ commit }, teacherId) {
      commit('setTeacher', null)
      const teacher = await Teacher.fetchOne(teacherId)
      commit('setTeacher', teacher)
    },
    async removeTeacher({ commit }, teacher) {
      if (teacher.user) {
        await User.remove(teacher.user)
      }
      await Teacher.remove(teacher.id)
      commit('removeTeacher', teacher.id)
      alert.success('Xóa thành công!')
    },
    async updateTeacher({ commit }, { id, ...teacher }) {
      commit('setTeacher', await Teacher.update(id, teacher))
      alert.success('Cập nhật thành công!')
    }
  },
  mutations: {
    setTeacher(state, teacher) {
      state.teacher = teacher
    },
    removeTeacher(state, teacherId) {
      state.teacher = null
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
    avatar: state => {
      return state.avatar
    }
  }
}
