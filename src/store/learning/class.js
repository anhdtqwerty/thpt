import alert from '@/plugins/alert'
import { Class } from '@/plugins/api'
import _ from 'lodash'
import loading from '../../plugins/loading'

export default {
  namespaced: true,
  state: {
    classData: {
      slots: [],
      data: {}
    },
    count: 0,
    search: [],
    classes: {},
    classesData: [],
    pageText: '',
    itemsPerPage: 10,
    classSearchParams: {},
    totalItems: 0
  },
  actions: {
    async searchClasses({ commit, state, dispatch }, query) {
      const classSearchParams = {
        _limit: state.itemsPerPage,
        ...query
      }

      commit('changeState', { classSearchParams })
      dispatch('requestPageSettings', {})
    },
    async requestPageSettings({ state, commit, dispatch }, { page, itemsPerPage }) {
      loading.active = true
      if (!page) page = 1
      if (!itemsPerPage) itemsPerPage = state.itemsPerPage
      if (state.classSearchParams) {
        const classSearchParams = {
          ...state.classSearchParams,
          _start: (page - 1) * itemsPerPage,
          _limit: itemsPerPage,
          _sort: 'createdAt:DESC'
        }
        const [totalItems, classesData] = await Promise.all([
          Class.count(classSearchParams),
          Class.search(classSearchParams)
        ])

        if (totalItems > (page - 1) * itemsPerPage || page === 1) {
          commit('changeState', {
            classesData,
            totalItems,
            itemsPerPage,
            classSearchParams
          })

          const pageStart = (page - 1) * itemsPerPage + 1
          const pageStop = page * itemsPerPage
          const pageText = `${pageStart}-${pageStop} trên ${totalItems}`
          commit('setPageText', pageText)
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

      loading.active = false
    },
    async fetchClasses({ commit }, params) {
      const classes = await Class.fetch({ ...params })
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
        return c
      } catch (e) {
        alert.error(e)
      }
    },
    async updateClass({ commit, state }, { id, ...classData }) {
      commit('updateClass', await Class.update(id, classData))
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
    setPageText(state, pageText) {
      state.pageText = pageText
    },
    setSearch(state, search) {
      state.search = search
    },
    setClasses(state, classes) {
      state.classes = _.keyBy(classes, 'id')
    },
    setClass(state, classData) {
      state.classes = {
        [classData.id]: classData,
        ...state.classes
      }
    },
    updateClass(state, classData) {
      const classes = Object.values(state.classes).map(c => {
        if (classData.id === c.id) return classData
        else return c
      })
      state.classes = _.keyBy(classes, 'id')
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
