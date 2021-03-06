import { Student, Class } from '@/plugins/api'
export default {
  namespaced: true,
  state: {
    classNo: 0,
    studentNo: 0
  },
  actions: {
    async fetchAllSchollData({ commit }, options) {
      const [ classNo, studentNo ] = await Promise.all([
        Class.count(),
        Student.count()
      ])
      commit('changeState', { classNo, studentNo })
    },
  },
  mutations: {
  },
  getters: {
    allSchoolItems: ({ classNo, studentNo }) => {
      return [{ title: 'Toàn trường', classNo, studentNo }]
    }
  }
}
