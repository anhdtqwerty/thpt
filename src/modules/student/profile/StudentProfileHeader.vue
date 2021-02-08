<template>
  <v-card :flat="$vuetify.breakpoint.smAndDown">
    <v-row class="pa-4">
      <v-col class="text-center" cols="3">
        <user-avatar-picker :student="student" type="student" />
      </v-col>
      <v-col cols="9">
        <student-basic-form
          class="d-flex flex-column justify-space-between"
          :student="student"
        />
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
