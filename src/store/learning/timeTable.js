import alert from '@/plugins/alert'
import { Slot, Teachings } from '@/plugins/api'
import _ from 'lodash'
export default {
  namespaced: true,
  state: {
    classSlots: {},
    teacherSlots: {},
    teachings: [],
    slots: {}
  },
  actions: {
    async fetchSlots({ commit }, params) {
      commit('setSlots', await Slot.fetch({ ...params, _limit: -1 }))
    },
    async fetchClassSlots({ commit }, params) {
      commit('setClassSlots', await Slot.fetch({ ...params, _limit: -1 }))
    },
    async fetchTeacherSlots({ commit }, params) {
      commit('setTeacherSlots', await Slot.fetch({ ...params, _limit: -1 }))
    },
    async removeSlot({ commit }, id) {
      commit('removeSlot', await Slot.remove(id))
    },
    async fetchTeachings({ commit }, options) {
      commit('setTeachings', await Teachings.fetch({ ...options, _limit: -1 }))
    },
    async createSlot({ commit }, data) {
      try {
        commit('setClassSlot', await Slot.create(data, {}))
      } catch (e) {
        alert.error(e)
      }
    },
    async updateSlot({ commit }, { id, ...slot }) {
      try {
        commit('setClassSlot', await Slot.update(id, slot))
        alert.success('Cập nhật thành công!')
      } catch (e) {
        alert.error(e)
      }
    }
  },
  mutations: {
    setSlot(state, slot) {
      state.slots = {
        ...state.slots,
        [`${slot.index}-${slot.day}`]: slot
      }
    },
    setSlots(state, slots) {
      state.slots = slots
    },
    setTeachings(state, teachings) {
      state.teachings = teachings
    },
    setTeacherSlots(state, slots) {
      state.teacherSlots = _.keyBy(
        slots.map(s => ({ key: `${s.index}-${s.day}`, ...s })),
        'key'
      )
    },
    setClassSlots(state, slots) {
      state.classSlots = _.keyBy(
        slots.map(s => ({ key: `${s.index}-${s.day}`, ...s })),
        'key'
      )
    },
    setClassSlot(state, slot) {
      state.classSlots = {
        ...state.classSlots,
        [`${slot.index}-${slot.day}`]: slot
      }
    },
    removeSlot(state, slot) {
      delete state.teacherSlots[`${slot.index}-${slot.day}`]
      delete state.classSlots[`${slot.index}-${slot.day}`]
      state.teacherSlots = { ...state.teacherSlots }
      state.classSlots = { ...state.classSlots }
    }
  }
}
