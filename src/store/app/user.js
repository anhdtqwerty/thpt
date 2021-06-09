import axios from '@/plugins/axios'
import alert from '@/plugins/alert'
import utils from '@/plugins/utils'
import api from '../../plugins/api'
import _ from 'lodash'

const USER_API = '/users/'
const USER_COUNT_API = '/users/count/'
const ROLE_API = '/users-permissions/roles/'
const USER_AVATAR_API = '/upload/avatar/'

export default {
  namespaced: true,
  state: {
    users: [],
    roles: [],
    count: 0,
    user: null
  },
  actions: {
    fetchUsersCount({ commit }, filters = []) {
      const params = { _limit: -19 }
      filters.forEach(f => {
        if (f.value === 0 || f.value) {
          params[f.key + (f.type ? '_' + f.type : '')] = f.value
        }
      })
      return axios
        .get(USER_COUNT_API, { params })
        .then(count => {
          commit('setCount', count || 0)
        })
        .catch(e => alert.error(e))
    },
    fetchUsers({ commit }, options = {}) {
      const { filters = [], sortBy: { key = 'createdAt', asc = false } = {}, limit = 20, page = 1 } = options
      const params = {
        _sort: key + ':' + (asc ? 'ASC' : 'DESC'),
        _limit: limit > 0 ? limit : null,
        _start: (page - 1) * limit
      }
      filters.forEach(f => {
        if (f.value === 0 || f.value) {
          params[f.key + (f.type ? '_' + f.type : '')] = f.value
        }
      })
      return axios
        .get(USER_API, { params: utils.filterObject(params) })
        .then(users => {
          commit('setUsers', users)
        })
        .catch(e => {
          commit('setUsers', [])
          alert.error(e)
        })
    },
    async searchUsers({ commit, getters, dispatch }, { role, keywords, skip, limit }) {
      if (!keywords) return
      await dispatch('fetchRoles')
      return axios
        .get(USER_API, {
          hideLoading: true,
          params: utils.filterObject({
            role: getters.roleIdByName(role),
            username_contains: keywords,
            skip,
            limit
          })
        })
        .then(users => {
          commit('setUsers', users)
        })
        .catch(e => alert.error(e))
    },
    fetchUser({ commit, state }, userId) {
      if (!userId || (state.user && state.user.id === userId)) return
      return axios
        .get(USER_API + userId)
        .then(user => commit('setUser', user))
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
    createUser({ commit, getters }, { role, avatarFile, ...user }) {
      return axios
        .post(USER_API, utils.filterObject(user))
        .then(updatedUser => {
          const transedUser = updatedUser
          commit('receiveUser', transedUser)
          alert.success(`User ${updatedUser.username} created!`)
          return transedUser
        })
        .catch(e => alert.error(e))
    },
    updateUserAvatar({ commit, state }, { userId, avatar }) {
      if (avatar) {
        return axios
          .post(USER_AVATAR_API + userId, avatar)
          .then(([{ url } = {}] = []) => {
            commit('setUser', { ...state.user, avatar: url })
            commit('receiveUser', { ...state.user, avatar: url })
          })
          .catch(e => alert.error(e))
      }
    },
    async removeUsers({ commit }, users) {
      const { dones, errs } = await utils.bulkRequest(users, user => {
        return axios.delete(USER_API + user.id).then(user => {
          commit('removeUser', user.id)
          return user
        })
      })

      if (dones.length) {
        alert.success('Deleted users: ' + dones.map(user => user.username).join(', '))
        return dones
      } else if (errs.length) {
        alert.error('Fail to delete users!')
      }
    },
    updateUser({ commit, rootState }, { id, ...user }) {
      return axios
        .put(USER_API + id, user)
        .then(updatedUser => {
          const transedUser = updatedUser
          commit('setUser', transedUser)
          commit('receiveUser', transedUser)
          commit('class/updateUser', transedUser, { root: true })
          if (rootState.auth.user && rootState.auth.user.id === transedUser.id) {
            commit('auth/setUser', transedUser, { root: true })
          }
          // alert.success('User updated!')
        })
        .catch(e => alert.error(e))
    },
    async updateUsers({ commit }, { users = [], data = {} }) {
      const { dones, errs } = await utils.bulkRequest(users, user => {
        return axios.put(USER_API + user.id, data).then(user => {
          commit('receiveUser', user)
          return user
        })
      })
      if (!dones.length && errs.length) {
        alert.error('Fail to update users!')
      }
    },
    // eslint-disable-next-line
    async validateEmail({}, email) {
      let errMsg = !!email || 'Required.'
      errMsg = errMsg === true ? /.+@.+/.test(email) || 'E-mail must be valid' : errMsg
      if (errMsg === true) {
        const users = await api.User.search({ email, _limit: 1 })
        if (users.length > 0) {
          errMsg = 'Email này đã được sử dụng'
        }
      }
      return errMsg === true ? '' : errMsg
    },
    // eslint-disable-next-line
    async generateUserName({ dispatch }, name = '') {
      let userNameIndex = utils.generateUserName(utils.clearUnicode(name))
      let userNo = 0
      userNameIndex = utils.removeUnicode(userNameIndex).toLowerCase()
      const users = await api.User.search({
        username_indexing: userNameIndex,
        _sort: 'username_no:DESC',
        _limit: 1,
        type: 'staff'
      })
      console.log(users)
      if (users.length) userNo = _.get(_.last(users), 'username_no', 0) + 1
      return {
        username: `${userNameIndex}${userNo || ''}`,
        username_indexing: userNameIndex,
        username_no: userNo
      }
    },
    async generateStudentCode({ dispatch }, name = '') {
      let userNameIndex = utils.generateUserName(utils.clearUnicode(name))
      userNameIndex = utils.removeUnicode(userNameIndex).toLowerCase()

      let userNo = 0
      const userMeta = await api.UserMeta.fetch()
      if (!_.get(userMeta, 'indexUser')) {
        const users = await api.User.search({
          _sort: 'username_no:DESC',
          _limit: 1,
          type: 'student'
        })
        userNo = _.get(_.last(users), 'username_no', 0) + 1
      } else {
        userNo = _.get(userMeta, 'indexUser') + 1
      }

      const code = `00000${userNo}`.substr(`00000${userNo}`.length - 5)
      return {
        username: `${code}${userNameIndex}`,
        username_indexing: userNameIndex,
        username_no: userNo
      }
    }
  },
  mutations: {
    setUsers(state, users) {
      state.users = users
    },
    setUser(state, user) {
      state.user = user
    },
    setCount(state, count) {
      state.count = count
    },
    setRoles(state, roles) {
      state.roles = roles
    },
    receiveUser(state, user) {
      const i = state.users.findIndex(({ id }) => user.id === id)
      if (i > -1) {
        state.users.splice(i, 1, user)
      } else {
        state.users.unshift(user)
      }
    },
    removeUser(state, userId) {
      const i = state.users.findIndex(user => user.id === userId)
      if (i > -1) state.users.splice(i, 1)
    }
  },
  getters: {
    roles: state => state.roles.filter(item => item.name !== 'admin'),
    roleIdByName: state => name => {
      const { id = '' } = state.roles.find(role => role.name === name) || {}
      return id
    }
  }
}
