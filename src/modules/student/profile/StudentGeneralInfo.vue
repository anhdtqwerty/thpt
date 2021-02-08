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
    <v-row class="pt-6 justify-space-between" no-gutters>
      <div>
        <v-col cols="12">
          <v-btn @click="edit = !edit" color="primary" outlined
            >Sửa hồ sơ học sinh</v-btn
          >
        </v-col>
        <v-col cols="12">
          <v-btn @click="remove" text color="red" left>Xóa học sinh này</v-btn>
        </v-col>
      </div>
      <div>
        <v-btn
          @click="edit = !edit"
          v-if="edit"
          class="mr-2"
          color="primary"
          outlined
          >Hủy</v-btn
        >
        <v-btn @click="save" v-if="edit" depressed color="primary">Lưu</v-btn>
      </div>
    </v-row>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import StudentGeneralFormEdit from '@/components/basic/form/StudentGeneralFormEdit.vue'
import StudentContactFormEdit from '@/components/basic/form/StudentContactFormEdit.vue'
import StudentNoteFormEdit from '@/components/basic/form/StudentNoteFormEdit.vue'
import StudentFamilyFormEdit from '@/components/basic/form/StudentFamilyFormEdit.vue'

export default {
  data() {
    return {
      edit: false,
    }
  },
  components: {
    StudentGeneralFormEdit,
    StudentContactFormEdit,
    StudentNoteFormEdit,
    StudentFamilyFormEdit,
  },
  props: {
    student: Object,
  },
  methods: {
    ...mapActions('student', ['updateStudent', 'removeStudent']),
    save() {
      const studentGeneralFormEdit = this.$refs.studentGeneralFormEdit.getData()
      const studentContactForm = this.$refs.studentContactForm.getData()
      const studentNoteForm = this.$refs.studentNoteForm.getData()
      const studentFamilyForm = this.$refs.studentFamilyForm.getData()

      this.updateStudent({
        id: this.student.id,
        name: studentGeneralFormEdit.name,
        phone: studentContactForm.phone,
        address: studentContactForm.currentLive,
        notes: studentNoteForm.notes,
        email: studentContactForm.email,
        gender: studentGeneralFormEdit.gender,
        dob: studentGeneralFormEdit.dob,
        data: {
          ...this.student.data,
          ...studentGeneralFormEdit,
          ...studentContactForm,
          ...studentFamilyForm,
          ...studentNoteForm,
        },
      })
    },
    remove() {
      this.$dialog.confirm({
        title: 'Xóa Học Sinh',
        text: 'Bạn Có chắc muốn xóa học sinh này.?',
        okText: 'Có',
        cancelText: 'Không',
        done: async () => {
          await this.removeStudent(this.student)
        }
      })
    },
  }
}
</script>

<style>
</style>
