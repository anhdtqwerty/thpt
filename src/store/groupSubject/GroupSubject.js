import { GroupSubject } from '@/plugins/api'
import alert from '@/plugins/alert'
export default {
  namespaced: true,
  state: {
    groupSubjects: []
  },
  actions: {
    async fetchGroupSubjects({ commit }, options) {
      try {
        commit('setGroupSubjects', await GroupSubject.fetch(options))
      } catch (error) {
        alert.error(error)
      }
    },
    async createGroupSubject({ commit }, data) {
      try {
        commit('createGroupSubject', await GroupSubject.create(data))
      } catch (e) {
        alert.error(e)
      }
    },
    async removeGroupSubject({ commit }, id) {
      await GroupSubject.remove(id)
      commit('removeGroupSubject', id)
    },
    async updateGroupSubject({ commit }, { id, ...grade }) {
      const g = await GroupSubject.update(id, grade)
      commit('updateGroupSubject', g)
    }
  },
  mutations: {
    setGroupSubjects(state, groupSubjects) {
      state.groupSubjects = groupSubjects
    },
    updateGroupSubject(state, grade) {
      state.groupSubjects = state.groupSubjects.map(g => {
        if (grade.id === g.id) return grade
        else return g
      })
    },
    createGroupSubject(state, grade) {
      state.groupSubjects = [grade, ...state.groupSubjects]
    },
    removeGroupSubject(state, id) {
      state.groupSubjects = state.groupSubjects.filter(grade => grade.id !== id)
    }
  }
}
