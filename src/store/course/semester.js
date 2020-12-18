import alert from '@/plugins/alert'
import { Semester } from '@/plugins/api'
// import _ from 'lodash'

export default {
  namespaced: true,
  state: {
    semesters: {}
  },
  actions: {
    async fetchSemesters({ commit }, options) {
      try {
        commit('setSemesters', await Semester.fetch(options))
      } catch (e) {
        alert.error(e)
      }
    },
    async searchSemesters({ commit }, query) {
      const semesterSearchParams = {
        ...query
      }

      commit('changeState', { semesterSearchParams })
    },
  },
  mutations: {
    setSemesters(state, semesters) {
      state.semesters = semesters.reduce(
        (accumulator, currentValue) => ({
          ...accumulator,
          [currentValue.id]: currentValue
        }),
        {}
      )
    }
  },
  getters: {
    semesters: state => {
      return Object.values(state.semesters)
    }
  }
}
