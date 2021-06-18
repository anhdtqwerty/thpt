import { AcademicLevel } from '@/plugins/api'
import alert from '@/plugins/alert'
export default {
  namespaced: true,
  state: {
    primary: {},
    secondary: {},
    high: {}
  },
  actions: {
    async fetchAcademics({ commit }, options) {
      try {
        const academics = await AcademicLevel.fetch(options)
        const primary = academics.find(a => a.type === 'primary')
        const secondary = academics.find(a => a.type === 'secondary')
        const high = academics.find(a => a.type === 'high')
        commit('changeState', {
          primary,
          secondary,
          high
        })
      } catch (error) {
        alert.error(error)
      }
    },
    async updateAcademic({ commit }, { id, ...academic }) {
      try {
        await AcademicLevel.update(id, academic)
      } catch (e) {
        alert.error(e)
      }
    }
  },
  mutations: {}
}
