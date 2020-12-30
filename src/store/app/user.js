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
      const {
        filters = [],
        sortBy: { key = 'createdAt', asc = false } = {},
        limit = 20,
        page = 1
      } = options
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
    async searchUsers(
      { commit, getters, dispatch },
      { role, keywords, skip, limit }
    ) {
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
        alert.success(
          'Deleted users: ' + dones.map(user => user.username).join(', ')
        )
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
          if (
            rootState.auth.user &&
            rootState.auth.user.id === transedUser.id
          ) {
            commit('auth/setUser', transedUser, { root: true })
          }
          alert.success('User updated!')
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
      errMsg =
        errMsg === true ? /.+@.+/.test(email) || 'E-mail must be valid' : errMsg
      if (errMsg === true) {
        const users = await api.User.search({ email, _limit: 1 })
        if (users.length > 0) {
          errMsg = 'Email này đã được sử dụng'
        }
      }
      return errMsg === true ? '' : errMsg
    },
    // eslint-disable-next-line
    async generateUserName({}, name = '') {
      const nameArr = utils
        .removeUnicode(
          name
            .trim()
            .toLowerCase()
            .replace(/ +(?= )/g, '')
        )
        .split('-')
        .join(' ')
        .split(' ')
      console.log(nameArr)
      // eslint-disable-next-line
      let username_indexing = _.last(nameArr)
      // eslint-disable-next-line
      let username_no = 0
      let username = ''

      // core username
      if (nameArr.length > 1) {
        // eslint-disable-next-line
        username_indexing = nameArr
          .slice(0, nameArr.length - 1)
          .reduce((pre, cur) => pre + cur[0], username_indexing)
      }
      // eslint-disable-next-line
      username_indexing = utils.removeUnicode(username_indexing).toLowerCase()

      // user no
      const users = await api.User.search({
        username_indexing,
        _sort: 'username_no:DESC',
        _limit: 1
      })
      const user = _.last(users)
      if (user) {
        if (user.username_no !== undefined) {
          // eslint-disable-next-line
          username_no = user.username_no + 1
        } else {
          // eslint-disable-next-line
          username_no = 1
        }
      } else {
        // eslint-disable-next-line
        username_no = 0
      }

      // eslint-disable-next-line
      if (username_indexing) {
        // eslint-disable-next-line
        username =
          username_no > 0 ? username_indexing + username_no : username_indexing
      }

      return { username, username_indexing, username_no }
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
