<template>
  <v-dialog
    :fullscreen="$vuetify.breakpoint.smAndDown"
    v-model="dialog"
    width="600"
    scrollable
  >
    <v-card>
      <v-card-title class="primary white--text text-uppercase">
        Sửa hồ sơ học sinh
        <v-spacer></v-spacer>
        <v-btn dark icon>
          <v-icon @click="cancel">close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider />
      <v-card-text>
        <v-form ref="form" class="py-4">
          <h3 class="mb-2">1. Thông tin cơ bản</h3>
          <student-general-form
            :student="student"
            :rules="rules"
            ref="studentGeneralForm"
          ></student-general-form>
          <h3 class="mb-2">2. Thông tin liên lạc</h3>
          <student-contact-form
            :student="student"
            ref="studentContactForm"
          ></student-contact-form>
          <h3 class="mb-2">3. Ghi chú về học sinh</h3>
          <student-note-form
            :student="student"
            ref="studentNoteForm"
          ></student-note-form>
          <h3 class="mb-2">4. Thông tin gia đình</h3>
          <student-family-form
            :student="student"
            ref="studentFamilyForm"
          ></student-family-form>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          class="ma-2"
          dark
          depressed
          color="#0D47A1"
          @click="save()"
          :disabled="isLoading"
          >Lưu</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'

import StudentGeneralForm from '@/components/basic/form/StudentGeneralForm.vue'
import StudentContactForm from '@/components/basic/form/StudentContactForm.vue'
import StudentNoteForm from '@/components/basic/form/StudentNoteForm.vue'
import StudentFamilyForm from '@/components/basic/form/StudentFamilyForm.vue'

export default {
  components: {
    StudentGeneralForm,
    StudentContactForm,
    StudentNoteForm,
    StudentFamilyForm,
  },
  data() {
    return {
      dialog: false,
      loading: 0,
      name: '',
      major: '',
      classes: [],
      rootMajor: {},
      generation: '',
      phone: '',
      email: '',
      lastemail: '',
      username: '',
      username_indexing: '',
      username_no: 0,
      role: '',
      show: false,
      password: '',
      emailError: '',
      rules: {
        required: (value) => !!value || 'Trường này không được để trống',
        min: (v) => v.length >= 6 || 'Ít nhất 6 ký tự',
        email: (v) => /.+@.+/.test(v) || 'Email chưa đúng định dạng',
        dob: (v) =>
          /^(?:0[1-9]|[12]\d|3[01])([/.-])(?:0[1-9]|1[012])\1(?:19|20)\d\d$/.test(
            v
          ) || 'Ngày sinh chưa đúng định dạng',
      },
    }
  },
  props: {
    state: Boolean,
    hideAdvanceOption: Boolean,
    defaultPhone: String,
    defaultEmail: String,
    defaultName: String,
    defaultOveride: Object,
    student: Object,
  },
  computed: {
    ...mapState('app', ['roles', 'department', 'currentGeneration']),
    ...mapGetters('app', ['roleIdByName', 'roles']),
    isLoading() {
      return this.loading > 0
    },
    majors() {
      return this.rootMajor.majors || []
    },
  },
  methods: {
    ...mapActions('student', ['updateStudent']),
    async save() {
      const studentGeneralForm = this.$refs.studentGeneralForm.getData()
      const studentContactForm = this.$refs.studentContactForm.getData()
      const studentNoteForm = this.$refs.studentNoteForm.getData()
      const studentFamilyForm = this.$refs.studentFamilyForm.getData()
      await this.updateStudent({
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
      this.dialog = false
      this.reset()
    },
    cancel() {
      this.dialog = false
    },
  },
  watch: {
    state(state) {
      this.dialog = true
    },
    rootMajor() {},
  },
}
</script>
