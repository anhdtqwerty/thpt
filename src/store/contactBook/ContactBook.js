import { ContactBook, User, Student } from '@/plugins/api'
import alert from '@/plugins/alert'
export default {
  namespaced: true,
  state: {
    contactBooks: [],
    student: null
  },
  actions: {
    async fetchContactBooks({ commit }, options) {
      try {
        commit('setContactBooks', await ContactBook.fetch(options))
      } catch (error) {
        alert.error(error)
      }
    },
    async createContactBook({ commit }, data) {
      try {
        commit('createContactBook', await ContactBook.create(data))
      } catch (e) {
        alert.error(e)
      }
    },
    async removeContactBook({ commit }, id) {
      await ContactBook.remove(id)
      commit('removeContactBook', id)
    },
    async updateContactBook({ commit }, { id, ...contact }) {
      const g = await ContactBook.updateContact(id, contact)
      commit('updateContactBook', g)
      return g
    },
    async createUser({ commit }, userData) {
      console.log('userData', userData)
      const user = await User.create({ ...userData })
      return user
    },
    async removeUser({ commit }, id) {
      await User.remove(id)
    },
    async fetchStudent({ commit }, studentId) {
      commit('changeState', { student: null })
      const student = await Student.fetchOne(studentId)
      commit('changeState', { student })
    }
  },
  mutations: {
    setContactBooks(state, contactBooks) {
      state.contactBooks = contactBooks
    },
    updateContactBook(state, contact) {
      state.contactBooks = state.contactBooks.map(g => {
        if (contact.id === g.id) return contact
        else return g
      })
    },
    createContactBook(state, contact) {
      state.contactBooks = [contact, ...state.contactBooks]
    },
    removeContactBook(state, id) {
      state.contactBooks = state.contactBooks.filter(contact => contact.id !== id)
    }
  }
}
