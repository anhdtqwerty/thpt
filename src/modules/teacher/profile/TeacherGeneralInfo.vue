<template>
  <v-row class="pa-4" v-bind="this.$attrs">
    <v-col cols="12" class="pa-4">
      <teacher-general-form-edit
        ref="teacherGeneralFormEdit"
        :readonly="!edit"
        :teacher="teacher"
        :edit="edit"
      ></teacher-general-form-edit>
    </v-col>
    <v-col cols="12" class="pa-4">
      <teacher-school-form-edit
        :readonly="!edit"
        :teacher="teacher"
        ref="teacherSchoolForm"
        :edit="edit"
      ></teacher-school-form-edit>
    </v-col>
    <v-col cols="12" class="pa-4">
      <teacher-contact-form-edit
        :readonly="!edit"
        :teacher="teacher"
        ref="teacherContactForm"
        :edit="edit"
      ></teacher-contact-form-edit>
    </v-col>
    <v-col cols="12" class="pa-4">
      <teacher-specialize-form-edit
        :readonly="!edit"
        :teacher="teacher"
        ref="teacherSpecializeForm"
        :edit="edit"
      ></teacher-specialize-form-edit>
    </v-col>
  </v-row>
</template>

<script>
import TeacherGeneralFormEdit from '@/components/basic/form/TeacherGeneralFormEdit'
import TeacherSchoolFormEdit from '@/components/basic/form/TeacherSchoolFormEdit'
import TeacherContactFormEdit from '@/components/basic/form/TeacherContactFormEdit'
import TeacherSpecializeFormEdit from '@/components/basic/form/TeacherSpecializeFormEdit'
import { mapActions } from 'vuex'

export default {
  components: {
    TeacherSpecializeFormEdit,
    TeacherGeneralFormEdit,
    TeacherContactFormEdit,
    TeacherSchoolFormEdit,
  },
  props: {
    teacher: Object,
    edit: Boolean,
  },
  methods: {
    ...mapActions('teacher', ['updateTeacher']),
    async save() {
      try {
        const teacherGeneralFormEdit = this.$refs.teacherGeneralFormEdit.getData()
        const teacherSchoolForm = this.$refs.teacherSchoolForm.getData()
        const teacherContactForm = this.$refs.teacherContactForm.getData()
        const teacherSpecializeForm = this.$refs.teacherSpecializeForm.getData()
        await this.updateTeacher({
          id: this.teacher.id,
          name: teacherGeneralFormEdit.name,
          address: teacherContactForm.currentLive,
          gender: teacherGeneralFormEdit.gender,
          status: teacherSchoolForm.status,
          type: teacherSchoolForm.type,
          subject: teacherSpecializeForm.subject,
          metadata: {
            ...teacherGeneralFormEdit,
            ...teacherContactForm,
            ...teacherSchoolForm,
            ...teacherSpecializeForm,
          },
        })
      } catch (e) {
        console.log(e)
      }
    },
  },
}
</script>

<style>
</style>
