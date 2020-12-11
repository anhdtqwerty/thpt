<template>
  <v-row no-gutters v-if="student">
    <div v-if="$vuetify.breakpoint.smAndDown">
      <v-btn depressed color="primary" @click="save()">Lưu</v-btn>
    </div>
    <v-col
      class="text-center"
      cols="12"
      md="4"
    >
      <user-avatar-picker :student="student" type="student" />
      <h2>{{ student.name }}</h2>
      <table class="info-student-general mx-6">
        <tr>
          <td>Mã số</td>
          <td>{{ student.code }}</td>
        </tr>
        <tr>
          <td>Lớp</td>
          <td>10A</td>
        </tr>
        <tr>
          <td>Trạng thái</td>
          <td>{{ student.status }}</td>
        </tr>
      </table>
    </v-col>

    <v-col cols="12" md="8">
      <h3>1. Thông tin cơ bản</h3>
      <student-general-form
        ref="studentGeneralForm"
        :student="student"
      ></student-general-form>
      <h3>2. Thông tin liên lạc</h3>
      <student-contact-form
        :student="student"
        ref="studentContactForm"
      ></student-contact-form>
      <h3>3. Ghi chú về học sinh</h3>
      <student-note-form
        :student="student"
        ref="studentNoteForm"
      ></student-note-form>
      <h3>4. Thông tin gia đình</h3>
      <student-family-form
        :student="student"
        ref="studentFamilyForm"
      ></student-family-form>
    </v-col>
  </v-row>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import StudentGeneralForm from '@/components/basic/form/StudentGeneralForm.vue'
import StudentContactForm from '@/components/basic/form/StudentContactForm.vue'
import StudentNoteForm from '@/components/basic/form/StudentNoteForm.vue'
import UserAvatarPicker from '@/components/basic/picker/UserAvatarPicker'
import StudentFamilyForm from '@/components/basic/form/StudentFamilyForm.vue'

export default {
  components: {
    StudentGeneralForm,
    UserAvatarPicker,
    StudentContactForm,
    StudentNoteForm,
    StudentFamilyForm,
  },
  props: {
    student: Object,
  },
  data() {
    return {
      tab: null,
      dialog: true,
    }
  },
  computed: {
    ...mapGetters('student', ['logs']),
  },
  created() {},
  methods: {
    ...mapActions('student', ['updateStudent', 'fetchLogs']),
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
    save() {
      const studentGeneralForm = this.$refs.studentGeneralForm.getData()
      const studentContactForm = this.$refs.studentContactForm.getData()
      const studentNoteForm = this.$refs.studentNoteForm.getData()
      const studentFamilyForm = this.$refs.studentFamilyForm.getData()

      this.updateStudent({
        id: this.student.id,
        name: studentGeneralForm.name,
        phone: studentContactForm.phone,
        address: studentContactForm.currentLive,
        notes: studentNoteForm.notes,
        email: studentContactForm.email,
        gender: studentGeneralForm.gender,
        dob: studentGeneralForm.dob,
        data: {
          ...this.student.data,
          ...studentGeneralForm,
          ...studentContactForm,
          ...studentFamilyForm,
          ...studentNoteForm,
        },
      })
    },
    cancel() {
      this.state = false
    },
  },
}
</script>

<style scoped>
.border {
  border: solod 1px lightgray;
  border-radius: 4px;
}
.info-student-general {
  width: 100%;
  text-align: left;
}
.info-student-general td:nth-child(1) {
  width: 70%;
}
.info-student-general td:nth-child(2) {
  font-weight: bold;
}
h3 {
  margin-bottom: 10px;
}
</style>
