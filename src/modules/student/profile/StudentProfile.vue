<template>
  <div class="mx-4">
    <student-profile-header class="mb-6" :student="student" />
    <student-profile-main class="mb-6" :student="student" />
    <div class="text-center">
      <v-btn color="red" outlined>Xóa học sinh</v-btn>
    </div>
  </div>
</template>
<script>
import StudentProfileHeader from '@/modules/student/profile/StudentProfileHeader'
import StudentProfileMain from '@/modules/student/profile/StudentProfileMain'

export default {
  components: {
    StudentProfileHeader,
    StudentProfileMain,
  },
  props: {
    student: Object,
  },
}
</script>

<style scoped>
</style>
