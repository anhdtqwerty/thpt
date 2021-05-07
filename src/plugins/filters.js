import moment from 'moment'
import Vue from 'vue'

export const vueFilterRegister = () => {
  Vue.filter('ddmmyyyy', isoStr => (isoStr ? moment(isoStr).format('DD/MM/YYYY') : ''))
  Vue.filter('gender', gender => {
    if (gender === 'male') return 'Nam'
    else if (gender === 'female') return 'Nữ'
    return 'Khác'
  })
}
