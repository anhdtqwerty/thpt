<template>
  <div>
    <div class="pa-4 d-flex justify-space-between align-center">
      <div>
        <Breadcrumbs headline="Gửi tin nhắn" :link="[{ text: 'Gửi tin nhắn', href: '../post-send' }]" />
      </div>
      <v-spacer></v-spacer>
      <v-btn class="elevation-0" color="primary" @click="sendExcelDialog = !sendExcelDialog">
        <v-icon>mdi-file-excel</v-icon><span class="ml-1">Gửi theo File Excel</span>
      </v-btn>
    </div>
    <v-card class="px-md-6 mx-md-4 elevation-1">
      <v-tabs v-model="tab">
        <v-tab :key="1">Toàn trường</v-tab>
        <v-tab :key="2">Khối</v-tab>
        <v-tab :key="3">Lớp</v-tab>
        <v-tab :key="4">Học sinh</v-tab>
        <v-tab :key="5">Khác</v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item :key="1">
          <AllSchoolPostCreate @sendPost="sendPost" />
        </v-tab-item>
        <v-tab-item :key="2">
          <GradePostCreate @sendPost="sendPost" />
        </v-tab-item>
        <v-tab-item :key="3">
          <ClassPostCreate @sendPost="sendPost" />
        </v-tab-item>
        <v-tab-item :key="4">
          <StudentPostCreate @sendPost="sendPost" />
        </v-tab-item>
      </v-tabs-items>
    </v-card>
    <PostCreateDialog :state="sendDialog" :postTos="postTos" />
    <SendSMSExcelDialog :state="sendExcelDialog" />
  </div>
</template>

<script>
import StudentPostCreate from '@/modules/post/StudentPostCreate'
import PostCreateDialog from '@/modules/post/PostCreateDialog'
import SendSMSExcelDialog from '@/modules/sms/SendSMSExcelDialog'
import Breadcrumbs from '@/components/layout/Breadcrumbs.vue'
import AllSchoolPostCreate from '@/modules/post/AllSchoolPostCreate.vue'
import GradePostCreate from '@/modules/post/GradePostCreate.vue'
import ClassPostCreate from '@/modules/post/ClassPostCreate.vue'
export default {
  components: {
    PostCreateDialog,
    StudentPostCreate,
    SendSMSExcelDialog,
    Breadcrumbs,
    AllSchoolPostCreate,
    GradePostCreate,
    ClassPostCreate
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
