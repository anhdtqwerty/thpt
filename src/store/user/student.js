import axios from '@/plugins/axios'
import alert from '@/plugins/alert'
import { get } from 'lodash'
import { Class, Lead, Student, Log, Mark, Major, Subject, History } from '@/plugins/api'
const STUDENT_API = '/students/'
const USER_API = '/users/'
const UPLOAD_API = '/upload/'
const DESTROY_API = '/upload/files/'
export default {
  namespaced: true,
  state: {
    student: {},
    students: {},
    majors: [],
    tuitions: [],
    logs: [],
    classes: {
      // courseId: class
    },
    marks: {
      // courseId: mark
    },
    notifications: []
  },
  actions: {
    uploadAvatar({ commit }, formData) {
      return axios
        .post(UPLOAD_API, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(response => {
          commit('setAvatar', response[0])
          // alert.success('Tải ảnh thành công!')
        })
        .catch(e => alert.error('Tải ảnh thất bại'))
    },
    async createMark({ commit }, { data, options }) {
      commit('setMark', await Mark.create(data, options))
    },
    destroyAvatar({ commit }, id) {
      return axios
        .delete(DESTROY_API + id)
        .then(staff => {
          console.log('Remove success')
          commit('setAvatar', null)
        })
        .catch(e => alert.error(e))
    },
    async fetchLogs({ commit }, params) {
      const logs = await Log.fetch(params)
      commit('setLogs', logs)
    },
    async fetchMajors({ commit }, params) {
      commit('setMajors', await Major.fetch(params))
    },
    async fetchClasses({ commit }, params) {
      commit('setClasses', await Class.fetch(params))
    },
    async fetchStudent({ commit }, studentId) {
      commit('setStudent', null)
      const student = await Student.fetchOne(studentId)
      commit('setStudent', student)
    },
    async fetchStudents({ commit }, options) {
      commit('setStudents', await Student.fetch(options))
    },
    async fetchMarks({ commit }, studentId) {
      commit('setMarks', await Mark.fetch({ student: studentId }))
    },
    async fetchTuitions({ commit }, query) {
      commit('setTuitions', await Lead.fetch(query))
    },
    async setTuitions({ commit }, tuitions) {
      commit('setTuitions', tuitions)
    },
    async updateStudent({ commit, state }, { id, ...student }) {
      student = await Student.update(id, student)
      commit('setStudent', student)
      return student
    },
    async removeStudent({ commit }, student) {
      if (student.user) {
        await axios.delete(USER_API + student.user.id).catch(e => alert.error(e))
      }
      await axios
        .delete(STUDENT_API + student.id)
        .then(student => {
          commit('removeStudent', student.id)
        })
        .catch(e => alert.error(e))
    },
    setStudent({ commit }, student) {
      commit('setStudent', student)
    },
    async fetchSubjectMarks({ commit }, { student, ...params }) {
      const division = student.currentClass.division
      if (division) {
        const subjects = await Subject.fetch({ division, grade: student.grade.id })
        const marks = await Mark.fetch({ ...params, class: student.currentClass.id, student: student.id })
        return { subjects, marks }
      }
      return {}
    },
    async fetchNotifications({ commit }, student) {
      const notifications = await History.fetch({ student: student.id, _limit: 10, _sort: 'createdAt:DESC' })
      commit('changeState', { notifications })
    }
  },
  mutations: {
    setAvatar(state, avatar) {
      state.student = {
        ...state.student,
        avatar: avatar
      }
      state.avatar = avatar
    },
    setMarks(state, marks) {
      state.marks = marks.reduce((acc, cur) => ({ ...acc, [get(cur, 'course.id', '')]: cur }), {})
    },
    setMark(state, mark) {
      state.marks = {
        ...state.marks,
        [mark.course.id]: mark
      }
    },
    setTuitions(state, tuitions) {
      state.tuitions = tuitions
    },
    setSearch(state, search) {
      state.search = search
    },
    setCount(state, count) {
      state.count = count
    },
    setStudents(state, students) {
      state.students = students.reduce(
        (accumulator, currentValue) => ({
          ...accumulator,
          [currentValue.id]: currentValue
        }),
        {}
      )
    },
    setStudent(state, student) {
      state.student = student
    },
    removeStudent(state, studentId) {},
    setLogs(state, logs) {
      state.logs = logs
    },
    setMajors(state, majors) {
      state.majors = majors
    },
    setClasses(state, classes) {
      state.classes = classes.reduce((acc, cur) => ({ ...acc, [get(cur, 'course.id', '')]: cur }), {})
    }
  },
  getters: {
    logs: state => {
      return state.logs
    },
    marks: state => {
      return state.marks
    },
    majors: state => {
      return state.majors
    },
    avatar: state => {
      return state.avatar
    },
    classes: state => {
      return state.classes
    },
    student: state => {
      return state.student || {}
    },
    tuitions: state => {
      return state.tuitions
    },
    getMarkByCourseId: state => courseId => {
      return state.mark[courseId] || {}
    },
    notifications: state => {
      return state.notifications.map(n => {
        if (n.postToType === 'student') n.to = 'Em ' + n.student.name
        else if (n.postToType === 'class') n.to = 'Lớp ' + n.class.title
        else if (n.postToType === 'grade') n.to = n.grade.title
        else if (n.postToType === 'department') n.to = 'Học sinh toàn trường'

        return n
      })
    }
  }
}
