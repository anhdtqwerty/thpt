import { Mark } from '@/plugins/api'
import alert from '@/plugins/alert'
import { sum } from 'lodash'
export default {
  namespaced: true,
  state: {
    marks: [],
    students: [],
    factors: []
  },
  actions: {
    async fetchMarks({ commit }, options) {
      try {
        commit('setMarks', await Mark.fetch(options))
      } catch (error) {
        alert.error(error)
      }
    },
    setStudents({ commit }, students) {
      commit('setStudents', students)
    },
    setFactors({ commit }, factors) {
      commit('setFactors', factors)
    }
  },
  mutations: {
    setMarks(state, marks) {
      state.marks = marks
    },
    setStudents(state, students) {
      state.students = students
    },
    setFactors(state, factors) {
      state.factors = factors
    }
  },
  getters: {
    marks: state => {
      return state.students.reduce((acc, student) => {
        const marks = state.factors.reduce((acc, factor) => {
          const markObject = state.marks
            .filter(m => m.factor.id === factor.id && m.student.id === student.id) // tìm điểm theo factor và student tương ứng
            .reduce((acc, mark) => ({ ...acc, [mark.data.index]: mark }), {}) // đánh dấu diểm theo index
          const markByFactor = Array.from(Array(factor.quantity).keys()).map(index => markObject[index] || {}) // khớp điểm
          return [...acc, ...markByFactor]
        }, []) // build factor schema

        return [...acc, { student, marks }]
      }, [])
    },
    students: state => {
      return state.students
    },
    factors: state => {
      return state.factors
    }
  }
}
