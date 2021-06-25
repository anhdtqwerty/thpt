/* eslint-disable vue/valid-v-slot */
import alert from '@/plugins/alert'
import { Teachings, Subject, Class } from '@/plugins/api'
import loading from '../../plugins/loading'
import { get } from 'lodash'
export default {
  namespaced: true,
  state: {
    teachings: [],
    teaching: {}
  },
  actions: {
    async searchTeaching({ commit, state, dispatch }, query) {
      try {
        loading.active = true
        const subject = await Subject.fetch({
          _limit: -1,
          id: query.subject,
          grade: query.grade,
          subjectGroup: query.subjectGroup
        })
        const classQuery = {
          _limit: -1,
          id: query.class,
          grade: query.grade,
          status: 'running',
          generation: query.generation,
          department: query.department
        }
        const classes = await Class.fetch(classQuery)
        const teachings = await Teachings.fetch({
          _limit: -1,
          teacher: query.teacher,
          generation: query.generation
        })
        let teachingsTemp = []
        classes.map(c => {
          if (!c.grade) return
          subject.map(s => {
            if (!s.division || !c.division || get(s.division, 'id') !== get(c.division, 'id')) return
            const teaching = teachings.filter(t => t.subject.id === s.id && t.class.id === c.id)
            const teachingData = { grade: c.grade, class: c, subject: s, teacher: null }
            if (teaching.length > 0) {
              teaching.map(m => {
                teachingsTemp = [...teachingsTemp, { ...teachingData, teacher: m.teacher, id: m.id }]
              })
            } else if (!query.teacher) {
              teachingsTemp = [...teachingsTemp, teachingData]
            }
          })
        })
        commit('setTeachings', teachingsTemp)
      } catch (e) {
        this.$alert.error(e.message)
      } finally {
        loading.active = false
      }
    },
    async fetchTeachings({ commit }, options) {
      const teachings = await Teachings.fetch({ ...options, _limit: -1 })
      return teachings
    },

    async fetchTeaching({ commit }, teachingId) {
      const teaching = await Teachings.fetchOne(teachingId)
      commit('setTeaching', teaching)
    },
    async createTeaching({ state, dispatch }, teachingData) {
      try {
        await Teachings.create(teachingData)
        alert.success('Tạo phân công giảng dạy thành công')
      } catch (error) {
        alert.error('Tạo phân công giảng dạy thất bại')
      }
    },
    async removeTeaching({ commit }, teachingId) {
      await Teachings.remove(teachingId)
      commit('removeTeaching', teachingId)
      alert.success('Xóa thành công!')
    },
    async updateTeaching({ commit }, { id, ...teaching }) {
      commit('setTeaching', await Teachings.update(id, teaching))
      alert.success('Cập nhật thành công!')
    }
  },
  mutations: {
    setTeaching(state, teaching) {
      const teachings = state.teachings.map(t => {
        if (t.id === teaching.id) {
          return teaching
        } else return t
      })
      state.teachings = teachings
    },
    removeTeaching(state, teacherId) {
      state.teachings = state.teachings.filter(t => {
        return t.id !== teacherId
      })
    },
    setTeachings(state, teachings) {
      state.teachings = teachings
    }
  }
}
