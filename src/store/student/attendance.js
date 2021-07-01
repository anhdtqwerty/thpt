// import axios from '@/plugins/axios'
import alert from '@/plugins/alert'
import { Attendance, Student } from '@/plugins/api'
import loading from '../../plugins/loading'
import { keyBy, rangeRight } from 'lodash'
import moment from 'moment'

export default {
  namespaced: true,
  state: {
    attendances: {},
    pageText: '',
    itemsPerPage: 10,
    searchParams: {},
    totalItems: 0,
    studentAttendances: []
  },
  actions: {
    async searchAttendances({ commit, state, dispatch }, query) {
      const searchParams = {
        _limit: state.itemsPerPage,
        ...query
      }

      commit('changeState', { searchParams })
      dispatch('requestPageSettings', {})
    },
    async requestPageSettings({ state, commit, dispatch }, { page, itemsPerPage }) {
      loading.active = true
      if (!page) page = 1
      if (!itemsPerPage) itemsPerPage = state.itemsPerPage
      if (state.searchParams) {
        const searchParams = {
          ...state.searchParams,
          _start: (page - 1) * itemsPerPage,
          _limit: itemsPerPage,
          _sort: 'createdAt:DESC'
        }
        const [totalItems, attendances] = await Promise.all([
          Attendance.count(searchParams),
          Attendance.search(searchParams)
        ])

        if (totalItems > (page - 1) * itemsPerPage || page === 1) {
          commit('changeState', {
            attendances: keyBy(attendances, 'id'),
            totalItems,
            itemsPerPage,
            searchParams
          })

          const pageStart = (page - 1) * itemsPerPage + 1
          let pageStop = page * itemsPerPage
          pageStop = pageStop > totalItems || pageStop === -1 ? totalItems : pageStop
          const pageText = `${pageStart}-${pageStop} trên ${totalItems}`
          commit('changeState', { pageText })
        } else {
          var pages = rangeRight(1, page)
          for (let index = 0; index < pages; index++) {
            const selectedPage = pages[index]
            if (totalItems > (selectedPage - 1) * itemsPerPage) {
              dispatch('requestPageSettings', {})
              break
            }
          }
        }
      }

      loading.active = false
    },

    async fetchAttendances({ commit }, options) {
      commit('setAttendances', await Attendance.fetch(options))
    },
    async fetchStudentAttendances({ commit }, query) {
      const studentParams = {
        status: 'active',
        _limit: -1
      }
      console.log('qery', query)
      if (query) {
        if (query.class) studentParams.currentClass = query.class.id
        if (query.grade) studentParams.grade = query.grade
      }
      const students = await Student.fetch(studentParams)

      const time = moment()
        .startOf('day')
        .toISOString()
      const attendanceParam = {
        time_gte: time,
        _limit: -1
      }

      const attendances = await Attendance.fetch(attendanceParam)

      let studentAttendances = students.map(student => {
        const attendance = attendances.find(a => a.student.id === student.id)
        return { student, attendance }
      })

      if (query && query.status) {
        if (query.status === 'attendance') studentAttendances = studentAttendances.filter(sa => sa.attendance)
        else studentAttendances = studentAttendances.filter(sa => !sa.attendance)
      }

      commit('changeState', { studentAttendances })
    },
    async checkinAttendance({ commit }, data) {
      commit('setAttendance', await Attendance.checkin(data))
    },
    async createAttendance({ commit }, data) {
      try {
        commit('setAttendance', await Attendance.create(data))
      } catch (e) {
        alert.error(e)
      }
    },
    async updateAttendance({ commit }, { id, ...attendance }) {
      commit('updateAttendance', await Attendance.update(id, attendance))
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
    },
    setAttendance(state, attendance) {
      console.log('attendance', attendance)
      state.attendances = {
        ...state.attendances,
        [attendance.id]: attendance
      }
    },
    updateAttendance(state, attendance) {
      const attendances = Object.values(state.attendances).map(a => {
        if (attendance.id === a.id) return attendance
        else return a
      })
      state.attendances = keyBy(attendances, 'id')
    }
  },
  getters: {
    attendances: state => {
      return Object.values(state.attendances)
    }
  }
}
