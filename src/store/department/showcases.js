import alert from '@/plugins/alert'
import { Showcase, Upload, Major } from '@/plugins/api'
import { set } from 'lodash'
export default {
  namespaced: true,
  state: {
    showcases: {},
    majors: [],
    count: 0
  },
  actions: {
    async fetchShowcases ({ commit }, options) {
      try {
        commit('setShowcases', await Showcase.fetch(options))
      } catch (e) {
        alert.error(e)
      }
    },
    async fetchMajors ({ commit }, options) {
      try {
        commit(
          'setMajors',
          await Major.fetch({
            ...options,
            type_nin: 'root',
            _sort: 'type:DESC'
          })
        )
      } catch (e) {
        alert.error(e)
      }
    },
    async countShowcases ({ commit }, options) {
      try {
        commit('setCount', await Showcase.count(options))
      } catch (e) {
        alert.error(e)
      }
    },
    async fetchShowcase ({ commit }, showcaseId) {
      try {
        commit('setShowcase', await Showcase.fetchOne(showcaseId))
      } catch (e) {
        alert.error(e)
      }
    },
    async createShowcase ({ commit }, data) {
      try {
        let showcase = await Showcase.create(data)
        commit('setShowcase', showcase)
        return showcase
      } catch (e) {
        alert.error(e)
      }
    },
    async updateShowcase ({ commit, state }, { id, ...showcase }) {
      try {
        commit('setShowcase', [await Showcase.update(id, showcase)])
        alert.success('Cập nhật thành công!')
      } catch (e) {
        alert.error(e)
      }
    },
    async removeShowcase ({ commit }, id) {
      try {
        await Showcase.remove(id)
        commit('removeShowcase', id)
        alert.success('Xóa thành công!')
      } catch (e) {
        alert.error(e)
      }
    },
    setShowcase ({ commit, state }, showcase) {
      commit('setShowcase', showcase)
    },
    async removeShowcases ({ dispatch }, items) {
      for (let item of items) {
        await dispatch('removeShowcase', item.id)
      }
    },
    async upload ({ commit }, { showcaseId, file }) {
      try {
        let formData = new FormData()
        formData.append('files', file)
        formData.append('refId', showcaseId)
        formData.append('field', 'image')
        await Upload.upload(formData)
        alert.success('Upload successfully!')
      } catch (e) {
        alert.error(e)
      }
    },
    async destroyAvatar ({ commit }, id) {
      try {
        await Upload.destroy(id)
      } catch (e) {
        alert.error(e)
      }
    }
  },
  mutations: {
    setShowcases (state, showcases) {
      state.showcases = showcases.reduce(
        (accumulator, currentValue) => ({
          ...accumulator,
          [currentValue.id]: currentValue
        }),
        {}
      )
    },
    setMajors (state, majors) {
      state.majors = majors
    },
    setShowcase (state, showcase) {
      state.showcases = {
        ...state.showcases,
        [showcase.id]: showcase
      }
    },
    removeShowcase (state, showcaseId) {
      delete state.showcases[showcaseId]
      state.showcases = { ...state.showcases }
    },
    setAvatar (state, { showcaseId, avatar }) {
      set(state.showcases, `${showcaseId}.avatar`, avatar)
      state.showcases = { ...state.showcases }
    }
  },
  getters: {
    showcases: state => {
      return Object.values(state.showcases)
    },
    showcase: state => id => {
      return state.showcases[id]
    },
    majors: state => {
      return state.majors
    }
  }
}
