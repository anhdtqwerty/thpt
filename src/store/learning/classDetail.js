import alert from '@/plugins/alert'
import { Class, Attendance, Slot, Log, Mark, Teachings, SubjectGroup } from '@/plugins/api'
import { get, keyBy } from 'lodash'
import utils from '../../plugins/utils'

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
    marks: {},
    teachings: {},
    subjectGroups: {}
  },
  actions: {
    async initClass({ commit }, { id, generation }) {
      const [classData, slots, attendances, marks, teachings, subjectGroups] = await Promise.all([
        Class.fetchOne(id),
        Slot.fetch({ class: id }),
        Attendance.fetch({ class: id, _limit: -1 }),
        Mark.fetch({ class: id }),
        Teachings.fetch({ class: id, generation }),
        SubjectGroup.fetch({ _limit: -1 })
      ])
      commit('changeState', {
        classData,
        attendances: keyBy(attendances, a => a.id + a.userId),
        slots: keyBy(
          slots.map(s => ({ key: `${s.index}-${s.day}`, ...s })),
          'key'
        ),
        students: keyBy(classData.students, 'id'),
        marks: keyBy(marks, m => get(m, 'student.id', '')),
        teachings,
        subjectGroups
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
      commit('setAttendances', await Attendance.fetch({ ...params, _limit: -1 }))
    },
    async updateClass({ commit, state }, { id, ...classData }) {
      commit('setClass', await Class.update(id, classData))
    },
    async createAttendance({ commit }, { data, option = {} }) {
      commit('setAttendance', await Attendance.create(data, option))
    },
    async createAttendances({ dispatch }, attendances) {
      await Promise.all(attendances.map(item => dispatch('createAttendance', { data: item })))
    },
    async createSlots({ dispatch }, slots) {
      await Promise.all(slots.map(item => dispatch('createSlot', { data: item })))
    },
    async createSlot({ commit }, data) {
      try {
        commit('setSlot', await Slot.create(data, {}))
      } catch (e) {
        alert.error(e)
      }
    },
    async createMarks({ dispatch }, marks) {
      await Promise.all(marks.map(item => dispatch('createMark', { data: item })))
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
      state.students = keyBy(classData.students, 'id')
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
        [`${slot.index}-${slot.day}`]: slot
      }
    },
    setSlots(state, slots) {
      state.slots = keyBy(
        slots.map(s => ({ key: `${s.index}-${s.day}`, ...s })),
        'key'
      )
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
    slots: state => state.slots,
    attendances: state => {
      return state.attendances
    },
    students: state => {
      return utils.sortListByName(Object.values(state.students))
    }
  }
}
