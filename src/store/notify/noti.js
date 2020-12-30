import axios from '@/plugins/axios'
import alert from '@/plugins/alert'

const SMS_API = '/sms/'
const EMAIL_API = '/email/'

export default {
  namespaced: true,
  state: {
    sms: [],
    count: 0
  },
  actions: {
    sendSMS({ commit, state }, sms) {
      return axios
        .post(
          SMS_API,
          {
            details: {
              phones: [sms.phone]
            },
            content: sms.message,
            ...sms
          },
          {
            hideLoading: true
          }
        )
        .then(data => {
          console.log('failed')
          sms.status = 'sent'
          commit('receiveSMS', sms)
        })
        .catch(e => {
          alert.error(e)
          sms.status = 'failed'
          commit('receiveSMS', sms)
        })
    },
    async broadcastSMS({ commit, dispatch }, data) {
      commit('setSMS', data)
      for (let item of data) {
        await dispatch('sendSMS', item)
      }
    },
    sendEmail(context, { to, subject, message }) {
      return axios
        .post(EMAIL_API, {
          to,
          from: 'no-reply@qwerty.vn',
          subject,
          text: message
        })
        .then(() => true)
        .catch(e => alert.error(e))
    }
  },
  mutations: {
    setSMS(state, sms) {
      state.sms = sms
    },
    setCount(state, count) {
      state.count = count
    },
    receiveSMS(state, sms) {
      const i = state.sms.findIndex(d => d.id === sms.id)
      if (i > -1) {
        state.sms.splice(i, 1, sms)
      } else {
        state.sms.unshift(sms)
      }
    }
  }
}
