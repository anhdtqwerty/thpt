import alert from '@/plugins/alert'
import { Student, Class, Teacher, Post } from '@/plugins/api'
export default {
  namespaced: true,
  state: {
    classNo: 0,
    studentNo: 0,
    teacherNo: 0,
    posts: []
  },
  actions: {
    async fetchDepartmentData({ commit }, options) {
      try {
        const [classNo, studentNo, teacherNo] = await Promise.all([Class.count(), Student.count(), Teacher.count()])
        commit('changeState', { classNo, studentNo, teacherNo })
      } catch (e) {
        alert.error(e)
      }
    },
    async fetchNotifications({ commit }, options) {
      const posts = await Post.fetch({
        student_null: true,
        _limit: 10,
        _sort: 'createdAt:DESC'
      })
      commit('changeState', { posts })
    }
  },
  mutations: {},
  getters: {
    posts: state => {
      return state.posts.map(p => {
        if (p.department) p.postToType = 'Toàn trường'
        else if (p.grade) p.postToType = p.grade.title
        else if (p.class) p.postToType = `Lớp ${p.class.title}`
        // else if (p.student) p.postToType = `Học sinh ${p.student.name}`

        return p
      })
    }
  }
}
