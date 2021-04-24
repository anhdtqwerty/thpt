import { Mark } from '@/plugins/api'
import alert from '@/plugins/alert'
export default {
  namespaced: true,
  state: {
    marks: [],
    students: []
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
      try {
        await Mark.remove(id)
        alert.success('Xóa thành công!')
      } catch (e) {
        alert.error(e)
      }
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
    }
  },
  getters: {
    marks: state => {
      const markObj = state.marks
        .filter(m => !!m.student && !!m.student.id)
        .reduce((acc, cur) => {
          return { ...acc, [cur.student.id]: [...(acc[cur.student.id] || []), cur] }
        }, {})
      return state.students.map(s => ({ student: s, mark: markObj[s.id] }))
    },
    students: state => {
      return state.students
    }
  }
}
