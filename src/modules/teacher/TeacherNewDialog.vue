<template>
  <v-dialog :fullscreen="isMobile" width="661" v-model="dialog" scrollable>
    <v-card>
      <v-card-title class="primary white--text">
        Thêm Mới Giáo viên
        <v-spacer></v-spacer>
        <v-btn dark icon>
          <v-icon @click="cancel">close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider />

      <v-card-text>
        <v-form ref="form" class="pa-2">
          <h3 class="mb-2">1. Thông tin cơ bản</h3>
          <teacher-general-form ref="teacherGeneralForm"></teacher-general-form>
          <h3 class="mb-2">2. Thông tin tại trường</h3>
          <teacher-school-form ref="teacherSchoolForm"></teacher-school-form>
          <h3 class="mb-2">3. Thông tin liên lạc</h3>
          <teacher-contact-form ref="teacherContactForm"></teacher-contact-form>
          <h3 class="mb-2">4. Thông tin chuyên môn</h3>
          <teacher-specialize-form
            ref="teacherSpecializeForm"
          ></teacher-specialize-form>
          <h3 class="mb-2">5. Thông tin đăng nhập</h3>
          <login-info-form ref="loginInfoForm"></login-info-form>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          :loading="isLoading"
          depressed
          class="mr-2"
          color="primary"
          medium
          @click="save"
          :disabled="isLoading"
        >
          <span>Lưu</span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import TeacherGeneralForm from '@/components/basic/form/TeacherGeneralForm'
import TeacherContactForm from '@/components/basic/form/TeacherContactForm'
import TeacherSchoolForm from '@/components/basic/form/TeacherSchoolForm'
import TeacherSpecializeForm from '@/components/basic/form/TeacherSpecializeForm'
import LoginInfoForm from '@/components/basic/form/LoginInfoForm'

export default {
  components: {
    TeacherGeneralForm,
    TeacherContactForm,
    TeacherSchoolForm,
    TeacherSpecializeForm,
    LoginInfoForm
  },
  data() {
    return {
      dialog: false,
      loading: 0,
      name: '',
      phone: '',
      email: '',
      lastemail: '',
      username: '',
      username_indexing: '',
      username_no: 0,
      role: '',
      majors: '',
      show: false,
      password: '',
      emailError: '',
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 6 || 'Min 8 characters',
        email: v => /.+@.+/.test(v) || 'E-mail must be valid'
      },
      isMobile: false
    }
  },

  beforeDestroy() {
    if (typeof window === 'undefined') return

    window.removeEventListener('resize', this.onResize, { passive: true })
  },

  mounted() {
    this.onResize()

    window.addEventListener('resize', this.onResize, { passive: true })
  },
  props: {
    state: Boolean
  },
  computed: {
    ...mapState('app', ['roles', 'department']),
    ...mapGetters('app', ['roleIdByName']),
    isLoading() {
      return this.loading > 0
    }
  },
  methods: {
    ...mapActions('user', ['generateUserName', 'validateEmail']),
    ...mapActions('teacher', ['createTeacher']),
    async save() {
      if (
        !this.$refs.teacherGeneralForm.validate() ||
        !this.$refs.teacherSchoolForm.validate() ||
        !this.$refs.teacherContactForm.validate() ||
        !this.$refs.teacherSpecializeForm.validate()
      ) {
        return
      }
      try {
        const teacherGeneralForm = this.$refs.teacherGeneralForm.getData()
        const teacherSchoolForm = this.$refs.teacherSchoolForm.getData()
        const teacherContactForm = this.$refs.teacherContactForm.getData()
        const teacherSpecializeForm = this.$refs.teacherSpecializeForm.getData()
        const loginInfoForm = this.$refs.loginInfoForm.getData()
        await this.createTeacher({
          username: teacherGeneralForm.username,
          password: loginInfoForm.password,
          email: loginInfoForm.email,
          name: teacherGeneralForm.name,
          address: teacherContactForm.currentLive,
          gender: teacherGeneralForm.gender,
          phone: loginInfoForm.phone,
          status: teacherSchoolForm.status,
          type: teacherSchoolForm.type,
          subject: teacherSpecializeForm.subject,
          metadata: {
            ...teacherGeneralForm,
            ...teacherContactForm,
            ...teacherSchoolForm,
            ...teacherSpecializeForm
          },
          department: this.department.id
        })
        this.dialog = false
        this.reset()
      } catch (e) {
        console.log(e)
      }
    },
    async nameLostFocus() {
      const {
        username,
        // eslint-disable-next-line
        username_indexing,
        // eslint-disable-next-line
        username_no
      } = await this.generateUserName(this.name)
      this.username = username
      // eslint-disable-next-line
      this.username_indexing = username_indexing
      // eslint-disable-next-line
      this.username_no = username_no
    },
    async emailLostFocus() {
      try {
        this.loading += 1
        if (this.email !== this.lastemail) {
          this.emailError = await this.validateEmail(this.email)
        }
        this.lastemail = this.email
      } finally {
        this.loading -= 1
      }
    },
    cancel() {
      this.dialog = false
      this.reset()
    },
    reset() {
      this.name = ''
      this.username = ''
      this.majors = ''
      this.phone = ''
      this.password = ''
      this.email = ''
      this.emailError = ''
    },
    onResize() {
      if (window.innerWidth < 600) {
        this.isMobile = true
      } else {
        this.isMobile = false
      }
    }
  },
  watch: {
    state(state) {
      this.dialog = true
    }
  }
}
</script>

<style scoped>
.v-data-footer {
  flex-wrap: nowrap;
}

.v-data-footer__icons-before {
  order: -1;
}
</style>
