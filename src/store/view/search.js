import { Staff, Class, Teacher, Subject } from '@/plugins/api'

export default {
  namespaced: true,
  state: {
    majors: [],
    classes: [],
    teachers: [],
    subjects: [],
    staffs: []
  },
  actions: {
    async searchClasses({ commit }, options) {
      commit('setClasses', await Class.fetch(options))
    },
    async searchMajors({ commit }, options) {
      commit('setMajors', await Class.fetch(options))
    },
    async searchStaffs({ commit }, options) {
      commit('setStaffs', await Staff.fetch(options))
    },
    async searchTeachers({ commit, state }, options) {
      commit('setTeachers', await Teacher.fetch(options))
    },
    async searchSubjects({ commit }, options) {
      commit('setSubjects', await Subject.fetch(options))
    }
  },
  mutations: {
    setMajors(state, majors) {
      state.majors = majors
    },
    setClasses(state, classes) {
      state.classes = classes
    },
    setStaffs(state, staffs) {
      state.classes = staffs
    },
    setTeachers(state, teachers) {
      state.teachers = teachers
    },
    setSubjects(state, subjects) {
      state.subjects = subjects
    }
  },
  getters: {
    majors: state => {
      return state.majors
    },
    classes: state => {
      return state.classes
    },
    staffs: state => state.staffs,
    teachers: state => state.teachers,
    subjects: state => state.subjects
  }
}
