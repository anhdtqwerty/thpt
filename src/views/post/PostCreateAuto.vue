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
          <MarkPostCreate />
        </v-tab-item>
        <v-tab-item :key="2">
          <ViolationPostCreate />
        </v-tab-item>
        <v-tab-item :key="3">
          <AttendancePostCreate @sendPost="sendPost" />
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
    sendPost({ students, classes, grades, allSchool }) {
      this.postTos = { students, classes, grades, allSchool }
      this.sendDialog = !this.sendDialog
    }
  }
}
</script>

<style lang="scss" scoped></style>
