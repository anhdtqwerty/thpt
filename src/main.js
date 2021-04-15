import Vue from 'vue'
import VueApexCharts from 'vue-apexcharts'
import moment from 'moment'
import { sync } from 'vuex-router-sync'
import { inputRules } from '@/plugins/rule'
import App from './App.vue'
import PluginHelper from '@/helpers/PluginHelper'
import utils from '@/plugins/utils'
import { vueFilterRegister } from '@/plugins/filters'
import rxwatcher from './plugins/rxwatcher'
import dialog from '@/plugins/dialog'
import alert from '@/plugins/alert'
import loading from '@/plugins/loading'
import snapshot from '@/plugins/snapshot'
import router from './router'
import store from './store'
import vuetify from '@/plugins/vuetify'
import './registerServiceWorker'
moment.locale('vi')
Vue.use(VueApexCharts)
Vue.use(rxwatcher)
Vue.component('apex-chart', VueApexCharts)

Vue.use(
  PluginHelper.create({
    $utils: utils,
    $rules: inputRules,
    $dialog: dialog,
    $alert: alert,
    $loading: loading,
    $baseUrl: process.env.VUE_APP_API_ENDPOINT,
    $snapshot: snapshot,
    $moment: moment
  })
)

vueFilterRegister()

sync(store, router, { moduleName: '$route' })

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
