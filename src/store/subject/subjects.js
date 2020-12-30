import { Subject } from '@/plugins/api'
import alert from '@/plugins/alert'
export default {
  namespaced: true,
  state: {
    subjects: [],
    subject: {}
  },
  actions: {
    async fetchSubjects({ commit }, options) {
      try {
        commit('setSubjects', await Subject.fetch(options))
      } catch (error) {
        alert.error(error)
      }
    },
    async fetchSubject({ commit }, id) {
      try {
        commit('setSubject', await Subject.fetchOne(id))
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
        const res = await Subject.update(id, subject)
        commit('updateSubject', { id, subject: res })
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
    setSubject(state, subject) {
      state.subject = subject
    },
    updateSubject(state, { subject, id }) {
      state.subjects = state.subjects.map(g => {
        if (g.id === id) return subject
        else return g
      })
      state.subject = subject
    },
    createSubject(state, subject) {
      state.subjects = [subject, ...state.subjects]
    },
    removeSubject(state, id) {
      state.subjects = state.subjects.filter(subject => subject.id !== id)
    }
  }
}
