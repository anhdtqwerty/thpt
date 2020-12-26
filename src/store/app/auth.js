import alert from '@/plugins/alert'
import router from '@/router'
import api from '../../plugins/api'
import { Teacher, Student } from '@/plugins/api'
import _ from 'lodash'
export default {
  namespaced: true,
  state: {
    user: null,
    jwt: null,
    profile: {},
    role: {},
    isAuthenticated: false
  },
  actions: {
    async signIn({ commit }, { identifier = '', password = '' } = {}) {
      try {
        const { jwt, user } = await api.Auth.create({ identifier, password })
        commit('setUser', { user, jwt })
        if (user.role.type === 'teacher') {
          router.push('/teacher-dashboard')
        } else if (user.role.type === 'student') {
          router.push('/student-dashboard')
        } else {
          router.push('/bill')
        }
      } catch (error) {
        console.error('signIn', error)
      }
    },
    signOut() {
      this.reset()
      router.push('signIn')
    },
    setRole({ commit }, role) {
      commit('setRole', role)
    },
    async fetchProfile({ commit }, query) {
      commit('setProfile', await api.Staff.fetch(query))
    },
    async fetchTeacher({ commit }, query) {
      commit('setProfile', await Teacher.fetch(query))
    },
    async fetchStudent({ commit }, query) {
      commit('setProfile', await Student.fetch(query))
    },
    signUp(context, credentials = {}) {},
    async forgotPassword(context, email) {
      await api.Auth.forgotPassword(email)
      alert.success('Hãy kiểm tra mail của bạn')
    },
    async resetPassword({ commit }, { code, password, passwordConfirmation }) {
      const { user, jwt } = await api.Auth.resetPassword(
        code,
        password,
        passwordConfirmation
      )
      commit('setUser', { user, jwt })
      if (user.role.type === 'teacher') {
        router.push('/teacher-dashboard')
      } else if (user.role.type === 'student') {
        router.push('/student-dashboard')
      } else {
        router.push('/bill')
      }
    }
  },
  mutations: {
    setUser(state, { user, jwt }) {
      state.jwt = jwt
      state.user = user
      if (user) {
        state.role = user.role
        state.isAuthenticated = true
      } else {
        state.isAuthenticated = false
        state.role = null
      }
    },
    setRole(state, role) {
      state.role = role
    },
    setProfile(state, profile) {
      state.profile = _.get(profile, '0', {})
    }
  },
  getters: {
    jwt(state) {
      return state.jwt
    },
    user(state) {
      return !state.user ? {} : state.user
    },
    role(state) {
      return state.role || state.user.role || {}
    },
    profile(state) {
      return !state.profile ? {} : state.profile
    },
    isAuthenticated(state) {
      return state.isAuthenticated
    }
  }
}
