import { Mark } from '@/plugins/api'
import alert from '@/plugins/alert'
export default {
  namespaced: true,
  state: {
    marks: [],
    students: [],
    factor: {}
  },
  actions: {
    async fetchMarks({ commit }, options) {
      try {
        commit('setMarks', await Mark.fetch(options))
      } catch (error) {
        alert.error(error)
      }
    },
    async createMark({ commit }, data) {
      try {
        commit('createMark', await Mark.create(data))
      } catch (e) {
        alert.error(e)
      }
    },
    async removeMark({ commit }, id) {
      await Mark.remove(id)
      commit('removeMark', id)
    },
    async updateMarks({ dispatch }, items) {
      await Promise.all(items.map(item => dispatch('updateMark', item)))
    },
    async updateMark({ commit }, { id, ...mark }) {
      const m = await Mark.update(id, mark)
      commit('updateMark', m)
    },
    setStudents({ commit }, students) {
      commit('setStudents', students)
    },
    setFactor({ commit }, factor) {
      commit('setFactor', factor)
    }
  },
  mutations: {
    setMarks(state, marks) {
      state.marks = marks
    },
    setStudents(state, students) {
      state.students = students
    },
    updateMark(state, mark) {
      state.marks = state.marks.map(d => {
        if (mark.id === d.id) return mark
        else return d
      })
    },
    createMark(state, mark) {
      state.marks = [mark, ...state.marks]
    },
    removeMark(state, id) {
      state.marks = state.marks.filter(mark => mark.id !== id)
    },
    setFactor(state, factor) {
      state.factor = factor
    }
  },
  getters: {
    marks: state => {
      return state.students.reduce((acc, student) => {
        const markObject = state.marks
          .filter(m => m.factor.id === state.factor.id && m.student.id === student.id) // tìm điểm theo factor và student tương ứng
          .reduce((acc, mark) => ({ ...acc, [mark.data.index]: mark }), {}) // đánh dấu diểm theo index
        let markByFactor = Array.from(Array(state.factor.quantity).keys()).map(
          index => markObject[index] || { index, value: undefined }
        ) // khớp điểm

        markByFactor = markByFactor.map(m => {
          if (!!m && m.id && !m.rawValue) {
            m.rawValue = m.value // rawvalue for update mark
          }
          return m
        })

        return [...acc, { student, marks: markByFactor }]
      }, [])
    },
    students: state => {
      return state.students
    }
  }
}
