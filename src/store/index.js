import Vuex from 'vuex'
import Vue from 'vue'
import createPersistedState from 'vuex-persistedstate'

import classModule from './learning/class'
import classDetail from './learning/classDetail'
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
 * STUDENT
 */
import { axiosPlugin } from '@/plugins/axios'
import students from './user/students'
import studentDashboard from './dashboard/studentDashboard'
import student from './user/student'
import studentImporter from './importer/studentImporter.js'
import attendance from './student/attendance'
import _ from 'lodash'
/**
 * DEPARTMENT
 */
import department from './other/department'
import departmentDashboard from '@/store/dashboard/departmentDashboard.js'
import role from './app/role'
import staff from './user/staff'
import teacher from './user/teacher'
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

Vue.use(Vuex)

export default createStore(Vuex.Store, {
  plugins: [
    createPersistedState({
      key: 'lms',
      paths: [
        'auth.user',
        'auth.isAuthenticated',
        'auth.jwt',
        'app.currentGeneration',
        'app.currentSemester'
      ]
    }),
    axiosPlugin
  ],
  modules: {
    rest,
    attendance,
    auth,
    view,
    user,
    staff,
    teacher,
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
    search
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
            _.setWith(firstChildValue, path, diffValue)
          })
          state[firstChildName] = firstChildValue
        })
      }
    }
  }
})
