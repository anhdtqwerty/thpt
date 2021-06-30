import { Violation } from '@/plugins/api'
import alert from '@/plugins/alert'
import loading from '../../plugins/loading'
import { rangeRight } from 'lodash'

export default {
  namespaced: true,
  state: {
    violations: [],
    pageText: '',
    itemsPerPage: 10,
    searchParams: {},
    totalItems: 0,
    page: 1
  },
  actions: {
    async searchViolations({ commit, state, dispatch }, query) {
      const searchParams = {
        _limit: state.itemsPerPage,
        ...query,
        _sort: 'createdAt:DESC'
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
        const [totalItems, violations] = await Promise.all([
          Violation.count(searchParams),
          Violation.search(searchParams)
        ])
        if (totalItems > (page - 1) * itemsPerPage || page === 1) {
          commit('changeState', {
            violations,
            totalItems,
            itemsPerPage,
            searchParams,
            page
          })
          const pageStart = (page - 1) * itemsPerPage + 1
          let pageStop = page * itemsPerPage
          pageStop = pageStop > totalItems ? totalItems : pageStop
          const pageText = `${pageStart}-${pageStop} trên ${totalItems}`
          commit('setPageText', pageText)
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
    async fetchViolation({ commit }, options) {
      try {
        commit('setViolation', await Violation.fetch(options))
      } catch (e) {
        alert.error(e)
      }
    },
    async count({ commit }, options) {
      try {
        return await Violation.count(options)
      } catch (e) {
        alert.error(e)
      }
    },
    async removeViolation({ commit }, params) {
      try {
        await Violation.remove(params.id)
        commit('removeViolation', params.id)
        alert.success('Xóa thành công!')
      } catch (e) {
        alert.error(e)
      }
    },
    async createViolation({ commit }, data) {
      try {
        commit('createViolation', await Violation.create(data))
      } catch (e) {
        alert.error(e)
      }
    },
    async updateViolation({ commit }, { id, ...violation }) {
      try {
        const vil = await Violation.update(id, violation)
        commit('updateViolation', { id, vil })
        alert.success('Cập nhật thành công!')
      } catch (e) {
        alert.error(e)
      }
    }
  },
  mutations: {
    setViolation(state, violation) {
      state.violations = violation
    },
    removeViolation(state, id) {
      state.violations = state.violations.filter(violation => violation.id !== id)
    },
    createViolation(state, violation) {
      state.violations = [violation, ...state.violations]
    },
    updateViolation(state, violation) {
      state.violations = state.violations.map(v => {
        if (violation.id === v.id) return violation.vil
        else return v
      })
    },
    setPageText(state, pageText) {
      state.pageText = pageText
    }
  }
}
