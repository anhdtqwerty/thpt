import { Subject } from '@/plugins/api'
import alert from '@/plugins/alert'
export default {
  namespaced: true,
  state: {
    subjects: []
  },
  actions: {
    async fetchSubjects({ commit }, options) {
      try {
        commit('setSubjects', await Subject.fetch(options))
      } catch (error) {
        alert.error(error)
      }
    },
    async createSubject({ commit }, data) {
      try {
        commit('createSubject', await Subject.create(data))
      } catch (e) {
        alert.error(e)
      }
    },
    async removeSubject({ commit }, id) {
      try {
        await Subject.remove(id)
        commit('removeSubject', id)
        alert.success('Xóa thành công!')
      } catch (e) {
        alert.error(e)
      }
    },
    async updateSubject({ commit }, { id, ...subject }) {
      try {
        await Subject.update(id, subject)
        commit('updateSubject', id, subject)
        alert.success('Cập nhật thành công!')
      } catch (e) {
        alert.error(e)
      }
    }
  },
  mutations: {
    setSubjects(state, subjects) {
      state.subjects = subjects
    },
    updateSubject(state, subject) {
      state.subjects = state.subjects.map(g => {
        if (g.id === subject.id) return subject
        else return g
      })
    },
    createSubject(state, subject) {
      state.subjects = [subject, ...state.subjects]
    },
    removeSubject(state, id) {
      state.subjects = state.subjects.filter(subject => subject.id !== id)
    }
  }
}
