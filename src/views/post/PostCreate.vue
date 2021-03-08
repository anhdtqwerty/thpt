<template>
  <div>
    <div class='pa-4 d-flex justify-space-between align-center'>
      <div>
        <Breadcrumbs
          headline='Gửi tin nhắn'
          :link="[{ text: 'Gửi tin nhắn', href: '../post-send' }]"
        />
      </div>
    </div>
    <v-card class='px-md-6 mx-md-4 elevation-1'>
      <v-tabs v-model='tab'>
        <v-tab :key='1'>Toàn trường</v-tab>
        <v-tab :key='2'>Khối</v-tab>
        <v-tab :key='3'>Lớp</v-tab>
        <v-tab :key='4'>Học sinh</v-tab>
        <v-tab :key='5'>Khác</v-tab>
      </v-tabs>
      <v-tabs-items v-model='tab'>
        <v-tab-item :key='1'>
          <AllSchoolPostCreate @sendPost='sendPost' />
        </v-tab-item>
        <v-tab-item :key='2'>
          <GradePostCreate @sendPost='sendPost' />
        </v-tab-item>
        <v-tab-item :key='3'>
          <ClassPostCreate @sendPost='sendPost' />
        </v-tab-item>
        <v-tab-item :key='4'>
          <StudentPostCreate @sendPost='sendPost' />
        </v-tab-item>
      </v-tabs-items>
    </v-card>
    <PostCreateDialog :state='sendDialog' :postTos='postTos' />
  </div>
</template>

<script>
import StudentPostCreate from '@/modules/post/StudentPostCreate'
import PostCreateDialog from '@/modules/post/PostCreateDialog'

export default {
  components: {
    PostCreateDialog,
    StudentPostCreate,
    Breadcrumbs: () => import('@/components/layout/Breadcrumbs.vue'),
    AllSchoolPostCreate: () => import('@/modules/post/AllSchoolPostCreate.vue'),
    GradePostCreate: () => import('@/modules/post/GradePostCreate.vue'),
    ClassPostCreate: () => import('@/modules/post/ClassPostCreate.vue')
  },
  data() {
    return {
      tab: 0,
      sendDialog: false,
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

<style lang='scss' scoped>

</style>
