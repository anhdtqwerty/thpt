<template>
  <v-dialog :fullscreen="$vuetify.breakpoint.smAndDown" v-model="dialog" width="600" scrollable>
    <v-card>
      <v-card-title class="primary white--text text-uppercase">
        Thêm học sinh mới
        <v-spacer></v-spacer>
        <v-btn dark icon>
          <v-icon @click="cancel">close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider />
      <v-card-text>
        <v-form ref="form" class="py-4">
          <h3 class="mb-2">1. Thông tin cơ bản</h3>
          <student-general-form :rules="rules" ref="studentGeneralForm"></student-general-form>
          <h3 class="mb-2">2. Thông tin lớp học</h3>
          <StudentClassForm ref="studentClassForm" />
          <h3 class="mb-2">3. Thông tin liên lạc</h3>
          <student-contact-form ref="studentContactForm"></student-contact-form>
          <h3 class="mb-2">4. Ghi chú về học sinh</h3>
          <student-note-form ref="studentNoteForm"></student-note-form>
          <h3 class="mb-2">5. Thông tin gia đình</h3>
          <student-family-form ref="studentFamilyForm"></student-family-form>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="ma-2" dark depressed color="#0D47A1" @click="save()" :disabled="isLoading">Lưu</v-btn>
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
import StudentClassForm from '@/components/basic/form/StudentClassForm.vue'
import moment from 'moment'

export default {
  components: {
    StudentGeneralForm,
    StudentContactForm,
    StudentNoteForm,
    StudentFamilyForm,
    StudentClassForm
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
        required: value => !!value || 'Trường này không được để trống',
        min: v => v.length >= 6 || 'Ít nhất 6 ký tự',
        email: v => /.+@.+/.test(v) || 'Email chưa đúng định dạng',
        date: v => moment(v, 'DD/MM/YYYY', true).isValid() || 'Ngày sinh không hợp lệ'
      }
    }
  },
  props: {
    state: Boolean,
    hideAdvanceOption: Boolean,
    defaultPhone: String,
    defaultEmail: String,
    defaultName: String,
    defaultOveride: Object
  },
  computed: {
    ...mapState('app', ['roles', 'department', 'currentGeneration']),
    ...mapGetters('app', ['roleIdByName', 'roles']),
    isLoading() {
      return this.loading > 0
    },
    majors() {
      return this.rootMajor.majors || []
    }
  },
  methods: {
    ...mapActions('students', ['createStudent']),
    ...mapActions('student', ['uploadAvatar']),

    async save() {
      if (
        !this.$refs.studentGeneralForm.validate() ||
        !this.$refs.studentClassForm.validate() ||
        !this.$refs.studentContactForm.validate()
      ) {
        return
      }
      this.$loading.active = true

      const studentGeneralForm = this.$refs.studentGeneralForm.getData()
      const studentClassForm = this.$refs.studentClassForm.getData()
      const studentContactForm = this.$refs.studentContactForm.getData()
      const studentNoteForm = this.$refs.studentNoteForm.getData()
      const studentFamilyForm = this.$refs.studentFamilyForm.getData()
      this.classes.push(studentClassForm.class)
      const overide = this.defaultOveride || {}
      try {
        const student = await this.createStudent({
          generation: this.currentGeneration.id,
          department: this.department.id,
          classes: this.classes,
          currentClass: studentClassForm.class,
          grade: studentClassForm.grade,
          name: studentGeneralForm.name,
          formatedName: studentGeneralForm.formatedName,
          tags: studentGeneralForm.tags,
          username: studentGeneralForm.username,
          username_indexing: studentGeneralForm.username_indexing,
          username_no: studentGeneralForm.username_no,
          // password: '123123',
          status: 'active',
          address: studentContactForm.currentLive,
          notes: studentNoteForm.notes,
          phone: studentContactForm.phone,
          email: studentContactForm.email,
          gender: studentGeneralForm.gender,
          dob: studentGeneralForm.dob,
          data: {
            ...studentGeneralForm,
            ...studentContactForm,
            ...studentFamilyForm,
            ...studentNoteForm
          },
          ...overide,
          type: 'student',
          role: this.roleIdByName('Student')
        })

        if (studentGeneralForm.avatar) {
          let formData = new FormData()
          formData.append('files', studentGeneralForm.avatar)
          formData.append('refId', student.id)
          formData.append('ref', 'student')
          formData.append('field', 'avatar')
          this.uploadAvatar(formData)
        }

        this.dialog = false
        this.reset()
        this.$alert.success('Tạo mới học sinh thành công')
        // this.$router.push(`/student/${student.id}`)
        this.$emit('done', student)
      } catch (error) {
        this.$alert.addError()
      } finally {
        this.$loading.active = false
      }
    },
    cancel() {
      this.dialog = false
      this.reset()
      this.$emit('cancel')
    },
    reset() {
      this.$refs.studentGeneralForm.reset()
      this.$refs.studentClassForm.reset()
      this.$refs.studentContactForm.reset()
      this.$refs.studentNoteForm.reset()
      this.$refs.studentFamilyForm.reset()
    }
  },
  watch: {
    state(state) {
      this.dialog = true
      this.phone = this.defaultPhone || ''
      this.email = this.defaultEmail || ''
      this.name = this.defaultName || ''
      if (this.defaultName) {
        this.nameLostFocus()
      }
    },
    rootMajor() {}
  }
}
</script>
