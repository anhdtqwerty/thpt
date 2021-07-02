// import axios from '@/plugins/axios'
import alert from '@/plugins/alert'
import { Diligence, Student } from '@/plugins/api'
import loading from '../../plugins/loading'
import { keyBy, rangeRight } from 'lodash'
import moment from 'moment'

export default {
  namespaced: true,
  state: {
    diligences: {},
    pageText: '',
    itemsPerPage: 10,
    searchParams: {},
    totalItems: 0,
    studentDiligences: []
  },
  actions: {
    async searchDiligences({ commit, state, dispatch }, query) {
      console.log('query ', query)
      const searchParams = {
        _limit: state.itemsPerPage,
        ...query
      }

      commit('changeState', { searchParams })
      dispatch('requestPageSettings', {})
    },
    async requestPageSettings({ state, commit, dispatch }, { page, itemsPerPage }) {
      loading.active = true
      if (!page) page = 1
      if (!itemsPerPage) itemsPerPage = state.itemsPerPage
      if (state.searchParams) {
        const searchParams = {
          ...state.searchParams,
          _start: (page - 1) * itemsPerPage,
          _limit: itemsPerPage,
          _sort: 'createdAt:DESC'
        }
        const [totalItems, students] = await Promise.all([Student.count(searchParams), Student.search(searchParams)])

        let studentDiligences = []
        await Promise.all(
          students.map(async student => {
            const diligences = await Diligence.fetch({ student: student.id, generation: searchParams.generation })
            studentDiligences.push({ student, diligences })
            return diligences
          })
        )
        // console.log(
        //   'studentDiligences',
        //   studentDiligences,
        //   searchParams.generation,
        //   studentDiligences.map(s => s.diligences.length > 0),
        //   totalItems
        // )

        if (totalItems > (page - 1) * itemsPerPage || page === 1) {
          commit('changeState', {
            studentDiligences,
            totalItems,
            itemsPerPage,
            searchParams
          })
        }

        const pageStart = (page - 1) * itemsPerPage + 1
        let pageStop = page * itemsPerPage
        pageStop = pageStop > totalItems || pageStop === -1 ? totalItems : pageStop
        const pageText = `${pageStart}-${pageStop} trên ${totalItems}`
        commit('changeState', { pageText })
      } else {
        // var pages = rangeRight(1, page)
        // for (let index = 0; index < pages; index++) {
        //   const selectedPage = pages[index]
        //   if (totalItems > (selectedPage - 1) * itemsPerPage) {
        //     dispatch('requestPageSettings', {})
        //     break
        //   }
        // }
      }
      loading.active = false
    },

    async fetchDiligences({ commit }, options) {
      commit('setDiligences', await Diligence.fetch(options))
    },
    async fetchStudentDiligences({ commit }, query) {
      const studentParams = {
        status: 'active',
        _limit: -1
      }
      if (query && query.class) {
        studentParams.class = query.class.id
        studentParams.grade = query.class.grade
      }
      const students = await Student.fetch(studentParams)

      const time = moment()
        .startOf('day')
        .toISOString()
      const diligenceParam = {
        time_gte: time,
        _limit: -1
      }
      if (query && query.status) diligenceParam.status = query.status
      const diligences = await Diligence.fetch(diligenceParam)

      let list = []
      const studentDiligences = students.map(student => {
        const diligence = diligences.find(a => a.student.id === student.id)
        return { student, diligence }
      })

      commit('changeState', { studentDiligences })
    },

    async createDiligence({ commit }, data) {
      try {
        commit('setDiligence', await Diligence.create(data))
      } catch (e) {
        alert.error(e)
      }
    },
    async updateDiligence({ commit }, { id, ...diligence }) {
      commit('updateDiligence', await Diligence.update(id, diligence))
    }
  },
  mutations: {
    setDiligences(state, diligences) {
      state.diligences = diligences.reduce(
        (accumulator, currentValue) => ({
          ...accumulator,
          [currentValue.id]: currentValue
        }),
        {}
      )
    },
    setDiligence(state, diligence) {
      console.log('diligence', diligence)
      state.diligences = {
        ...state.diligences,
        [diligence.id]: diligence
      }
    },
    updateDiligence(state, diligence) {
      const diligences = Object.values(state.diligences).map(a => {
        if (diligence.id === a.id) return diligence
        else return a
      })
      state.diligences = keyBy(diligences, 'id')
    }
  },
  getters: {
    diligences: state => {
      return Object.values(state.diligences)
    }
  }
}
