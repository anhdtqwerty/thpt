import { Mark } from '@/plugins/api'
import alert from '@/plugins/alert'
import { sum, orderBy } from 'lodash'

export default {
  namespaced: true,
  state: {
    marks: [],
    student: [],
    semester: {},
    subjects: []
  },
  actions: {
    async fetchMarks({ commit }, options) {
      try {
        commit('setMarks', await Mark.fetch(options))
      } catch (error) {
        alert.error(error)
      }
    },
    setStudent({ commit }, student) {
      commit('setStudent', student)
    },
    setSemester({ commit }, semester) {
      commit('setSemester', semester)
    },
    setSubjects({ commit }, subjects) {
      commit('setSubjects', subjects)
    }
  },
  mutations: {
    setMarks(state, marks) {
      state.marks = marks
    },
    setStudent(state, student) {
      state.student = student
    },
    setSemester(state, semester) {
      state.semester = semester
    },
    setSubjects(state, subjects) {
      state.subjects = subjects
    }
  },
  getters: {
    marks: state => {
      return state.subjects.reduce((acc, subject) => {
        const marks = subject.factors
          .filter(f => f.semesterType === state.semester.type) // Lọc cho đúng học kỳ
          .sort((a, b) => a.index - b.index) // sắp xếp các cột đúng thứ tự. (miệng - 15 phút -....)
          .reduce((acc, factor) => {
            const markObject = state.marks
              .filter(m => m.factor.id === factor.id) // tìm điểm theo factor tương ứng
              .reduce((acc, mark) => ({ ...acc, [mark.data.index]: mark }), {}) // đánh dấu diểm theo index

            const markByFactor = Array.from(Array(factor.quantity).keys()).map(index => markObject[index] || {}) // khớp điểm
            return [...acc, ...markByFactor]
          }, []) // build factor schema

        return [...acc, { subject: subject, marks }]
      }, [])
    },
    students: state => {
      return state.students
    },
    semester: state => {
      return state.semester
    }
  }
}
