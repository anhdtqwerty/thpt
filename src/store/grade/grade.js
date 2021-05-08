import { Grade } from '@/plugins/api'
import alert from '@/plugins/alert'
export default {
  namespaced: true,
  state: {
    grades: []
  },
  actions: {
    async fetchGrades({ commit }, options) {
      try {
        commit('setGrades', await Grade.fetch(options))
      } catch (error) {
        alert.error(error)
      }
    },
    async createGrade({ commit }, data) {
      try {
        commit('createGrade', await Grade.create(data))
      } catch (e) {
        alert.error(e)
      }
    },
    async removeGrade({ commit }, id) {
      try {
        await Grade.remove(id)
        commit('removeGrade', id)
        alert.success('Xóa thành công!')
      } catch (e) {
        alert.error(e)
      }
    },
    async updateGrade({ commit }, { id, ...grade }) {
      try {
        const g = await Grade.update(id, grade)
        commit('updateGrade', g)
        alert.success('Cập nhật thành công!')
      } catch (e) {
        alert.error(e)
      }
    }
  },
  mutations: {
    setGrades(state, grades) {
      state.grades = grades
    },
    updateGrade(state, grade) {
      state.grades = state.grades.map(g => {
        if (grade.id === g.id) return grade
        else return g
      })
    },
    createGrade(state, grade) {
      state.grades = [grade, ...state.grades]
    },
    removeGrade(state, id) {
      state.grades = state.grades.filter(grade => grade.id !== id)
    }
  }
}
