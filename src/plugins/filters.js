import moment from 'moment'
import Vue from 'vue'

export const vueFilterRegister = () => {
  Vue.filter('ordinalNumber', (item, list) => list.indexOf(item) + 1)
  Vue.filter('ddmmyyyy', isoStr => (isoStr ? moment(isoStr).format('DD/MM/YYYY') : ''))
  Vue.filter('ddmmyyyyhhmm', isoStr => (isoStr ? moment(isoStr).format('DD/MM/YYYY HH:mm') : ''))
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
  Vue.filter('getStudentCode', code => {
    return code.substr(0, 5)
  })
  Vue.filter('classStatusColor', status => {
    switch (status) {
      case 'running':
        return '#46BE8A'
      default:
        return 'primary'
    }
  })
  Vue.filter('classStatus', status => {
    switch (status) {
      case 'running':
        return 'Đang học'
      case 'opened':
        return 'Đang chờ'
      case 'done':
        return 'Kết thúc'
      default:
        return ''
    }
  })
  Vue.filter('getAcademicLevel', level => {
    switch (level) {
      case 'primary':
        return '1'
      case 'secondary':
        return '2'
      case 'high':
        return '3'
      default:
        return ''
    }
  })
  Vue.filter('getContactBookPhones', item => {
    if (!item.contactBook || !item.contactBook.phones) return ''
    if (typeof item.contactBook.phones === 'string') return item.contactBook.phones
    return item.contactBook.phones.join(', ')
  })
  Vue.filter('getNotificationMethod', item => {
    if (!item.contactBook) return ''
    if (item.contactBook.isSms && item.contactBook.isApp) return 'APP và SMS'
    if (item.contactBook.isSms) return 'SMS'
    if (item.contactBook.isApp) return 'APP'
  })
  Vue.filter('getPostType', type => {
    switch (type) {
      case 'mark':
        return 'Sổ điểm'
      case 'violation':
        return 'Khen thưởng kỷ luật'
      case 'notification':
        return 'Thông báo'
      case 'tuitionFee':
        return 'Học phí'
      case 'diligence':
        return 'Chuyên cần'
      case 'schedule':
        return 'Thời khóa biểu'
      case 'onlineStudy':
        return 'Học tập online'
      case 'other':
        return 'Khác'
      default:
        return ''
    }
  })
  Vue.filter('getConfig', config => {
    if (config === 'immediately') return 'Soạn riêng'
    return 'Tự động'
  })
  Vue.filter('getSendNotiStatus', status => {
    switch (status) {
      case 'success':
        return 'Thành công'
      case 'error':
        return 'Gửi lỗi'
      default:
        return ''
    }
  })
  Vue.filter('getSendNotiStatusColor', status => {
    switch (status) {
      case 'success':
        return '#46BE8A'
      case 'error':
        return 'red'
      default:
        return 'grey'
    }
  })
  Vue.filter('getMarkType', type => {
    switch (type) {
      case 'mark':
        return 'Điểm số'
      case 'evaluate':
        return 'Đánh giá'
      default:
        return ''
    }
  })
}
