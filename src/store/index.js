import Vuex from 'vuex'
import Vue from 'vue'
import createPersistedState from 'vuex-persistedstate'

import Dashboard from '@/store/dashboard/Dashboard.js'

import classModule from './learning/class'
import classDetail from './learning/classDetail'
import timeTable from './learning/timeTable'
import category from './other/category'
import email from './notify/email'
import search from './view/search.js'
/**
 * SALE
/**
 * CLASS
 */
import generation from './course/generation'
import semester from './course/semester'
import slot from './learning/slot'

import log from './other/log'
import event from './learning/event'
import mark from './learning/mark'
/**
 * MARK
 */
import Mark from './mark/Mark'
import MarkInput from './mark/MarkInput'
import StudentMark from './student/StudentMark'
/**
 * STUDENT
 */
import { axiosPlugin } from '@/plugins/axios'
import students from './user/students'
import studentDashboard from './dashboard/studentDashboard'
import student from './user/student'
import studentImporter from './importer/studentImporter.js'
import attendance from './student/attendance'
import { setWith } from 'lodash'
/**
 * DEPARTMENT
 */
import department from './other/department'
import departmentDashboard from '@/store/dashboard/departmentDashboard.js'
import role from './app/role'
import staff from './user/staff'
import teacher from './user/teacher'
import ownClassTeacher from './teacher/ownClassTeacher'
import teaching from './teacher/teaching'
import teachers from './user/teachers'
import showcases from './department/showcases'
import teacherDashboard from './dashboard/teacherDashboard'

import division from './division/division'
import grade from './grade/grade'
import subjects from './subject/subjects'
import violation from './violation/violation'
/**
 * APPLICATIONS
 */
import app from './app/app'
import noti from './notify/noti'
import { createStore } from 'vuex-extensions'
import constant from './other/constant'
import upload from './other/upload'
import rest from './other/rest'
import auth from './app/auth'
import view from './view'
import user from './app/user'
import factor from './factor/factor'

import postCreate from './post/post-create'
import SubjectGroup from './subjectGroup/SubjectGroup'
import ContactBook from './contactBook/ContactBook'
import SmsHistory from './smsHistory/SmsHistory'
import AppHistory from './appHistory/AppHistory'
import StudentPostHistory from './contactBook/StudentPostHistory'
import AttendanceDetail from './student/AttendanceDetail'
import Generation from '@/store/generation/Generation.js'
import AcademicLevel from './academicLevel/AcademicLevel'
import Diligence from './student/Diligence'

Vue.use(Vuex)

export default createStore(Vuex.Store, {
  plugins: [
    createPersistedState({
      key: 'lms',
      paths: ['auth.user', 'auth.isAuthenticated', 'auth.jwt', 'app.currentGeneration', 'app.currentSemester']
    }),
    axiosPlugin
  ],
  modules: {
    Dashboard,
    rest,
    attendance,
    auth,
    view,
    user,
    staff,
    teacher,
    teachers,
    teaching,
    ownClassTeacher,
    class: classModule,
    generation,
    semester,
    category,
    email,
    constant,
    slot,
    event,
    upload,
    noti,
    app,
    role,
    log,
    mark,
    classDetail,
    timeTable,
    teacherDashboard,
    departmentDashboard,
    department,
    showcases,
    students,
    student,
    studentDashboard,
    studentImporter,
    division,
    grade,
    factor,
    subjects,
    violation,
    search,
    postCreate,
    MarkInput,
    Mark,
    StudentMark,
    SubjectGroup,
    ContactBook,
    SmsHistory,
    AppHistory,
    StudentPostHistory,
    AttendanceDetail,
    Generation,
    AcademicLevel,
    Diligence
  },
  mixins: {
    mutations: {
      changeState: function(state, changed) {
        Object.entries(changed).forEach(([name, value]) => {
          state[name] = value
        })
      },
      changeDeepState: function(state, changed) {
        Object.entries(changed).forEach(([firstChildName, diff]) => {
          const firstChildValue = { ...state[firstChildName] }
          Object.entries(diff).forEach(([path, diffValue]) => {
            setWith(firstChildValue, path, diffValue)
          })
          state[firstChildName] = firstChildValue
        })
      }
    }
  }
})
