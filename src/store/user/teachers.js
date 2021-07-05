/* eslint-disable vue/valid-v-slot */
import alert from '@/plugins/alert'
import loading from '../../plugins/loading'
import { Teacher, User } from '@/plugins/api'
import { rangeRight } from 'lodash'

export default {
  namespaced: true,
  state: {
    count: 0,
    teachers: [],
    teacherSearchParams: {},
    totalItems: 0,
    itemsPerPage: 10,
    generations: [],
    pageText: ''
  },
  actions: {
    async requestPageSettings({ state, commit, dispatch }, { page, itemsPerPage }) {
      loading.active = true
      if (!page) page = 1
      if (!itemsPerPage) itemsPerPage = state.itemsPerPage
      if (state.teacherSearchParams) {
        const teacherSearchParams = {
          _sort: 'createdAt:DESC',
          ...state.teacherSearchParams,
          _start: (page - 1) * itemsPerPage,
          _limit: itemsPerPage
        }
        const [totalItems, teachers] = await Promise.all([
          Teacher.count(teacherSearchParams),
          Teacher.search(teacherSearchParams)
        ])

        if (totalItems > (page - 1) * itemsPerPage || page === 1) {
          commit('changeState', {
            teachers,
            totalItems,
            itemsPerPage,
            teacherSearchParams
          })

          const pageStart = (page - 1) * itemsPerPage + 1
          let pageStop = page * itemsPerPage
          pageStop = pageStop > totalItems || pageStop === -1 ? totalItems : pageStop
          const pageText = `${pageStart}-${pageStop} trên ${totalItems}`
          commit('setPageText', pageText)
        } else {
          var pages = rangeRight(1, page)
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
    async fetchTeachers({ commit }, options) {
      const result = await Teacher.fetch({ ...options, _limit: -1 })
      return result
    },
    async searchTeachers({ commit, state, dispatch }, query) {
      const teacherSearchParams = {
        _limit: state.itemsPerPage,
        ...query
      }
      commit('changeState', { teacherSearchParams })
      dispatch('requestPageSettings', {})
    },
    async createTeacher({ commit }, data) {
      try {
        const user = await User.create({
          username: data.username,
          password: data.password,
          email: data.email,
          ...data
        })
        if (user) {
          data.user = user.id
          data.code = user.username
          const teacher = await Teacher.create({ ...data })
          alert.success('Tạo Giáo Viên Thành Công!')
          return teacher
        } else {
          alert.error('Tạo Thất Bại!')
        }
      } catch (error) {
        console.error(error)
      }
    }
  },
  mutations: {
    setPageText(state, pageText) {
      state.pageText = pageText
    },
    setCount(state, count) {
      state.count = count
    }
  }
}
