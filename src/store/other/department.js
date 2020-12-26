import axios from '@/plugins/axios'
import alert from '@/plugins/alert'

const DEPARTMENT_API = '/departments/'

export default {
  namespaced: true,
  state: {
    departments: [],
    department: {},
    dep: 'Department 1'
  },
  actions: {
    fetchDepartments({ commit }) {
      return axios
        .get(DEPARTMENT_API)
        .then(departments => commit('setDepartments', departments))
        .catch(e => alert.error(e))
    },
    fetchDepartment({ commit }, id) {
      return axios
        .get(DEPARTMENT_API + id)
        .then(department => commit('setDepartment', department))
        .catch(e => alert.error(e))
    },
    createDepartment({ commit }, dep) {
      return axios
        .post(DEPARTMENT_API, dep)
        .then(department => {
          commit('setDepartment', department)
          commit('receiveDepartment', department)
          alert.success('Department created')
        })
        .catch(e => alert.error(e))
    },
    updateDepartment({ commit }, { id, ...dep }) {
      return axios
        .put(DEPARTMENT_API + id, dep)
        .then(department => {
          commit('setDepartment', department)
          commit('receiveDepartment', department)
          alert.success('Department updated')
        })
        .catch(e => alert.error(e))
    },
    removeDepartment({ commit }, id) {
      return axios
        .delete(DEPARTMENT_API + id)
        .then(dep => {
          commit('removeDep', dep.id)
        })
        .cathc(e => alert.error(e))
    },
    async removeDepartments({ dispatch }, ids) {
      for (let id of ids) {
        await dispatch('removeDepartment', id)
      }
    },
    chooseDepartment({ state, commit }, dep) {
      if (!dep) throw new Error('Department id undefined found')
      const department = state.departments.find(item => item.id === dep.id)
      if (department) {
        localStorage.setItem('currentDepartment', JSON.stringify(department))
        commit('setDepartment', department)
      } else {
        throw new Error('Id not found')
      }
    }
  },
  mutations: {
    setDepartments(state, deps) {
      state.departments = deps
    },
    setDepartment(state, dep) {
      state.department = dep
    },
    receiveDepartment(state, dep) {
      const i = state.departments.findIndex(d => d.id === dep.id)
      if (i > -1) {
        state.departments.splice(i, 1, dep)
      } else {
        state.departments.unshift(dep)
      }
    },
    removeDepartment(state, id) {
      const i = state.departments.findIndex(d => d.id === id)
      if (i > -1) {
        state.departments.splice(i, 1)
      }
    }
  },
  getters: {
    currentDepartment(state) {
      let dataStorage = localStorage.getItem('currentDepartment')
      return state.department || (dataStorage ? JSON.parse(dataStorage) : null)
    },
    departments(state) {
      return state.departments
    },
    department(state) {
      return state.department
    }
  }
}
