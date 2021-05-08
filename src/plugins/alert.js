export default {
  alertData: {
    show: false,
    message: '',
    type: 'error'
  },
  close() {
    Object.assign(this.alertData, { show: false, message: '' })
  },
  show(type, message) {
    Object.assign(this.alertData, { show: true, type, message })
  },
  error(msg) {
    this.close()
    this.show('error', msg)
  },
  success(msg) {
    this.show('success', msg)
  },
  warn(msg) {
    this.show('warning', msg)
  },
  addSuccess() {
    this.success('Thêm mới thành công')
  },
  addError() {
    this.error('Thêm mới thất bại')
  },
  updateSuccess() {
    this.success('Cập nhật thành công')
  },
  updateError() {
    this.error('Cập nhật thất bại')
  },
  deleteSuccess() {
    this.success('Xóa thành công')
  },
  deleteError() {
    this.error('Xóa thất bại')
  }
}
