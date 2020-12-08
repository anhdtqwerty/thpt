export default {
  namespaced: true,
  state: {
    requestings: []
  },
  actions: {
    startRequest ({ commit }, id) {
      commit('addRequest', id)
    },
    endRequest ({ commit }, id) {
      commit('removeRequest', id)
    }
  },
  mutations: {
    addRequest (state, id) {
      if (!state.requestings.includes(id)) {
        state.requestings.push(id)
      }
    },
    removeRequest (state, id) {
      const i = state.requestings.indexOf(id)
      if (i > -1) state.requestings.splice(i, 1)
    }
  },
  getters: {
    requesting: state => id => {
      return state.requestings.includes(id)
    }
  }
}
