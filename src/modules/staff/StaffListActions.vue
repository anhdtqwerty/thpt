<template>
  <div class="d-flex">
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item @click.stop="onRemove(item)">
          <v-icon left>mdi-delete</v-icon>
          <v-list-item-title>Xóa</v-list-item-title>
        </v-list-item>
        <v-list-item @click.stop="smsDialogState=!smsDialogState">
          <v-icon left>mdi-message-processing</v-icon>
          <v-list-item-title>SMS</v-list-item-title>
        </v-list-item>
        <v-list-item @click.stop="mailDialogState=!mailDialogState">
          <v-icon left>mdi-email</v-icon>
          <v-list-item-title>Gửi email</v-list-item-title>
        </v-list-item>
        <v-list-item @click.stop="disableStaff">
          <v-icon left>mdi-lock</v-icon>
          <v-list-item-title>Khóa</v-list-item-title>
        </v-list-item>
        <v-list-item @click.stop="enableStaff">
          <v-icon left>mdi-lock-open-outline</v-icon>
          <v-list-item-title>Mở khóa</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <send-email-dialog :state="mailDialogState" :data="item"></send-email-dialog>
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
    item: {
      type: [Object],
      default: () => {}
    }
  },
  data () {
    return {
      mailDialogState: false,
      smsDialogState: false,
      smsEditingState: false,
      sending: null
    }
  },
  computed: {
    ...mapState('staff', ['staffs']),
    sendingName () {
      const { name } = this.staffs.find(staff => staff.phone === this.sending)
      return name
    },
  },
  methods: {
    ...mapActions('staff', [
      'removeStaff',
      'updateStaff',
    ]),
    ...mapActions('noti', [
      'sendEmail',
      'sendSMS'
    ]),
    disableStaff () {
      this.updateStaff({ id: this.item.id, status: 'block' })
    },
    enableStaff () {
      this.updateStaff({ id: this.item.id, status: 'active' })
    },
    onRemove(staff) {
      this.$dialog.confirm({
        title: 'Thông báo xác nhận',
        text:
        'Bạn có chắc chắn muốn xóa Nhân viên này? Bạn không thể hoàn tác hành động',
        okText: 'Có',
        cancelText: 'Không',
        done: async () => {
          await this.removeStaff(staff)
        },
      })
    },

  }
}
</script>
