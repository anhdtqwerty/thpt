import alert from '@/plugins/alert'
import { Generation, Upload } from '@/plugins/api'
import { set } from 'lodash'
export default {
  namespaced: true,
  state: {
    generations: {},
    count: 0
  },
  actions: {
    async fetchGenerations({ commit }, options) {
      try {
        commit('setGenerations', await Generation.fetch(options))
      } catch (e) {
        alert.error(e)
      }
    },
    async countGenerations({ commit }, options) {
      try {
        commit('setCount', await Generation.count(options))
      } catch (e) {
        alert.error(e)
      }
    },
    async fetchGeneration({ commit }, generationId) {
      try {
        commit('setGeneration', await Generation.fetchOne(generationId))
      } catch (e) {
        alert.error(e)
      }
    },
    async createGeneration({ commit }, data) {
      try {
        commit('setGeneration', await Generation.create(data))
      } catch (e) {
        alert.error(e)
      }
    },
    async updateGeneration({ commit, state }, { id, ...generation }) {
      try {
        commit('setGeneration', [await Generation.update(id, generation)])
        alert.success('Cập nhật thành công!')
      } catch (e) {
        alert.error(e)
      }
    },
    async removeGeneration({ commit }, id) {
      try {
        await Generation.remove(id)
        commit('removeGeneration', id)
        alert.success('Xóa thành công!')
      } catch (e) {
        alert.error(e)
      }
    },
    setGeneration({ commit, state }, generation) {
      commit('setGeneration', generation)
    },
    async removeGenerations({ dispatch }, items) {
      for (let item of items) {
        await dispatch('removeGeneration', item.id)
      }
    },
    async uploadAvatar({ commit }, { generationId, formData }) {
      try {
        let data = await Upload.upload(formData)
        commit('setAvatar', { generationId, avatar: data[0] })
        alert.success('Upload successfully!')
      } catch (e) {
        alert.error(e)
      }
    },
    async destroyAvatar({ commit }, id) {
      try {
        await Upload.destroy(id)
      } catch (e) {
        alert.error(e)
      }
    }
  },
  mutations: {
    setGenerations(state, generations) {
      state.generations = generations.reduce(
        (accumulator, currentValue) => ({
          ...accumulator,
          [currentValue.id]: currentValue
        }),
        {}
      )
    },
    setGeneration(state, generation) {
      state.generations = {
        ...state.generations,
        [generation.id]: generation
      }
    },
    removeGeneration(state, generationId) {
      delete state.generations[generationId]
      state.generations = { ...state.generations }
    },
    setAvatar(state, { generationId, avatar }) {
      set(state.generations, `${generationId}.avatar`, avatar)
      state.generations = { ...state.generations }
    }
  },
  getters: {
    generations: state => {
      return Object.values(state.generations)
    },
    generation: state => id => {
      return state.generations[id]
    },
    count: state => {
      return state.count
    }
  }
}
