<template>
  <div class="mx-4">
    <TeacherProfileHeader class="mb-6" />
    <TeacherProfileMain class="mb-6" />
    <TeacherDeleteDialog :state="deleteState" />
    <div class="text-center">
      <v-btn class="mb-4" color="red" outlined @click="deleteState = !deleteState">Xóa giáo viên</v-btn>
    </div>
  </div>
</template>

<script>
import TeacherProfileHeader from '@/modules/teacher/profile/TeacherProfileHeader'
import TeacherProfileMain from '@/modules/teacher/profile/TeacherProfileMain'
import TeacherDeleteDialog from '@/modules/teacher/TeacherDeleteDialog'

export default {
  components: { TeacherProfileHeader, TeacherProfileMain, TeacherDeleteDialog },
  props: {
    edit: Boolean
  },
  data() {
    return {
      deleteState: false
    }
  }
}
</script>
<style scoped>
.can-click:hover {
  cursor: pointer;
}
</style>
