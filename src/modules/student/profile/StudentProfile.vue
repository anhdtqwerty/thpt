<template>
  <div class="mx-4">
    <student-profile-header class="mb-6" :student="student" />
    <student-profile-main class="mb-6" :student="student" />
    <div class="text-center">
      <v-btn class="mb-4" @click="remove" color="red" outlined>Xóa học sinh</v-btn>
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
  methods: {
    remove() {
      this.$emit('remove')
    }
  }
}
</script>

<style scoped>
</style>
