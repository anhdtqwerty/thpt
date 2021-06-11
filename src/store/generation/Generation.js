import { Class } from '@/plugins/api'
import {} from 'lodash'
export default {
  namespaced: true,
  state: {
    classes: {},
    newClasses: []
  },
  actions: {
    async fetchClasses({ commit }, params) {
      const classes = await Class.fetch({ ...params })
      commit('setClasses', classes)
    },
    updateClass({ commit }, classData) {
      commit('updateClass', classData)
    },
    async createNewClass({ commit }, classData) {
      const c = await Class.create(classData)
      commit('createNewClass', c)
    },
    async updateNewClass({ commit }, { id, ...classData }) {
      commit('updateNewClass', await Class.update(id, classData))
    },
    async removeNewClass({ commit }, id) {
      await Class.remove(id)
      commit('removeNewClass', id)
    }
  },
  mutations: {
    setClasses(state, classes) {
      const classesData = classes.reduce(
        (accumulator, currentValue) => ({
          ...accumulator,
          [currentValue.id]: {
            currentClass: currentValue,
            newClass: {
              newClassTitle: currentValue.title.replace(
                currentValue.grade.gradeNumber,
                currentValue.grade.gradeNumber + 1
              ),
              newGradeNumber: currentValue.grade.gradeNumber + 1
            }
          }
        }),
        {}
      )

      state.classes = { ...classesData, ...state.classes }
    },
    updateClass(state, { id, ...data }) {
      state.classes = { ...state.classes, [id]: { ...state.classes[id], ...data } }
    },
    createNewClass(state, classData) {
      state.newClasses = [...state.newClasses, classData]
    },
    updateNewClass(state, classData) {
      state.newClasses = state.newClasses.map(c => {
        if (classData.id === c.id) return classData
        else return c
      })
    },
    removeNewClass(state, id) {
      state.newClasses = state.newClasses.filter(c => c.id !== id)
    }
  },
  getters: {
    classes: state => {
      return Object.values(state.classes)
    },
    newClasses: state => {
      return state.newClasses
    }
  }
}
