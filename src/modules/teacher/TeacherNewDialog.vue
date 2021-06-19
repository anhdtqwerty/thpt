<template>
  <v-dialog :fullscreen="isMobile" width="620" v-model="dialog" scrollable>
    <v-card>
      <v-card-title class="primary white--text">
        <v-toolbar-title>THÊM GIÁO VIÊN MỚI</v-toolbar-title>
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
          <teacher-specialize-form ref="teacherSpecializeForm"></teacher-specialize-form>
          <h3 class="mb-2">5. Thông tin ghi chú về giáo viên</h3>
          <TeacherNoteForm ref="teacherNoteForm"></TeacherNoteForm>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="d-flex justify-space-between pa-5">
        <v-btn depressed outlined @click="cancel" class="grey--text">Huỷ</v-btn>
        <v-btn depressed color="primary" @click="save">Lưu</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import TeacherGeneralForm from '@/components/basic/form/TeacherGeneralForm'
import TeacherContactForm from '@/components/basic/form/TeacherContactForm'
import TeacherSchoolForm from '@/components/basic/form/TeacherSchoolForm'
import TeacherSpecializeForm from '@/components/basic/form/TeacherSpecializeForm'
import TeacherNoteForm from '@/components/basic/form/TeacherNoteForm.vue'

export default {
  components: {
    TeacherGeneralForm,
    TeacherContactForm,
    TeacherSchoolForm,
    TeacherSpecializeForm,
    TeacherNoteForm
  },
  data() {
    return {
      dialog: false,
      name: '',
      phone: '',
      email: '',
      username: '',
      username_indexing: '',
      username_no: 0,
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
    ...mapState('app', ['department'])
  },
  methods: {
    ...mapActions('user', ['generateUserName']),
    ...mapActions('teachers', ['createTeacher']),
    ...mapActions('teacher', ['uploadAvatar']),
    async save() {
      if (
        !this.$refs.teacherGeneralForm.validate() ||
        !this.$refs.teacherSchoolForm.validate() ||
        !this.$refs.teacherContactForm.validate() ||
        !this.$refs.teacherSpecializeForm.validate() ||
        !this.$refs.teacherNoteForm.validate()
      ) {
        return
      }
      try {
        this.$loading.active = true
        const teacherGeneralForm = this.$refs.teacherGeneralForm.getData()
        const teacherSchoolForm = this.$refs.teacherSchoolForm.getData()
        const teacherContactForm = this.$refs.teacherContactForm.getData()
        const teacherSpecializeForm = this.$refs.teacherSpecializeForm.getData()
        const teacherNoteForm = this.$refs.teacherNoteForm.getData()
        const teacher = await this.createTeacher({
          department: this.department.id,
          username: teacherGeneralForm.username,
          username_indexing: teacherGeneralForm.username_indexing,
          username_no: teacherGeneralForm.username_no,
          name: teacherGeneralForm.name,
          password: '123123',
          status: 'active',
          subjectGroup: teacherSpecializeForm.subjectGroup,
          address: teacherContactForm.currentLive,
          notes: teacherNoteForm.notes,
          phone: teacherContactForm.phone,
          email: teacherContactForm.email,
          gender: teacherGeneralForm.gender,
          dob: teacherGeneralForm.dob,
          type: teacherSchoolForm.type,
          metadata: {
            ...teacherContactForm,
            ...teacherSchoolForm,
            ...teacherSpecializeForm,
            ...teacherGeneralForm,
            ...teacherNoteForm
          }
        })
        if (teacherGeneralForm.avatar) {
          let formData = new FormData()
          formData.append('files', teacherGeneralForm.avatar)
          formData.append('refId', teacher.id)
          formData.append('ref', 'teacher')
          formData.append('field', 'avatar')
          this.uploadAvatar(formData)
        }
        this.$emit('done')
        this.dialog = false
        this.reset()
      } catch (e) {
        console.log(e)
      } finally {
        this.$loading.active = false
      }
    },
    cancel() {
      this.dialog = false
      this.reset()
    },
    reset() {
      this.$refs.teacherGeneralForm.reset()
      this.$refs.teacherSchoolForm.reset()
      this.$refs.teacherContactForm.reset()
      this.$refs.teacherSpecializeForm.reset()
      this.$refs.teacherNoteForm.reset()
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
