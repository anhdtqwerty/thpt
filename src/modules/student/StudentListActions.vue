<template>
  <div class="d-flex">
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" icon>
          <v-icon color="primary">mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item>
          <v-list-item-title @click="changeClass=!changeClass">Chuyển lớp</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>Chuyển trạng thái</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <change-class-dialog :item="item" :state="changeClass"></change-class-dialog>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import ChangeClassDialog from '@/modules/student/ChangeClassDialog.vue'
import _ from 'lodash'

export default {
  components: {
    ChangeClassDialog
  },
  props: {
    disabled: Boolean,
    filter: Boolean,
    item: Object
  },
  data() {
    return {
      mailDialogState: false,
      smsDialogState: false,
      smsEditingState: false,
      sending: null,
      changeClass: false
    }
  },
  computed: {
    ...mapState('student', ['students']),
    sendingName() {
      const { name } = this.students.find(
        student => student.phone === this.sending
      )
      return name
    },
    multipleAction() {
      return !_.isEmpty(this.selected)
    }
  },
  methods: {
    ...mapActions('students', ['removeStudent', 'updateStudents']),
    ...mapActions('noti', ['sendEmails', 'sendSMS']),
    ...mapActions('sale', ['setStudents']),
    disableStudent() {
      this.updateStudents(
        this.selected.map(item => {
          return { ...item, status: 'block' }
        })
      )
    },
    enableStudent() {
      this.updateStudents(
        this.selected.map(item => {
          return { ...item, status: 'active' }
        })
      )
    },
    onRemove() {
      this.$dialog.confirm({
        title: 'Xóa Học Sinh',
        text: 'Bạn Có chắc muốn xóa học sinh này.?',
        okText: 'Có',
        cancelText: 'Không',
        done: async () => {
          await this.removeStudent(this.item)
          this.$emit('removed')
        }
      })
    },
    onReserve() {
      this.$dialog.confirm({
        title: 'Bảo Lưu Học sinh',
        text: 'Bạn có muốn bảo lưu những học sinh này ?',
        okText: 'Có',
        cancelText: 'Không',
        done: async () => {
          await this.updateStudents(
            this.selected.map(s => ({ id: s.id, status: 'reserved' }))
          )
          this.$emit('removed')
        }
      })
    },
    onTuition() {
      this.setStudents(this.selected)
      this.$router.push('./sales')
    },
    onActivate() {
      this.$dialog.confirm({
        title: 'Bảo Lưu Học sinh',
        text: 'Bạn có muốn Chuyển trạng thái học viên này về đang hoạt động ?',
        okText: 'Có',
        cancelText: 'Không',
        done: async () => {
          await this.updateStudents(
            this.selected.map(s => ({ id: s.id, status: 'active' }))
          )
          this.$emit('removed')
        }
      })
    }
  }
}
</script>
