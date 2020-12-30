import axios from '@/plugins/axios'
import alert from '@/plugins/alert'
import router from '@/router'

const EVENT_API = '/events/'
const SLOT_API = '/slots/'
const CREATE_SLOTS_API = '/slots/bulk-create/'
const DELETE_SLOTS_API = '/slots/bulk-delete/'

export default {
  namespaced: true,
  state: {
    events: [],
    event: null
  },
  actions: {
    createSlots({ commit, state, dispatch }, slots = []) {
      if (!state.event || !slots.length) return
      return axios
        .post(
          CREATE_SLOTS_API,
          slots.map(slot => ({ ...slot, event: state.event.id }))
        )
        .then(newSlots => {
          commit('receive_slots', newSlots)
          dispatch('checkEventPeriod')
        })
        .catch(e => alert.error(e))
    },
    updateSlot({ commit, dispatch }, { id, ...slot }) {
      return axios
        .put(SLOT_API + id, slot)
        .then(newSlot => {
          commit('receive_slots', [slot])
          dispatch('checkEventPeriod')
        })
        .catch(e => alert.error(e))
    },
    removeSlots({ commit, dispatch }, slots = []) {
      if (!slots.length) return
      return axios
        .post(
          DELETE_SLOTS_API,
          slots.map(slot => ({ id: slot.id || slot }))
        )
        .then(slots => {
          commit('remove_slots', slots)
          dispatch('checkEventPeriod')
        })
        .catch(e => alert.error(e))
    },
    checkEventPeriod({ state, dispatch }) {
      if (!state.event) return
      const { startDate, endDate, slots = [], id } = state.event
      if (!slots.length) return
      let startTime = Number.MAX_SAFE_INTEGER
      let endTime = 0
      for (let slot of slots) {
        if (slot.date < startTime) startTime = slot.date
        if (slot.date > endTime) endTime = slot.date
      }
      const payload = {}
      if (startTime !== startDate) payload.startTime = startTime
      if (endTime !== endDate) payload.endTime = endTime
      if (Object.keys(payload).length) {
        return dispatch('updateEvent', { id, ...payload })
      }
    },
    fetchEvents({ commit }) {
      return axios
        .get(EVENT_API)
        .then(events => commit('setEvents', events))
        .catch(e => alert.error(e))
    },
    fetchEvent({ commit }, id) {
      return axios
        .get(EVENT_API + id)
        .then(event => commit('setEvent', event))
        .catch(e => alert.error(e))
    },
    createEvent({ commit }, event) {
      return axios
        .post(EVENT_API, event)
        .then(event => {
          commit('setEvent', event)
          router.push(event.slug)
        })
        .catch(e => alert.error(e))
    },
    updateEvent({ commit }, { id, ...event }) {
      return axios
        .put(EVENT_API + id, event)
        .then(event => {
          commit('setEvent', event)
          alert.success('Event updated')
        })
        .catch(e => alert.error(e))
    },
    removeEvent({ commit }, id) {
      return axios
        .delete(EVENT_API + id)
        .then(event => {
          commit('removeEvent', event.id)
          alert.success('Event deleted')
        })
        .catch(e => alert.error(e))
    },
    async removeEvents({ dispatch }, items) {
      for (let item of items) {
        await dispatch('removeEvent', item.id)
      }
    }
  },
  mutations: {
    setEvents(state, events) {
      state.events = events
    },
    setEvent(state, event) {
      state.event = event
    },
    removeEvent(state, eventId) {
      const i = state.events.findIndex(({ id }) => id === eventId)
      if (i > -1) {
        state.events.splice(i, 1)
      }
    },
    receive_slots(state, slots) {
      if (!state.event) return
      if (!state.event.slots) Object.assign(state.event, { slots: [] })
      slots.forEach(slot => {
        const i = state.event.slots.findIndex(s => s.id === slot.id)
        if (i > -1) {
          state.event.slots.splice(i, 1, slot)
        } else {
          state.event.slots.push(slot)
        }
      })
    },
    remove_slots(state, slots) {
      if (!state.event || !state.event.slots) return
      const ids = slots.map(slot => slot.id || slot)
      const oldSlots = state.event.slots
      for (let i = oldSlots.length - 1; i >= 0; i--) {
        if (ids.includes(oldSlots[i].id)) oldSlots.splice(i, 1)
      }
    }
  }
}
