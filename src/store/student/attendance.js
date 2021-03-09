// import axios from '@/plugins/axios'
import alert from '@/plugins/alert'
import { Attendance } from '@/plugins/api'

export default {
  namespaced: true,
  state: {
    attendances: {}
  },
  actions: {
    async fetchAttendances({ commit }, options) {
      commit('setAttendances', await Attendance.fetch(options))
    },
    async checkinAttendance({ commit }, data) {
      try {
        commit('setAttendance', await Attendance.checkin(data))
        alert.success('Điểm danh thành công')
      } catch (e) {
        alert.error(e)
      }
    },
    async createAttendance({ commit }, data) {
      try {
        commit('setAttendance', await Attendance.create(data))
      } catch (e) {
        alert.error(e)
      }
    },
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
    },
    setAttendance(state, attendance) {
      state.attendances = {
        ...state.attendances,
        [attendance.id]: attendance
      }
    },
  },
  getters: {
    attendances: state => {
      return Object.values(state.attendances)
    }
  }
}
