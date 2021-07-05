// import axios from '@/plugins/axios'
import { Attendance } from '@/plugins/api'
import { rangeRight } from 'lodash'

export default {
  namespaced: true,
  state: {
    attendances: [],
    pageText: '',
    itemsPerPage: 10,
    searchParams: {},
    totalItems: 0
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
            attendances,
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
    },
    async fetchAttendances({ commit }, query) {
      const attendances = await Attendance.fetch(query)
      commit('changeState', { attendances })
    }
  },
  mutations: {},
  getters: {}
}
