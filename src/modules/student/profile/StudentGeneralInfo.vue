<template>
  <div class="pa-6">
    <v-row no-gutters>
      <v-col cols="6">
        <student-general-form-edit
          ref="studentGeneralFormEdit"
          :student="student"
          :readonly="!edit"
        ></student-general-form-edit>
        <student-contact-form-edit
          :student="student"
          ref="studentContactForm"
          :readonly="!edit"
        ></student-contact-form-edit>
        <student-note-form-edit
          :student="student"
          ref="studentNoteForm"
          :readonly="!edit"
        ></student-note-form-edit>
      </v-col>
      <v-col cols="6">
        <student-family-form-edit
          :student="student"
          ref="studentFamilyForm"
          :readonly="!edit"
        ></student-family-form-edit>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import StudentGeneralFormEdit from '@/components/basic/form/StudentGeneralFormEdit.vue'
import StudentContactFormEdit from '@/components/basic/form/StudentContactFormEdit.vue'
import StudentNoteFormEdit from '@/components/basic/form/StudentNoteFormEdit.vue'
import StudentFamilyFormEdit from '@/components/basic/form/StudentFamilyFormEdit.vue'

export default {
  components: {
    StudentGeneralFormEdit,
    StudentContactFormEdit,
    StudentNoteFormEdit,
    StudentFamilyFormEdit,
  },
  props: {
    student: Object,
  },
}
</script>

<style>
</style>
