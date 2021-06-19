<template>
  <v-dialog v-model="dialog" width="400px" :fullscreen="$vuetify.breakpoint.smAndDown">
    <v-card>
      <v-card-title color="red">Xóa phân công giáo viên hiện tại ?</v-card-title>
      <v-card-text>
        Sau khi xóa phân công giảng dạy, giáo viên cũ sẽ không thể theo dõi thông tin của lớp học cũng như không có
        quyền xử lý các thông tin liên quan đến lớp trong môn học tương ứng
      </v-card-text>
      <v-card-actions class="d-flex justify-space-between pa-6">
        <v-btn depressed class="red white--text" @click="onDelete()">Xoá</v-btn>
        <v-btn depressed outlined @click="cancel()">Huỷ</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  components: {},
  props: {
    state: Boolean
  },
  data() {
    return {
      dialog: false
    }
  },
  methods: {
    async onDelete() {
      this.$emit('delete')
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
