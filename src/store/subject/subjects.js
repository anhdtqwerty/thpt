import { Subject, Factor } from '@/plugins/api'
import alert from '@/plugins/alert'
const defaultFactors = [
  {
    title: 'Miệng',
    index: 0,
    quantity: 3,
    multiply: 1
  },
  {
    title: 'Thực hành',
    index: 1,
    quantity: 2,
    multiply: 1
  },
  {
    title: '15 phút',
    index: 2,
    quantity: 3,
    multiply: 1
  },
  {
    title: '1 tiết',
    index: 3,
    quantity: 2,
    multiply: 2
  },
  {
    title: 'Học kỳ',
    index: 4,
    quantity: 1,
    multiply: 3
  }
]

export default {
  namespaced: true,
  state: {
    subjects: [],
    subject: {}
  },
  actions: {
    async fetchSubjects({ commit }, options) {
      try {
        commit('setSubjects', await Subject.fetch(options))
      } catch (error) {
        alert.error(error)
      }
    },
    async fetchSubject({ commit }, id) {
      try {
        commit('setSubject', await Subject.fetchOne(id))
      } catch (error) {
        alert.error(error)
      }
    },
    async createSubject({ commit }, data) {
      try {
        const factors = [
          ...defaultFactors.map(f => ({
            ...f,
            semesterType: 'semester-1'
          })),
          ...defaultFactors.map(f => ({
            ...f,
            semesterType: 'semester-2'
          }))
        ]
        console.log(factors)
        const factorPromises = factors.map(async f => Factor.create(f))
        const factorRes = await Promise.all(factorPromises)
        console.log(factors)
        commit('createSubject', await Subject.create({ ...data, factors: factorRes.map(f => f.id) }))
      } catch (e) {
        alert.error(e)
      }
    },
    async removeSubject({ commit }, id) {
      try {
        await Subject.remove(id)
        commit('removeSubject', id)
        alert.success('Xóa thành công!')
      } catch (e) {
        alert.error(e)
      }
    },
    async updateSubject({ commit }, { id, ...subject }) {
      try {
        const res = await Subject.update(id, subject)
        commit('updateSubject', { id, subject: res })
        alert.success('Cập nhật thành công!')
      } catch (e) {
        alert.error(e)
      }
    }
  },
  mutations: {
    setSubjects(state, subjects) {
      state.subjects = subjects
    },
    setSubject(state, subject) {
      state.subject = subject
    },
    updateSubject(state, { subject, id }) {
      state.subjects = state.subjects.map(g => {
        if (g.id === id) return subject
        else return g
      })
      state.subject = subject
    },
    createSubject(state, subject) {
      state.subjects = [subject, ...state.subjects]
    },
    removeSubject(state, id) {
      state.subjects = state.subjects.filter(subject => subject.id !== id)
    }
  }
}
