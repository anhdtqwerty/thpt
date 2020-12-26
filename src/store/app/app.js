import axios from '@/plugins/axios'
import alert from '@/plugins/alert'
const ROLE_API = '/users-permissions/roles/'
const STAFF_COUNT_API = '/staffs/count'
const STAFF_API = '/staff/'
const DEPARTMENT_API = '/departments/'
export default {
  namespaced: true,
  state: {
    staffs: [],
    staff: {},
    count: 0,
    department: {},
    currentGeneration: {},
    currentSemester: {},
    roles: [],
    role: {},
    policies: {}
  },
  actions: {
    setDepartment({ state, commit, dispatch }, department) {
      if (!department) {
        console.log('Department id undefined found')
      } else {
        commit('setDepartment', department)
      }
    },
    fetchDepartment({ commit }, id) {
      return axios
        .get(DEPARTMENT_API + id)
        .then(department => commit('setDepartment', department))
        .catch(e => alert.error(e))
    },
    fetchRoles({ state, commit }) {
      if (!state.roles.length) {
        return axios
          .get(ROLE_API)
          .then(({ roles = [] } = {}) => commit('setRoles', roles))
          .catch(e => alert.error(e))
      }
    },
    fetchStaffsCount({ commit }, filters = []) {
      const params = { _limit: 9999 }
      filters.forEach(f => {
        if (f.value === 0 || f.value) {
          params[f.key + (f.type ? '_' + f.type : '')] = f.value
        }
      })
      return axios
        .get(STAFF_COUNT_API, { params })
        .then(count => {
          commit('setCount', count || 0)
        })
        .catch(e => alert.error(e))
    },
    fetchStaffs({ commit }, options) {
      return axios
        .get(STAFF_API, { ...options })
        .then(staffs => commit('setStaffs', staffs))
        .catch(e => alert.error(e))
    },
    fetchStaff({ commit }, staffId) {
      commit('setStaff', null)
      return axios
        .get(STAFF_API + staffId)
        .then(staff => commit('setStaff', staff))
        .catch(e => alert.error(e))
    },
    createStaff({ commit }, staff) {
      return axios
        .post(STAFF_API, staff)
        .then(staff => {
          commit('setStaff', staff)
          commit('receiveStaff', staff)
          alert.success('Create staff successfully!')
        })
        .catch(e => alert.error(e))
    },
    updateStaff({ commit, state }, { id, ...staff }) {
      return axios
        .put(STAFF_API + id, staff)
        .then(staff => {
          commit('setStaff', staff)
          alert.success('Update staff successfully!')
        })
        .catch(e => alert.error(e))
    },
    removeStaff({ commit }, staffId) {
      return axios
        .delete(STAFF_API + staffId)
        .then(staff => {
          commit('removeStaff', staff.id)
        })
        .catch(e => alert.error(e))
    },
    async removeStaffs({ dispatch }, items) {
      for (let item of items) {
        await dispatch('removeStaff', item.id)
      }
    },
    setStaff({ commit }, staff) {
      commit('setStaff', staff)
    },
    setRole({ commit }, role) {
      commit('setRole', role)
    },
    setPolicies({ commit }, policies) {
      commit('setPolicies', policies)
    }
  },
  mutations: {
    setStaffs(state, staffs) {
      state.staffs = staffs
    },
    setRole(state, role) {
      state.role = role
    },
    setPolicies(state, policies) {
      state.policies = policies
    },
    setCount(state, count) {
      state.count = count
    },
    setStaff(state, staff) {
      state.staff = staff
    },
    setDepartment(state, department) {
      state.department = department
      if (department.currentGeneration && department.currentGeneration.id) {
        state.currentGeneration = department.currentGeneration
      }
      if (department.currentSemester && department.currentSemester.id) {
        state.currentSemester = department.currentSemester
      }
    },
    receiveStaff(state, staff) {
      const i = state.staffs.findIndex(d => d.id === staff.id)
      if (i > -1) {
        state.staffs.splice(i, 1, staff)
      } else {
        state.staffs.unshift(staff)
      }
    },
    removeStaff(state, staffId) {
      const i = state.staffs.findIndex(({ id }) => id === staffId)
      if (i > -1) {
        state.staffs.splice(i, 1)
      }
    },
    setRoles(state, roles) {
      state.roles = roles
    },
    fetchRoles({ state, commit }) {
      if (!state.roles.length) {
        return axios
          .get(ROLE_API)
          .then(({ roles = [] } = {}) => commit('setRoles', roles))
          .catch(e => alert.error(e))
      }
    }
  },
  getters: {
    count: state => {
      return state.count
    },
    staffs: state => {
      return state.staffs
    },
    policies: state => {
      return state.policies || {}
    },
    staff: state => {
      return state.staff
    },
    department(state) {
      return !state.department ? {} : state.department
    },
    currentSemester(state) {
      return !state.currentSemester ? {} : state.currentSemester
    },
    currentGeneration(state) {
      return !state.currentGeneration ? {} : state.currentGeneration
    },
    roles: state =>
      state.roles.filter(item => {
        return (
          item.type !== 'authenticated' &&
          item.name !== 'public' &&
          item.type !== 'sale_team_leader' &&
          item.type !== 'sale_executive'
        )
      }),
    roleIdByName: state => name => {
      const { id = '' } =
        state.roles.find(role => {
          return role.name.localeCompare(name) === 0
        }) || {}
      return id
    },
    roleIdByType: state => type => {
      const { id = '' } =
        state.roles.find(role => {
          return role.type.localeCompare(type) === 0
        }) || {}
      return id
    }
  }
}
