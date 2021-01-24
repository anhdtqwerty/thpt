// import axios from '@/plugins/axios'
// import alert from '@/plugins/alert'
import { Attendance } from '@/plugins/api'

export default {
  namespaced: true,
  state: {
    attendances: {}
  },
  actions: {
    async fetchAttendances({ commit }, options) {
      commit('setAttendances', await Attendance.fetch(options))
    }
  },
  mutations: {
    setAttendances(state, attendances) {
      state.attendances = attendances.reduce(
        (accumulator, currentValue) => ({
          ...accumulator,
          [currentValue.id]: currentValue
        }),
        {}
      )
    }
  },
  getters: {
    attendances: state => {
      return Object.values(state.attendances)
    }
  }
}
