<template>
  <v-row
    :no-gutters="$vuetify.breakpoint.smAndDown"
    class="px-md-2 mx-md-0"
    v-if="student"
  >
    <v-col cols="12">
      <student-profile-header :student="student" />
    </v-col>
    <v-col cols="12">
      <student-profile-main :student="student" />
    </v-col>
  </v-row>
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
  data() {
    return {
      dialog: true,
    }
  },
}
</script>

<style scoped>
</style>
