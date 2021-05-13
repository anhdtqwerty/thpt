import moment from 'moment'
import Vue from 'vue'

export const vueFilterRegister = () => {
  Vue.filter('ddmmyyyy', isoStr => (isoStr ? moment(isoStr).format('DD/MM/YYYY') : ''))
  Vue.filter('gender', gender => {
    if (gender === 'male') return 'Nam'
    else if (gender === 'female') return 'Nữ'
    return 'Khác'
  })
  Vue.filter('status', status => {
    switch (status) {
      case 'active':
        return 'Đang học'
      case 'reserved':
        return 'Bảo lưu'
      case 'graduated':
        return 'Đã tốt nghiệp'
      case 'left':
        return 'Đã nghỉ'
    }
  })
  Vue.filter('statusColor', status => {
    switch (status) {
      case 'active':
        return '#46BE8A'
      case 'reserved':
        return 'orange'
      case 'graduated':
        return 'primary'
      case 'left':
        return 'red'
      default:
        return 'grey'
    }
  })
}
