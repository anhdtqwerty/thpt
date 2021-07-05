<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="400px">
      <v-card v-if="student">
        <v-toolbar dense class="elevation-0">
          <v-toolbar-title>Nhập Điểm</v-toolbar-title>

          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon @click="cancel">close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-divider />
        <v-card-text>
          <small>*Nhập điểm cho học sinh {{ student.name }}</small>
          <v-text-field v-model="value" label="Nhập điểm tổng kết"></v-text-field>
          <v-select v-model="status" :items="['passed', 'failed', 'learning']" label="Chọn trạng thái"></v-select>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="cancel()">Hủy</v-btn>
          <v-btn color="primary" @click="save()">Lưu</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex'
import { get } from 'lodash'
export default {
  props: {
    state: Boolean,
    student: Object,
    course: Object
  },
  computed: {},
  data: () => ({
    dialog: false,
    value: 0,
    status: 'passed'
  }),
  created() {
    this.refresh()
  },
  methods: {
    ...mapActions('student', ['createMark']),
    save() {
      this.createMark({
        data: {
          student: get(this.student, 'id'),
          course: this.course.id,
          department: get(this.student, 'department.id'),
          value: this.value,
          status: this.status
        }
      })
      this.dialog = false
    },
    refresh() {
      if (!this.student) return
      this.value = 0
      this.status = 'passed'
    },
    cancel() {
      this.dialog = false
    }
  },
  watch: {
    state(state) {
      this.dialog = true
    },
    student(student) {
      this.refresh()
    }
  }
}
</script>
