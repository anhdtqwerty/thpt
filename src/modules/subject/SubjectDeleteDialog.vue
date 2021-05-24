<template>
  <v-dialog v-model="dialog" width="500px" :fullscreen="$vuetify.breakpoint.smAndDown">
    <v-card>
      <v-card-title color="red">Xóa môn học này ?</v-card-title>
      <v-card-text>
        Môn học này sẽ bị xóa khỏi danh sách, các dữ liệu của môn học và các dữ liệu liên quan sẽ bị xóa hoàn toàn và
        không thể khôi phục lại
      </v-card-text>
      <v-card-actions class="d-flex justify-space-between pa-6">
        <v-btn depressed class="red white--text" :loading="loading" @click="onDelete(subject.id)">Xoá</v-btn>
        <v-btn depressed :loading="loading" @click="cancel()">Huỷ</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  components: {},
  props: {
    state: Boolean,
    subject: Object
  },
  data() {
    return {
      dialog: false,
      loading: false
    }
  },
  methods: {
    ...mapActions('subjects', ['removeSubject']),
    async onDelete(id) {
      this.loading = true
      await this.removeSubject(id)
      this.loading = false
      this.$router.back()
      this.dialog = false
    },
    cancel() {
      this.dialog = false
    }
  },
  watch: {
    state(state) {
      this.dialog = true
    }
  }
}
</script>
