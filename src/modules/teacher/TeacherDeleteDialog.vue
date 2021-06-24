<template>
  <v-dialog v-model="dialog" width="400px" :fullscreen="$vuetify.breakpoint.smAndDown">
    <v-card>
      <v-card-title color="red">Xoá giáo viên này ?</v-card-title>
      <v-card-text>
        Giáo viên này sẽ bị xóa khỏi danh sách, các dữ liệu của giáo viên sẽ bị xóa hoàn toàn và không thể khôi phục lại
      </v-card-text>
      <v-card-actions class="d-flex justify-space-between pa-6">
        <v-btn depressed class="red white--text" @click="onDelete()">Xoá</v-btn>
        <v-btn depressed outlined @click="cancel()">Huỷ</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  props: {
    state: Boolean,
    item: Object
  },
  data() {
    return {
      dialog: false
    }
  },
  computed: {
    ...mapState('teacher', ['teacher'])
  },
  methods: {
    ...mapActions('teacher', ['removeTeacher']),
    async onDelete() {
      try {
        this.$loading.active = true
        await this.removeTeacher(this.teacher)
        this.dialog = false
        this.$router.push(`/teachers/`)
      } catch (error) {
        this.$alert.deleteError()
      } finally {
        this.$loading.active = false
      }
    },
    cancel() {
      this.dialog = false
    }
  },
  watch: {
    state(state) {
      this.dialog = state
    }
  }
}
</script>
