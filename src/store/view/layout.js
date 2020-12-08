// eslint-disable-next-line vue/valid-v-slot
export default {
  namespaced: true,
  state: {
    dark: false
  },
  mutations: {
    toggleTheme(state) {
      state.dark = !state.dark
    }
  }
}
