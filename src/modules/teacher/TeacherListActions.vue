<template>
  <div class="d-flex">
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" icon>
          <v-icon class="primary--text">mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item @click="changeState">
          <v-list-item-title>Chuyển trạng thái</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <send-email-dialog
      :state="mailDialogState"
      :data="item"
    ></send-email-dialog>
    <send-s-m-s-dialog :state="smsDialogState" :data="item"></send-s-m-s-dialog>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import SendEmailDialog from '@/modules/email/SendEmailDialog'
import SendSMSDialog from '@/modules/sms/SendSMSDialog'

export default {
  components: {
    SendEmailDialog,
    SendSMSDialog,
  },
  props: {
    disabled: Boolean,
    teacher: Object,
    item: Object,
  },
  data() {
    return {
      mailDialogState: false,
      smsDialogState: false,
      smsEditingState: false,
      sending: null,
    }
  },
  computed: {
    ...mapState('teacher', ['teachers']),
    sendingName() {
      const { name } = this.teachers.find(
        (teacher) => teacher.phone === this.sending
      )
      return name
    },
  },
  methods: {
    ...mapActions('noti', ['sendEmails', 'sendSMS']),
    ...mapActions('teacher', ['updateTeacher', 'removeTeacher']),
    remove() {
      this.$dialog.confirm({
        title: 'Xóa Giáo Viên Này',
        text:
          'Xóa tài khoản sẽ xóa tương ứng toàn bộ dữ liệu liên quan đến tài khoản này. Bao gồm dữ liệu lớp học, dữ liệu điểm danh ?',
        okText: 'Xóa Giáo Viên',
        cancelText: 'Hủy',
        done: async () => {
          await this.removeTeacher(this.item)
        },
      })
    },
  },
}
</script>
