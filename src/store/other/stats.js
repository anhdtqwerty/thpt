import axios from '@/plugins/axios'

const PromisesFactory = (query, course, type) => {
  return axios.get(query).then(res => {
    return { ...res, ...course }
  })
    .catch(e => {
      return {
        ...course
      }
    })
}
export default {
  namespaced: true,
  state: {
    classByCourse: 0,
    openedClasses: 0,
    activeStudents: 0,
    activeTeachers: 0,
    classes: [],
    students: {}
  },
  actions: {
    fetchClassStats ({ getters, commit, dispatch, rootState }, courses) {
      if (!courses) return
      let promises = courses.map(course => {
        return PromisesFactory('/classes/stats?' + '&department=' + course.department.id, course, 'total')
      })
      Promise.all(promises)
        .then(res => {
          commit('setClasses', res)
        })
        .catch(console.log)
    },
    fetchStudentStats ({ getters, commit, dispatch, rootState }, department) {
      return axios.get('/students/stats?' + '&department=' + department.id).then(res => {
        commit('setStudents', res)
      })
        .catch(e => {
          console.log(e)
        })
    }
  },
  mutations: {
    setClasses (state, classes) {
      state.classes = classes
    },
    setStudents (state, students) {
      state.students = students
    }
  },
  getters: {
    classes: (state) => {
      return state.classes || []
    },
    students: (state) => {
      return state.students || {}
    }
  }
}
