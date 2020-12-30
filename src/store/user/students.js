import api from '../../plugins/api'
import alert from '../../plugins/alert'
import _ from 'lodash'

export default {
  namespaced: true,
  state: {
    students: [],
    studentSearchParams: {},
    totalItems: 0,
    itemsPerPage: 5,
    generations: [],
    majors: [],
    classes: []
  },
  actions: {
    async requestPageSettings(
      { state, commit, dispatch },
      { page, itemsPerPage }
    ) {
      if (!page) page = 1
      if (!itemsPerPage) itemsPerPage = state.itemsPerPage
      if (state.studentSearchParams) {
        const studentSearchParams = {
          ...state.studentSearchParams,
          _start: (page - 1) * itemsPerPage,
          _limit: itemsPerPage,
          _sort: 'createdAt:DESC'
        }
        const [totalItems, students] = await Promise.all([
          api.Student.count(studentSearchParams),
          api.Student.search(studentSearchParams)
        ])

        if (totalItems > (page - 1) * itemsPerPage || page === 1) {
          commit('changeState', {
            students,
            totalItems,
            itemsPerPage,
            studentSearchParams
          })
        } else {
          var pages = _.rangeRight(1, page)
          for (let index = 0; index < pages; index++) {
            const selectedPage = pages[index]
            if (totalItems > (selectedPage - 1) * itemsPerPage) {
              dispatch('requestPageSettings', {})
              break
            }
          }
        }
      }
    },
    async fetchGenerations({ commit, state }) {
      if (_.isEmpty(state.generations)) {
        const generations = await api.Generation.fetch()
        commit('changeState', { generations })
      }
    },
    async searchMajors({ commit }, majorCode) {
      const majors = await api.Major.search({
        title_contains: majorCode,
        _limit: 5
      })
      commit('changeState', { majors })
    },
    async searchClasses({ commit }, classCode) {
      const classes = await api.Class.search({
        code_contains: classCode,
        _limit: 5
      })
      commit('changeState', { classes })
    },
    async searchStudents({ commit, state, dispatch }, query) {
      const studentSearchParams = {
        _limit: state.itemsPerPage,
        ...query
      }

      commit('changeState', { studentSearchParams })
      dispatch('requestPageSettings', {})
    },
    async updateStudent({ commit, state }, { id, ...student }) {
      const stn = await api.Student.update(id, student)
      commit('receiveStudent', stn)
      alert.success('Update student successfully!')
    },
    async updateStudents({ dispatch }, items) {
      await Promise.all(items.map(item => dispatch('updateStudent', item)))
    },
    async createStudent({ state, dispatch }, userData) {
      try {
        const user = await api.User.create({ ...userData, type: 'student' })
        userData.user = user.id
        const student = await api.Student.create({
          ...userData,
          code: userData.username
        })
        alert.success('Tạo học sinh thành công')
        return student
      } catch (error) {
        alert.error('Tạo học sinh thất bại')
        console.error(error)
      }
    },
    async removeStudent({ commit }, student) {
      if (student.user) {
        await api.User.remove(student.user)
      }
      await api.Student.remove(student.id)
      commit('removeStudent', student.id)
    },
    async removeStudents({ dispatch }, items) {
      await Promise.all(items.map(item => dispatch('removeStudent', item)))
    },
    async clean({ commit }) {
      commit('clean')
    }
  },
  mutations: {
    clean(state) {
      state.students = []
      state.studentSearchParams = {}
      state.totalItems = 0
      state.itemsPerPage = 10
      state.generations = []
      state.majors = []
      state.classes = []
    },
    receiveStudent(state, student) {
      const i = state.students.findIndex(({ id }) => student.id === id)
      if (i > -1) {
        state.students.splice(i, 1, student)
      } else {
        state.students.unshift(student)
      }
    },
    removeStudent(state, studentId) {
      state.students = state.students.filter(s => {
        return s.id !== studentId
      })
    }
  }
}
