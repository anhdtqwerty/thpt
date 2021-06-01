<template>
  <div>
    <div class="pa-4 d-flex justify-space-between align-center">
      <div>
        <Breadcrumbs headline="Gửi tin nhắn tự động" :link="[{ text: 'Gửi tin nhắn tự động', href: '../post-send' }]" />
      </div>
    </div>
    <v-card class="px-md-6 mx-md-4 elevation-1">
      <v-tabs v-model="tab">
        <v-tab :key="1">Sổ điểm</v-tab>
        <v-tab :key="2">Khen thưởng kỷ luật</v-tab>
        <v-tab :key="3">Điểm danh</v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item :key="1">
          <MarkPostCreate @sendMarkNotification="sendMarkNotification" />
        </v-tab-item>
        <v-tab-item :key="2">
          <ViolationPostCreate @sendDailyViolation="sendDailyViolation" />
        </v-tab-item>
        <v-tab-item :key="3">
          <AttendancePostCreate @sendDiligenceSMS="sendDiligenceSMS" />
        </v-tab-item>
      </v-tabs-items>
    </v-card>
    <AttendancePostCreateDialog :state="sendDialog" :postTos="postTos" />
    <SendSMSExcelDialog :state="sendExcelDialog" />
  </div>
</template>

<script>
import SendSMSExcelDialog from '@/modules/sms/SendSMSExcelDialog'
import Breadcrumbs from '@/components/layout/Breadcrumbs.vue'
import MarkPostCreate from '@/modules/post/MarkPostCreate.vue'
import ViolationPostCreate from '@/modules/post/ViolationPostCreate.vue'
import AttendancePostCreate from '@/modules/post/AttendancePostCreate.vue'
import AttendancePostCreateDialog from '@/modules/post/AttendancePostCreateDialog.vue'
import { ContactBook } from '@/plugins/api.js'
import { mapGetters } from 'vuex'

export default {
  components: {
    SendSMSExcelDialog,
    Breadcrumbs,
    MarkPostCreate,
    ViolationPostCreate,
    AttendancePostCreate,
    AttendancePostCreateDialog
  },
  data() {
    return {
      tab: 0,
      sendDialog: false,
      sendExcelDialog: false,
      postTos: {}
    }
  },
  computed: {
    ...mapGetters('auth', ['profile'])
  },
  methods: {
    // sendPost({ students, classes, grades, allSchool }) {
    //   this.postTos = { students, classes, grades, allSchool }
    //   this.sendDialog = !this.sendDialog
    // },
    async sendDiligenceSMS(data) {
      if (data.classes.length === 0) this.$alert.error('Xin vui lòng chọn ít nhất một lớp!')
      this.postTos = { classes: data.classes }
      this.sendDialog = !this.sendDialog
    },
    async sendMarkNotification() {
      try {
        this.$loading.active = true
        await ContactBook.sendMarkNotification(this.profile.id)
        this.$alert.success('Đã gửi tin nhắn Sổ điểm, vui lòng xem chi tiết trong lịch sử gửi tin')
      } catch (error) {
        this.$alert.error(`Đã xảy ra lỗi trong quá trình gửi tin nhắn! Lỗi: ${error}`)
      } finally {
        this.$loading.active = false
      }
    },
    async sendDailyViolation() {
      try {
        this.$loading.active = true
        await ContactBook.sendDailyViolation(this.profile.id)
        this.$alert.success('Đã gửi tin nhắn Khen thưởng kỷ luật, vui lòng xem chi tiết trong lịch sử gửi tin')
      } catch (error) {
        this.$alert.error(`Đã xảy ra lỗi trong quá trình gửi tin nhắn! Lỗi: ${error}`)
      } finally {
        this.$loading.active = false
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
