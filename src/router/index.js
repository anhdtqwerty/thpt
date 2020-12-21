import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import store from '@/store'
import loading from '@/plugins/loading'
import snapshot from '@/plugins/snapshot'

const DEFAULT_PAGE_TITLE = 'LMS Manager'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior () {
    return { x: 0, y: 0 }
  },
  routes
})

router.beforeEach((to, from, next) => {
  const goodToGo = snapshot.validate() || window.confirm('Changed you made have not been saved. Are you sure to leave?')
  next(goodToGo && _authGuard(to))
})

router.afterEach(to => {
  _setDocumentTitle(to.meta.title)
  _resetPlugins()
})

function _setDocumentTitle (title = DEFAULT_PAGE_TITLE) {
  document.title = title
}

function _resetPlugins () {
  loading.hide()
  snapshot.reset()
}

function _authGuard (to) {
  if (!to.name) {
    return '/dashboard'
  }

  let hasAuthRule = false
  let requriedAuth = false
  const { isAuthenticated } = store.state.auth

  for (let route of to.matched) {
    if (!route.meta.hasOwnProperty('auth')) {
      continue
    }
    hasAuthRule = true
    if (route.meta.auth) {
      requriedAuth = true
      break
    }
  }

  return hasAuthRule
    ? requriedAuth
      ? isAuthenticated
        ? true
        : '/signin'
      : isAuthenticated && to.name !== 'resetPassword'
        ? '/dashboard'
        : true
    : true
}

window.onbeforeunload = () => {
  if (!snapshot.validate()) return true
}

export default router
