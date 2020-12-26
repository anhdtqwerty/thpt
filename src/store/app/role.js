import axios from '@/plugins/axios'
import alert from '@/plugins/alert'

const ROLE_API = '/users-permissions/roles/'
export default {
  namespaced: true,
  state: {
    role: {},
    roles: []
  },
  actions: {
    fetchRoles({ state, commit }) {
      if (!state.roles.length) {
        return axios
          .get(ROLE_API)
          .then(({ roles = [] } = {}) => commit('setRoles', roles))
          .catch(e => alert.error(e))
      }
    },
    setRole({ commit }, role) {
      commit('setRole', role)
    }
  },
  mutations: {
    setRoles(state, roles) {
      state.roles = roles
    },
    setRole(state, role) {
      state.role = role
    }
  },
  getters: {
    roles: state => state.roles,
    role: state => state.role,
    roleIdByName: state => name => {
      const { id = '' } = state.roles.find(role => role.name === name) || {}
      return id
    }
  }
}
