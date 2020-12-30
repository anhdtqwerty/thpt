import axios from '@/plugins/axios'
import alert from '@/plugins/alert'
import api from '../../plugins/api'

const USER_API = '/users/'
const STAFF_COUNT_API = '/staff/count'
const STAFF_API = '/staff/'

export default {
  namespaced: true,
  state: {
    staffs: [],
    staff: {},
    count: 0
  },
  actions: {
    fetchStaffsCount({ commit }, filters = []) {
      const params = { _limit: -19 }
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
    fetchStaffs({ commit }, query = '') {
      return axios
        .get(STAFF_API + query)
        .then(staffs => commit('setStaffs', staffs))
        .catch(e => alert.error(e))
    },
    fetchStaffsByTitle({ dispatch }, keyword) {
      if (!keyword) return
      return dispatch('fetchStaffs', {
        params: { title_contains: keyword },
        hideLoading: true
      })
    },
    fetchStaff({ commit }, staffId) {
      return axios
        .get(STAFF_API + staffId)
        .then(staff => commit('setStaff', staff))
        .catch(e => alert.error(e))
    },
    async createStaff({ commit, rootGetters }, data) {
      try {
        const user = await api.User.create({ ...data })
        if (user) {
          data.user = user.id
          data.code = user.username
          const staff = await api.Staff.create({ ...data })
          commit('setStaff', staff)
          commit('receiveStaff', staff)
          alert.success('Create staff successfully!')
        } else {
          alert.error('Tạo Thất Bại!')
        }
      } catch (error) {
        console.error(error)
      }
    },
    updateStaff({ commit, state }, { id, ...staff }) {
      return axios
        .put(STAFF_API + id, staff)
        .then(staff => {
          commit('setStaff', staff)
          commit('receiveStaff', staff)
          alert.success('Update staff successfully!')
        })
        .catch(e => alert.error(e))
    },
    async updateStaffs({ dispatch }, staffs) {
      for (let item of staffs) {
        await dispatch('updateStaff', item)
      }
    },
    async removeStaff({ commit }, staff) {
      if (staff.user) {
        await axios.delete(USER_API + staff.user).catch(e => alert.error(e))
      }
      await axios
        .delete(STAFF_API + staff.id)
        .then(staff => {
          commit('removeStaff', staff.id)
        })
        .catch(e => alert.error(e))
    },
    async removeStaffs({ dispatch }, items) {
      for (let item of items) {
        await dispatch('removeStaff', item)
      }
    },
    setStaff({ commit }, staff) {
      commit('setStaff', staff)
    },
    setStaffs({ commit }, staffs) {
      commit('setStaffs', staffs)
    }
  },
  mutations: {
    setStaffs(state, staffs) {
      state.staffs = staffs
    },
    setStaff(state, staff) {
      state.staff = staff
    },
    setCount(state, count) {
      state.count = count
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
    }
  },
  getters: {
    staffs: state => {
      return state.staffs
    },
    staff: state => {
      return state.staff || {}
    }
  }
}
