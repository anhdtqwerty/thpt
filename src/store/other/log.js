import axios from '@/plugins/axios'
import alert from '@/plugins/alert'
import utils from '@/plugins/utils'
import router from '@/router'

const LOG_API = '/Logs/'

export default {
  namespaced: true,
  state: {
    logs: [],
    log: {},
    count: 0
  },
  actions: {
    fetchLogs ({ commit }, query) {
      return axios.get(LOG_API, {
        params: query
      }, { hideLoading: true })
        .then(logs => commit('setLogs', logs))
        .catch(e => alert.error(e))
    },
    fetchLog ({ commit }, logId) {
      commit('setLog', null)
      return axios.get(LOG_API + logId)
        .then(c => {
          commit('setLog', c)
        })
        .catch(e => alert.error(e))
    },
    createLog ({ commit }, log) {
      log.log = { action: 'create-log' }
      return axios.post(LOG_API, utils.filterObject(log))
        .then(c => {
          commit('setLog', c)
          router.push(`/log/${c.id}/settings`)
          alert.success('Create new log successfully!')
        })
        .catch(e => alert.error(e))
    },
    updateLog ({ commit, state }, { id, ...log }) {
      return axios.put(LOG_API + id, log)
        .then(c => {
          commit('receiveLog', log)
          alert.success('Log updated!')
          return true
        })
        .catch(e => alert.error(e))
    },
    async removeLogs ({ dispatch }, items = []) {
      for (let item of items) {
        await dispatch('removeLog', item.id)
      }
    },
    removeLog ({ commit }, id) {
      return axios.delete(LOG_API + id)
        .then(delLog => commit('removeLog', delLog.id))
        .catch(e => alert.err(e))
    },
    async updateLogs ({ dispatch }, logs) {
      for (let item of logs) {
        await dispatch('updateLog', item)
      }
    },
    setLog ({ commit }, log) {
      commit('setLog', log)
    },
    setLogs ({ commit }, logs) {
      commit('setLogs', logs)
    }
  },
  mutations: {
    setLogs (state, logs) {
      state.logs = logs
    },
    setLog (state, log) {
      state.log = log || {}
    },
    removeLog (state, id) {
      const i = state.logs.findIndex(log => log.id === id)
      if (i > -1) state.logs.splice(i, 1)
    },
    receiveLog (state, log) {
      const i = state.logs.findIndex(d => d.id === log['_id'])
      if (i > -1) {
        state.logs.splice(i, 1, log)
      } else {
        state.logs.unshift(log)
      }
    },
    setCount (state, count) {
      state.count = count
    }
  },
  getters: {
    logs: (state) => {
      return state.logs
    },
    log: (state) => {
      return state.log
    },
    count: (state) => {
      return state.count
    }
  }
}
