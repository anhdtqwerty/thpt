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
    async updateGroupSubject({ commit }, { id, ...groupSubject }) {
      const g = await GroupSubject.update(id, groupSubject)
      commit('updateGroupSubject', g)
    }
  },
  mutations: {
    setGroupSubjects(state, groupSubjects) {
      state.groupSubjects = groupSubjects
    },
    updateGroupSubject(state, groupSubject) {
      state.groupSubjects = state.groupSubjects.map(g => {
        if (groupSubject.id === g.id) return groupSubject
        else return g
      })
    },
    createGroupSubject(state, groupSubject) {
      state.groupSubjects = [groupSubject, ...state.groupSubjects]
    },
    removeGroupSubject(state, id) {
      state.groupSubjects = state.groupSubjects.filter(groupSubject => groupSubject.id !== id)
    }
  }
}
