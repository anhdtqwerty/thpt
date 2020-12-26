import alert from '@/plugins/alert'
import { Slot, Class } from '@/plugins/api'
export default {
  namespaced: true,
  state: {
    slots: [],
    classes: [],
    count: 0
  },
  actions: {
    async fetchClasses({ commit }, options) {
      try {
        const classes = await Class.fetch(options)
        commit('setClasses', classes)
        commit('setSlots', classes)
      } catch (e) {
        alert.error(e)
      }
    },
    async fetchSlots({ commit }, options) {
      try {
        commit('setSlots', await Slot.fetch({ ...options, _limit: 999 }))
      } catch (e) {
        alert.error(e)
      }
    }
  },
  mutations: {
    setSlots(state, slots) {
      state.slots = slots
    },
    setClasses(state, classes) {
      state.classes = classes
    },
    setCount(state, count) {
      state.count = count
    }
  },
  getters: {
    slots: state => {
      return state.slots
    },
    classes: state => {
      return state.classes
    },
    slot: state => id => {
      return state.slots[id]
    },
    count: state => {
      return state.count
    }
  }
}
