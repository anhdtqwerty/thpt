import alert from '@/plugins/alert'
import { Slot, Class, Attendance } from '@/plugins/api'
export default {
  namespaced: true,
  state: {
    slots: {},
    count: 0
  },
  actions: {
    async fetchSlots({ commit }, options) {
      try {
        commit('setSlots', await Slot.fetch(options))
      } catch (e) {
        alert.error(e)
      }
    },
    async fetchClass({ commit }, slotId) {
      try {
        commit('setSlots', [await Slot.fetchOne(slotId)])
      } catch (e) {
        alert.error(e)
      }
    },
    async countSlots({ commit }, options) {
      try {
        commit('setCount', await Slot.count(options))
      } catch (e) {
        alert.error(e)
      }
    },
    async fetchSlot({ commit }, slotId) {
      const attendances = await Attendance.fetch({ slot: slotId })
      const slotData = await Slot.fetchOne(slotId)
      const classData = await Class.fetchOne(slotData.class.id)
      commit('setSlot', {
        ...slotData,
        attendances: attendances.reduce(
          (data, current) => ({
            ...data,
            [current.userId + current.slot.id]: current
          }),
          {}
        ),
        class: classData
      })
    },
    async createSlot({ commit }, { data, options }) {
      try {
        commit('setSlots', [await Slot.create(data, options)])
      } catch (e) {
        alert.error(e)
      }
    },
    async updateSlot({ commit, state }, { id, ...slot }) {
      commit('setSlot', await Slot.update(id, slot))
    },
    async removeSlot({ commit }, id) {
      commit('removeSlot', await Slot.remove(id))
    },
    setSlot({ commit, state }, slot) {
      commit('setSlot', slot)
    },
    setSlots({ commit, state }, slots) {
      commit('setSlots', slots)
    },
    async removeSlots({ dispatch }, items) {
      await Promise.all(items.map(item => dispatch('removeSlot', item.id)))
    }
  },
  mutations: {
    setSlot(state, slot) {
      state.slots = {
        ...state.slots,
        [slot.id]: slot
      }
    },
    setSlots(state, slots) {
      state.slots = {
        ...slots.reduce(
          (accumulator, currentValue) => ({
            ...accumulator,
            [currentValue.id]: currentValue
          }),
          {}
        )
      }
    },
    setCount(state, count) {
      state.count = count
    },
    removeSlot(state, slot) {
      delete state.slots[slot.id]
      state.slots = { ...state.slots }
    }
  },
  getters: {
    slots: state => {
      return Object.values(state.slots)
    },
    slot: state => id => {
      return state.slots[id]
    },
    count: state => {
      return state.count
    }
  }
}
