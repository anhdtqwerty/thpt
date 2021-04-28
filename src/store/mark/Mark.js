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
      const markObj = state.marks
        .filter(m => !!m.student && !!m.student.id)
        .reduce((acc, cur) => {
          return { ...acc, [cur.student.id]: [...(acc[cur.student.id] || []), cur] }
        }, {})
      let studentMarks = state.students.map(s => ({ student: s, marks: markObj[s.id] }))

      studentMarks = studentMarks.map(({ student, marks: markArr }) => {
        const marks = []
        const avgFactorMarks = []
        markArr = markArr || []
        state.factors.forEach(f => {
          const factorMarks = []
          let marksByFactor = markArr.filter(m => m.factor.id === f.id)
          for (let index = 0; index < f.quantity; index++) {
            factorMarks.push({ index, value: undefined, id: undefined })
          }

          marksByFactor.forEach(m => {
            factorMarks[m.data.index].id = m.id
            factorMarks[m.data.index].value = m.value
          })

          marks.push(...factorMarks)

          // avg mark
          let sumMark = 0
          marksByFactor.forEach(mark => {
            sumMark += f.multiply * (mark.value || 0)
          })
          let avgByFactor = sumMark / f.quantity
          avgFactorMarks.push(avgByFactor)
        })
        const sumAvgSemesterMark = sum(avgFactorMarks)
        let avgSemester = sumAvgSemesterMark / avgFactorMarks.length
        avgSemester = Math.floor(avgSemester * 100) / 100

        return { student, marks, avgSemester }
      })

      return studentMarks
    },
    students: state => {
      return state.students
    },
    factors: state => {
      return state.factors
    }
  }
}
