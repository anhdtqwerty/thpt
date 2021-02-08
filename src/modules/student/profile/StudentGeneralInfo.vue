<template>
  <div class="pa-6">
    <v-row no-gutters>
      <v-col cols="6">
        <student-general-form-edit
          class="mb-6"
          ref="studentGeneralFormEdit"
          :student="student"
          :readonly="!edit"
          :edit="edit"
        ></student-general-form-edit>
        <student-contact-form-edit
          class="mb-6"
          :student="student"
          ref="studentContactForm"
          :readonly="!edit"
          :edit="edit"
        ></student-contact-form-edit>
        <student-note-form-edit
          class="mb-6"
          :student="student"
          ref="studentNoteForm"
          :readonly="!edit"
          :edit="edit"
        ></student-note-form-edit>
      </v-col>
      <v-col cols="6">
        <student-family-form-edit
          :student="student"
          ref="studentFamilyForm"
          :readonly="!edit"
          :edit="edit"
        ></student-family-form-edit>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row class="pt-6" no-gutters>
      <v-col cols="12">
        <v-btn @click="edit = !edit" color="primary" outlined
          >Sửa hồ sơ học sinh</v-btn
        >
      </v-col>
      <v-col cols="12">
        <v-btn class="mt-4" text color="red" left>Xóa học sinh này</v-btn>
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
    edit: Boolean,
  },
}
</script>

<style>
</style>
