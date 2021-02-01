<template>
  <v-card :flat="$vuetify.breakpoint.smAndDown">
    <v-row class="pa-2">
      <v-col class="text-center" cols="12" md="3">
        <user-avatar-picker :student="student" type="student" />
      </v-col>
      <v-col class="d-flex align-center" cols="7">
        <student-basic-form :student="student" />
      </v-col>
      <v-col cols="2" class="ml-n8 pt-12">
        <v-btn small outlined>Sửa hồ sơ học sinh</v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import UserAvatarPicker from '@/components/basic/picker/UserAvatarPicker'
import StudentBasicForm from '@/components/basic/form/student/StudentBasicForm'

export default {
  components: {
    UserAvatarPicker,
    StudentBasicForm,
  },
  props: {
    student: Object,
  },
}
</script>

<style lang="css" scoped>
</style>
