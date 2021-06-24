import { Class } from '@/plugins/api'
import loading from '../../plugins/loading'
import { map } from 'lodash'
export default {
  namespaced: true,
  state: {
    classes: {},
    ownClassTeacherData: []
  },
  actions: {
    async searchOwnClassTeacher({ commit }, query) {
      loading.active = true
      const { department, generation, classId, grade } = query
      const classQuery = { grade, id: classId, generation, department }
      var data = await Class.fetch(classQuery)
      if (query.teacher) {
        data = data.filter(item => map(item.headTeachers, 'id').includes(query.teacher.id))
        data.forEach(d => {
          d.headTeachers = [query.teacher]
        })
      }
      commit('setOwnClassTeacherData', data)
    },
    async updateClass({ commit, state }, { id, ...classData }) {
      await Class.update(id, { headTeachers: classData.headTeachers })
    }
  },
  mutations: {
    setOwnClassTeacherData(state, classes) {
      loading.active = true
      var temp = []
      classes.forEach(item => {
        if (item.headTeachers.length === 0) {
          temp = [...temp, { ...item, generatedId: item.id }]
          return
        }
        item.headTeachers.forEach(teacher => {
          temp = [...temp, { ...item, generatedId: item.id + teacher.id, headTeacher: teacher }]
        })
      })
      state.ownClassTeacherData = temp
      loading.active = false
    }
  }
}
