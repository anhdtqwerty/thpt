import moment from 'moment'
import Vue from 'vue'

export const vueFilterRegister = () => {
  Vue.filter('ddmmyyyy', isoStr => (isoStr ? moment(isoStr).format('DD/MM/YYYY') : ''))
}
