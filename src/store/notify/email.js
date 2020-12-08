import axios from '@/plugins/axios'
import alert from '@/plugins/alert'

const EMAIL_API = '/email'

export default {
  namespaced: true,
  state: {},
  actions: {
    sendEmails ({ commit }, { emails, subject, html, text }) {
      return axios.post(EMAIL_API, {
        'from': 'hello@techkids.edu.vn',
        'to': emails,
        subject,
        html,
        text
      })
        .then(() => alert.success('Send email successfully'))
        .catch(e => alert.error(e))
    }
  },
  mutations: {}
}
