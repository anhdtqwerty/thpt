<template>
  <div class="flex-center">
    <v-btn
      v-if="policies['view-teacher-list']"
      color="primary"
      class="mr-2"
      depressed
      @click="onAdd"
    >
      <v-icon left>add</v-icon>Thêm Học Viên
    </v-btn>
    <v-btn
      v-show="selected.length"
      color="error"
      class="mr-2"
      depressed
      @click="onRemove"
    >
      <v-icon left>delete</v-icon>Xóa khỏi lớp
    </v-btn>
    <student-add-dialog :state="addState" :lastSelectedStudents="students" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import StudentAddDialog from '@/modules/class/student/StudentAddDialog'
export default {
  components: {
    StudentAddDialog,
  },
  props: {
    disabled: Boolean,
    selected: { type: Array, default: () => [] },
  },
  data() {
    return {
      addState: false,
      sending: null,
    }
  },
  computed: {
    ...mapGetters('classDetail', ['students', 'classData']),
    ...mapGetters('app', ['policies']),
    sendingName() {
      const { name } = this.students.find(
        (student) => student.phone === this.sending
      )
      return name
    },
  },
  methods: {
    ...mapActions('classDetail', ['updateClass']),
    ...mapActions('noti', ['sendEmails', 'sendSMS']),
    onAdd() {
      this.addState = !this.addState
    },
    onRemove() {
      this.$dialog.confirm({
        title: 'Xóa Khỏi Danh Sách Lớp',
        text: 'Bạn có muốn xóa học sinh này ra khỏi lớp?',
        okText: 'Đồng Ý',
        cancelText: 'Không',
        done: async () => {
          await this.updateClass({
            ...this.classData,
            students: this.students
              .map((s) => s.id)
              .filter((stid) => {
                return !(this.selected.map((s) => s.id).indexOf(stid) >= 0)
              }),
          })
        },
      })
    },
  },
}
</script>
