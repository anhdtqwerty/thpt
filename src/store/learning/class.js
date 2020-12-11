import axios from '@/plugins/axios'
import alert from '@/plugins/alert'
import utils from '@/plugins/utils'
import { Class } from '@/plugins/api'
import _ from 'lodash'

const CLASS_API = '/classes/'

export default {
  namespaced: true,
  state: {
    classData: {
      slots: [],
      data: {}
    },
    count: 0,
    search: [],
    classes: {}
  },
  actions: {
    async searchClasses(
      { commit, getters, dispatch },
      { keywords, skip, limit, status }
    ) {
      if (!keywords) return
      return axios
        .get(CLASS_API, {
          hideLoading: true,
          params: utils.filterObject({
            code_contains: keywords,
            skip,
            limit,
            status
          })
        })
        .then(classes => {
          commit('setSearch', classes)
        })
        .catch(e => alert.error(e))
    },
    async fetchClasses({ commit }, params) {
      const classes = await Class.fetch({ ...params, _sort: 'startTime:DESC' })
      commit('setClasses', classes)
    },
    async countClasses({ commit }, params) {
      const classes = await Class.count(params)
      commit('countClasses', classes)
    },
    async createClass({ commit }, classData) {
      classData.log = { action: 'create-class' }
      try {
        const c = await Class.create(classData)
        commit('setClass', c)
        alert.success('Tạo lớp học mới thành công!')
      } catch (e) {
        alert.error(e)
      }
    },
    async updateClass({ commit, state }, { id, ...classData }) {
      commit('setClass', await Class.update(id, classData))
    },
    async removeClasses({ dispatch }, items = []) {
      for (let item of items) {
        await dispatch('removeClass', item.id)
      }
    },
    async updateClasses({ dispatch }, items = []) {
      for (let item of items) {
        await dispatch('updateClass', item)
      }
    },
    async removeClass({ commit }, id) {
      await Class.remove(id)
      commit('removeClass', id)
    },
    setClass({ commit }, classData) {
      commit('setClass', classData)
    },
    setClasses({ commit }, classes) {
      commit('setClasses', classes)
    },
    setSearch({ commit }, search) {
      commit('setSearch', search)
    }
  },
  mutations: {
    setSearch(state, search) {
      state.search = search
    },
    setClasses(state, classes) {
      state.classes = _.keyBy(classes, 'id')
    },
    setClass(state, classData) {
      state.classes = {
        ...state.classes,
        [classData.id]: classData
      }
    },
    countClasses(state, count) {
      state.count = count
    },
    removeClass(state, id) {
      delete state.classes[id]
      state.classes = { ...state.classes }
    },
    setCount(state, count) {
      state.count = count
    }
  },
  getters: {
    classes: state => {
      return Object.values(state.classes)
    },
    classData: state => classId => {
      return _.get(state.classes, `${classId}.data`, {})
    },
    count: state => {
      return state.count
    },
    search: state => {
      return state.search
    }
  }
}
