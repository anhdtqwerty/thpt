import alert from '@/plugins/alert'
import { Semester } from '@/plugins/api'

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
    async createSemester({ commit }, data) {
      try {
        commit('setSemester', await Semester.create(data))
      } catch (e) {
        alert.error(e)
      }
    },
    async removeSemester({ commit }, id) {
      try {
        await Semester.remove(id)
        commit('removeSemester', id)
        alert.success('Xóa thành công!')
      } catch (e) {
        alert.error(e)
      }
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
    },
    setSemester(state, semester) {
      state.semesters = {
        ...state.semesters,
        [semester.id]: semester
      }
    },
    removeSemester(state, semesterId) {
      delete state.semesters[semesterId]
      state.semesters = { ...state.semesters }
    },
  },
  getters: {
    semesters: state => {
      return Object.values(state.semesters)
    }
  }
}
