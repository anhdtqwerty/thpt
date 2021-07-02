import alert from '@/plugins/alert'
import { Room, Upload } from '@/plugins/api'
import { set } from 'lodash'
export default {
  namespaced: true,
  state: {
    rooms: [],
    count: 0
  },
  actions: {
    async fetchRooms ({ commit }, options) {
      try {
        commit('setRooms', await Room.fetch(options))
      } catch (e) {
        alert.error(e)
      }
    },
    async countRooms ({ commit }, options) {
      try {
        commit('setCount', await Room.count(options))
      } catch (e) {
        alert.error(e)
      }
    },
    async fetchRoom ({ commit }, roomId) {
      try {
        commit('setRoom', await Room.fetchOne(roomId))
      } catch (e) {
        alert.error(e)
      }
    },
    async createRoom ({ commit }, data) {
      try {
        commit('setRoom', await Room.create(data))
      } catch (e) {
        alert.error(e)
      }
    },
    async updateRoom ({ commit }, { id, ...room }) {
      try {
        commit('setRooms', [await Room.update(id, room)])
        alert.success('Cập nhật thành công!')
      } catch (e) {
        alert.error(e)
      }
    },
    async removeRoom ({ commit }, id) {
      try {
        await Room.remove(id)
        commit('removeRoom', id)
        alert.success('Xóa thành công!')
      } catch (e) {
        alert.error(e)
      }
    },
    setRoom ({ commit, state }, room) {
      commit('setRoom', room)
    },
    async removeRooms ({ dispatch }, items) {
      for (let item of items) {
        await dispatch('removeRoom', item.id)
      }
    },
    async uploadAvatar ({ commit }, { roomId, formData }) {
      try {
        let data = await Upload.upload(formData)
        commit('setAvatar', { roomId, avatar: data[0] })
        alert.success('Upload successfully!')
      } catch (e) {
        alert.error(e)
      }
    },
    async destroyAvatar ({ commit }, id) {
      try {
        await Upload.destroy(id)
      } catch (e) {
        alert.error(e)
      }
    }
  },
  mutations: {
    setRooms (state, rooms) {
      state.rooms = rooms.reduce(
        (accumulator, currentValue) => ({
          ...accumulator,
          [currentValue.id]: currentValue
        }),
        {}
      )
    },
    setRoom (state, room) {
      state.rooms = {
        ...state.rooms,
        [room.id]: room
      }
    },
    removeRoom (state, roomId) {
      delete state.rooms[roomId]
      state.rooms = { ...state.rooms }
    },
    setAvatar (state, { roomId, avatar }) {
      set(state.rooms, `${roomId}.avatar`, avatar)
      state.rooms = { ...state.rooms }
    }
  },
  getters: {
    rooms: state => {
      return Object.values(state.rooms)
    },
    room: state => id => {
      return state.rooms[id]
    },
    count: state => {
      return state.count
    }
  }
}
