import { Student, Class, Grade, Post } from '@/plugins/api'

export default {
  namespaced: true,
  state: {
    classNo: 0,
    studentNo: 0,
    grades: [],
    classes: [],
    students: []
  },
  actions: {
    async fetchAllSchoolData({ commit }, options) {
      const [classNo, studentNo] = await Promise.all([Class.count(), Student.count()])
      commit('changeState', { classNo, studentNo })
    },
    async fetchGradeData({ commit }) {
      try {
        let grades = await Grade.fetch()
        const promises = grades.map(async g => {
          const classNo = await Class.count({ grade: g.id })
          const studentNo = await Student.count({ grade: g.id })
          g.classNo = classNo
          g.studentNo = studentNo
          return g
        })
        grades = await Promise.all(promises)
        commit('changeState', { grades })
      } catch (error) {
        alert.error(error)
      }
    },
    async fetchClassData({ commit }, params) {
      try {
        const classes = await Class.fetch({ ...params })
        commit('changeState', { classes })
      } catch (error) {
        alert.error(error)
      }
    }
  },
  mutations: {},
  getters: {
    allSchoolItems: ({ classNo, studentNo }) => {
      return [{ title: 'Toàn trường', classNo, studentNo }]
    }
  }
}
