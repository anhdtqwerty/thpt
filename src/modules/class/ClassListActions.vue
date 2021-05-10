<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-bind="attrs" v-on="on" icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </template>
    <v-list class="px-2" dense>
      <v-list-item class="py-1" @click="onRemove">
        <v-list-item-icon class="mr-2"><v-icon left>mdi-delete</v-icon></v-list-item-icon>
        <v-list-item-content>Xóa Lớp</v-list-item-content>
      </v-list-item>
      <v-list-item class="py-1" @click="startClass">
        <v-list-item-icon class="mr-2"><v-icon left>mdi-calendar-check</v-icon></v-list-item-icon>
        <v-list-item-content>Khai giảng lớp</v-list-item-content>
      </v-list-item>
      <v-list-item class="py-1" @click="finishClass">
        <v-list-item-icon class="mr-2"><v-icon left>mdi-calendar-remove</v-icon></v-list-item-icon>
        <v-list-item-content>Kết thúc lớp</v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  props: {
    selected: { type: Object, default: () => {} }
  },
  data() {
    return {}
  },
  computed: {
    ...mapState('class', ['classes']),
    getOS() {
      var userAgent = window.navigator.userAgent
      var platform = window.navigator.platform
      var macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K']
      var windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE']
      var iosPlatforms = ['iPhone', 'iPad', 'iPod']
      var os = null

      if (macosPlatforms.indexOf(platform) !== -1) {
        os = 'Mac OS'
      } else if (iosPlatforms.indexOf(platform) !== -1) {
        os = 'iOS'
      } else if (windowsPlatforms.indexOf(platform) !== -1) {
        os = 'Windows'
      } else if (/Android/.test(userAgent)) {
        os = 'Android'
      } else if (!os && /Linux/.test(platform)) {
        os = 'Linux'
      }
      return os
    }
  },
  methods: {
    ...mapActions('class', ['removeClass', 'updateClass']),
    finishClass() {
      this.updateClass({ id: this.selected.id, status: 'done' })
    },
    startClass() {
      this.updateClass({ id: this.selected.id, status: 'running' })
    },
    onRemove() {
      this.$dialog.confirm({
        title: 'Thông báo xác nhận',
        text: 'Bạn có chắc muốn xóa lớp học này? Bạn không thể hoàn tác hành động.',
        okText: 'OK',
        cancelText: 'Hủy',
        done: async () => {
          await this.removeClass(this.selected.id)
          this.$alert.success('Xóa lớp học thành công!')
        }
      })
    }
  }
}
</script>
