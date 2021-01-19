import alert from '@/plugins/alert'
import { Class, Attendance, Slot, Log, Mark } from '@/plugins/api'
import _ from 'lodash'

export default {
  namespaced: true,
  state: {
    classData: {},
    slots: {
      // id : {slot}
    },
    attendances: {
      // [slotId + userId] : {attendance}
    },
    logs: [],
    students: {},
    marks: {}
  },
  actions: {
    async initClass({ commit }, { id }) {
      const [classData, slots, attendances, marks] = await Promise.all([
        Class.fetchOne(id),
        Slot.fetch({ class: id }),
        Attendance.fetch({ class: id, _limit: -1 }),
        Mark.fetch({ class: id })
      ])
      commit('changeState', {
        classData,
        attendances: _.keyBy(attendances, a => a.slot.id + a.userId),
        slots: _.keyBy(slots, 'id'),
        students: _.keyBy(classData.students, 'id'),
        marks: _.keyBy(marks, m => _.get(m, 'student.id', ''))
      })
    },
    async fetchSlots({ commit }, params) {
      commit('setSlots', await Slot.fetch({ ...params, _limit: -1 }))
    },
    async fetchClass({ commit }, id) {
      commit('setClass', null)
      commit('setClass', await Class.fetchOne(id))
    },
    async fetchLogs({ commit }, params) {
      commit('setLogs', await Log.fetch(params))
    },
    async fetchAttendances({ commit }, params) {
      commit(
        'setAttendances',
        await Attendance.fetch({ ...params, _limit: -1 })
      )
    },
    async updateClass({ commit, state }, { id, ...classData }) {
      commit('setClass', await Class.update(id, classData))
    },
    async createAttendance({ commit }, { data, option = {} }) {
      commit('setAttendance', await Attendance.create(data, option))
    },
    async createAttendances({ dispatch }, attendances) {
      await Promise.all(
        attendances.map(item => dispatch('createAttendance', { data: item }))
      )
    },
    async createSlots({ dispatch }, slots) {
      await Promise.all(
        slots.map(item => dispatch('createSlot', { data: item }))
      )
    },
    async createSlot({ commit }, { data, options }) {
      try {
        commit('setSlot', await Slot.create(data, options))
      } catch (e) {
        alert.error(e)
      }
    },
    async createMarks({ dispatch }, marks) {
      await Promise.all(
        marks.map(item => dispatch('createMark', { data: item }))
      )
    },
    async createMark({ commit }, { data, options }) {
      commit('setMark', await Mark.create(data, options))
    },
    async updateSlot({ commit }, { id, ...slot }) {
      try {
        commit('setSlot', await Slot.update(id, slot))
        alert.success('Cập nhật thành công!')
      } catch (e) {
        alert.error(e)
      }
    },
    async removeSlot({ commit }, id) {
      commit('removeSlot', await Slot.remove(id))
    },
    setSlot({ commit, state }, slot) {
      commit('setSlot', slot)
    },
    setClass({ commit, state }, slot) {
      commit('setClass', slot)
    },
    async removeSlots({ dispatch }, items) {
      await Promise.all(items.map(item => dispatch('removeSlot', item.id)))
    }
  },
  mutations: {
    setClass(state, classData) {
      state.classData = classData
      state.students = _.keyBy(classData.students, 'id')
    },
    setAttendances(state, attendances) {
      state.attendances = attendances.reduce(
        (acc, cur) => ({
          ...acc,
          [cur.slot.id + cur.userId]: cur
        }),
        {}
      )
    },
    setAttendance(state, attendance) {
      state.attendances = {
        ...state.attendances,
        [attendance.slot.id + attendance.userId]: attendance
      }
    },
    setMark(state, mark) {
      state.marks = {
        ...state.marks,
        [mark.student.id]: mark || {}
      }
    },
    setLogs(state, logs) {
      state.logs = logs
    },
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
    removeSlot(state, slot) {
      delete state.slots[slot.id]
      state.slots = { ...state.slots }
    }
  },
  getters: {
    classData: state => {
      return state.classData
    },
    logs: state => {
      return state.logs
    },
    slots: state => {
      return Object.values(state.slots).sort((a, b) => {
        return ('' + a.code).localeCompare(b.code)
      })
    },
    attendances: state => {
      return state.attendances
    },
    students: state => {
      return Object.values(state.students)
    }
  }
}
