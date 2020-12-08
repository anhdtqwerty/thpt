import { Staff, Class } from '@/plugins/api'

export default {
  namespaced: true,
  state: {
    majors: [],
    classes: [],
    staffs: []
  },
  actions: {
    async searchClasses ({ commit }, options) {
      commit('setClasses', await Class.fetch(options))
    },
    async searchMajors ({ commit }, options) {
      commit('setMajors', await Class.fetch(options))
    },
    async searchStaffs ({ commit }, options) {
      commit('setTeachers', await Staff.fetch(options))
    }
  },
  mutations: {
    setMajors (state, majors) {
      state.majors = majors
    },
    setClasses (state, classes) {
      state.classes = classes
    },
    setStaffs (state, staffs) {
      state.classes = staffs
    }
  },
  getters: {
    majors: (state) => {
      return state.majors
    },
    classes: (state) => {
      return state.classes
    },
    staffs: (state) => {
      return state.staffs
    }
  }
}
