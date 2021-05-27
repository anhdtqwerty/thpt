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
          <ViolationPostCreate @sendDailySMS="sendDailySMS" />
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
import { Post } from '@/plugins/api.js'
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
  methods: {
    // sendPost({ students, classes, grades, allSchool }) {
    //   this.postTos = { students, classes, grades, allSchool }
    //   this.sendDialog = !this.sendDialog
    // },
    async sendDiligenceSMS(data) {
      console.log(data)
      if (data.classes.length === 0) this.$alert.error('Xin vui lòng chọn ít nhất một lớp!')
      console.log(data.classes)
      try {
        const result = await Post.sendDiligenceSMS({
          class: data.classes[0],
          type: 'diligence'
        })
        this.$alert.success(result)
      } catch (error) {
        this.$alert.error(`Đã có lỗi xảy ra trong quá trình gửi tin nhắn! Lỗi: ${error}`)
      }
    },
    async sendMarkNotification() {
      await Post.sendMarkNotification()
    },
    async sendDailySMS() {
      try {
        this.loading = true
        const sms = await Post.sendDailySMS()
        if (sms.length > 0) this.$alert.success('Gửi tin nhắn hằng ngày thành công!')
        this.loading = false
      } catch (error) {
        this.$alert.error(`Đã xảy ra lỗi trong quá trình gửi tin nhắn! Lỗi: ${error}`)
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
