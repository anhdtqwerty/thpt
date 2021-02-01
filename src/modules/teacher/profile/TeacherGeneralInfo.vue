<template>
  <v-row class="pa-4" v-bind="this.$attrs">
    <v-col cols="12" class="pa-4">
      <teacher-general-form-edit
        ref="teacherGeneralFormEdit"
        :readonly="!edit"
        :teacher="teacher"
      ></teacher-general-form-edit>
    </v-col>
    <v-col cols="12" class="pa-4">
      <teacher-school-form-edit
        :readonly="!edit"
        :teacher="teacher"
        ref="teacherSchoolForm"
      ></teacher-school-form-edit>
    </v-col>
    <v-col cols="12" class="pa-4">
      <teacher-contact-form-edit
        :readonly="!edit"
        :teacher="teacher"
        ref="teacherContactForm"
      ></teacher-contact-form-edit>
    </v-col>
    <v-col cols="12" class="pa-4">
      <teacher-specialize-form-edit
        :readonly="!edit"
        :teacher="teacher"
        ref="teacherSpecializeForm"
      ></teacher-specialize-form-edit>
    </v-col>
  </v-row>
</template>

<script>
import TeacherGeneralFormEdit from '@/components/basic/form/TeacherGeneralFormEdit'
import TeacherSchoolFormEdit from '@/components/basic/form/TeacherSchoolFormEdit'
import TeacherContactFormEdit from '@/components/basic/form/TeacherContactFormEdit'
import TeacherSpecializeFormEdit from '@/components/basic/form/TeacherSpecializeFormEdit'

export default {
  components: {
    TeacherSpecializeFormEdit,
    TeacherGeneralFormEdit,
    TeacherContactFormEdit,
    TeacherSchoolFormEdit,
  },
  props: {
    teacher: Object,
  },
}
</script>

<style>
</style>
