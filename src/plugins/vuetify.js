import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import '@mdi/font/css/materialdesignicons.css'
Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    font: true,
    icons: 'md'
  },
  theme: {
    dark: false,
    light: {
      primary: '#0D47A1',
      secondary: '#b0bec5',
      accent: '#f5f5f5',
      error: '#b71c1c'
    }
  }
})
