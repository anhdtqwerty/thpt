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
import { mapActions } from 'vuex'
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
      edit: false,
    }
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
    async onSave() {
      await this.save()
      this.edit = !this.edit
    },
    remove() {
      // this.$dialog.confirm({
      //   title: 'Xóa Học Sinh',
      //   text: 'Bạn Có chắc muốn xóa học sinh này.?',
      //   okText: 'Có',
      //   cancelText: 'Không',
      //   done: asyn`c () => {
      //     await this.removeStudent(this.student)
      //   }
      // })
      console.log(this.student)
    },
  },
}
</script>

<style scoped>
</style>
