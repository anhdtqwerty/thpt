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
      const markObj = state.marks
        .filter(m => !!m.subject && !!m.subject.id)
        .reduce((acc, cur) => {
          return { ...acc, [cur.subject.id]: [...(acc[cur.subject.id] || []), cur] }
        }, {})
      let subjectMarks = state.subjects.map(s => ({ subject: s, marks: markObj[s.id] }))

      subjectMarks = subjectMarks.map(({ subject, marks: markArr }) => {
        const marks = []
        markArr = markArr || []
        const avgFactorMarks = []

        let factors = subject.factors.filter(f => f.semesterType === state.semester.type)
        factors = orderBy(factors, ['index'], ['asc'])

        factors.forEach(f => {
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

          let sumMark = 0
          marksByFactor.forEach(mark => {
            sumMark += f.multiply * (mark.value || 0)
          })
          let avgByFactor = sumMark / f.quantity
          avgFactorMarks.push(avgByFactor)
        })

        const sumAvgSemesterMark = sum(avgFactorMarks)
        let avgSubjectMark = sumAvgSemesterMark / avgFactorMarks.length
        avgSubjectMark = Math.floor(avgSubjectMark * 100) / 100
        marks.push({ value: avgSubjectMark })

        return { subject, marks }
      })

      return subjectMarks
    },
    students: state => {
      return state.students
    },
    semester: state => {
      return state.semester
    }
  }
}
