
export default {
  state: {
    alert: {
      show: false,
      message: '',
      type: 'error'
    }
  },
  mutations: {
    alert (state, alert) {
      if (!alert) {
        state.alert = {
          show: false,
          message: '',
          type: 'success'
        }
      } else {
        const { show = true, type = 'success', message = '' } = alert
        state.alert = {
          show,
          type,
          message
        }
      }
    }
  }
}
