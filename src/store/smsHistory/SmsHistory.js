import { History } from '@/plugins/api'
import _ from 'lodash'
import loading from '../../plugins/loading'

export default {
  namespaced: true,
  state: {
    historiesData: [],
    pageText: '',
    itemsPerPage: 10,
    searchParams: {},
    totalItems: 0
  },
  actions: {
    async searchHistories({ commit, state, dispatch }, query) {
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
        const [totalItems, historiesData] = await Promise.all([
          History.count(searchParams),
          History.search(searchParams)
        ])

        if (totalItems > (page - 1) * itemsPerPage || page === 1) {
          commit('changeState', {
            historiesData,
            totalItems,
            itemsPerPage,
            searchParams
          })

          const pageStart = (page - 1) * itemsPerPage + 1
          let pageStop = page * itemsPerPage
          pageStop = pageStop > totalItems || pageStop === -1 ? totalItems : pageStop
          const pageText = `${pageStart}-${pageStop} trên ${totalItems}`
          commit('setPageText', pageText)
        } else {
          var pages = _.rangeRight(1, page)
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
    }
  },
  mutations: {
    setPageText(state, pageText) {
      state.pageText = pageText
    }
  },
  getters: {}
}
