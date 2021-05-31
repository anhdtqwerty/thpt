import { SubjectGroup } from '@/plugins/api'
import alert from '@/plugins/alert'
export default {
  namespaced: true,
  state: {
    subjectGroups: []
  },
  actions: {
    async fetchSubjectGroups({ commit }, options) {
      try {
        commit('setSubjectGroups', await SubjectGroup.fetch(options))
      } catch (error) {
        alert.error(error)
      }
    },
    async createSubjectGroup({ commit }, data) {
      try {
        commit('createSubjectGroup', await SubjectGroup.create(data))
      } catch (e) {
        alert.error(e)
      }
    },
    async removeSubjectGroup({ commit }, id) {
      await SubjectGroup.remove(id)
      commit('removeSubjectGroup', id)
    },
    async updateSubjectGroup({ commit }, { id, ...subjectGroup }) {
      const g = await SubjectGroup.update(id, subjectGroup)
      commit('updateSubjectGroup', g)
    }
  },
  mutations: {
    setSubjectGroups(state, subjectGroups) {
      state.subjectGroups = subjectGroups
    },
    updateSubjectGroup(state, subjectGroup) {
      state.subjectGroups = state.subjectGroups.map(g => {
        if (subjectGroup.id === g.id) return subjectGroup
        else return g
      })
    },
    createSubjectGroup(state, subjectGroup) {
      state.subjectGroups = [subjectGroup, ...state.subjectGroups]
    },
    removeSubjectGroup(state, id) {
      state.subjectGroups = state.subjectGroups.filter(subjectGroup => subjectGroup.id !== id)
    }
  }
}
