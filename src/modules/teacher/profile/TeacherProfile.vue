<template>
  <v-row :no-gutters="$vuetify.breakpoint.smAndDown" class="px-md-3" v-if="teacher">
    <div class="d-flex justify-end" v-if="$vuetify.breakpoint.smAndDown">
      <v-btn class="ma-2" depressed color="primary" @click="save()">Lưu</v-btn>
    </div>
    <v-col class="text-center" cols="12" md="4">
      <v-card class="pa-6" :flat="$vuetify.breakpoint.smAndDown">
        <user-avatar-picker :student="teacher" type="students" />
        <h2>{{ teacher.name }}</h2>
        <table class="info-student-general mx-6">
          <tr>
            <td>Mã số</td>
            <td>{{ teacher.code }}</td>
          </tr>
          <tr>
            <td>Lớp</td>
            <td>10A</td>
          </tr>
          <tr>
            <td>Trạng thái</td>
            <td>{{ teacher.status }}</td>
          </tr>
        </table>
      </v-card>
    </v-col>
    <v-col class="" cols="12" md="8">
      <v-card :flat="$vuetify.breakpoint.smAndDown" class="pa-md-4">
        <v-row no-gutters>
          <v-col cols="12" class="pa-4" md="9">
            <h3>1. Thông tin cơ bản</h3>
            <teacher-general-form-edit
              ref="teacherGeneralFormEdit"
              :teacher="teacher"
            ></teacher-general-form-edit>
          </v-col>
          <v-col
            class="text-right"
            v-if="!$vuetify.breakpoint.smAndDown"
            md="3"
          >
            <v-btn depressed color="primary" @click="save()">Lưu</v-btn>
          </v-col>
          <v-col cols="12" class="pa-4" md="9">
            <h3>2. Thông tin tại trường</h3>
            <teacher-school-form
              :teacher="teacher"
              ref="teacherSchoolForm"
            ></teacher-school-form>
          </v-col>
          <v-col cols="12" class="pa-4" md="9">
            <h3>3. Thông tin liên lạc</h3>
            <teacher-contact-form
              :teacher="teacher"
              ref="teacherContactForm"
            ></teacher-contact-form>
          </v-col>
          <v-col cols="12" class="pa-4" md="9">
            <h3>4. Thông tin chuyên môn</h3>
            <teacher-specialize-form
              :teacher="teacher"
              ref="teacherSpecializeForm"
            ></teacher-specialize-form>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import TeacherGeneralFormEdit from '@/components/basic/form/TeacherGeneralFormEdit'
import TeacherSchoolForm from '@/components/basic/form/TeacherSchoolForm'
import TeacherContactForm from '@/components/basic/form/TeacherContactForm'
import TeacherSpecializeForm from '@/components/basic/form/TeacherSpecializeForm'
import UserAvatarPicker from '@/components/basic/picker/UserAvatarPicker'

export default {
  components: {
    TeacherSpecializeForm,
    TeacherGeneralFormEdit,
    TeacherContactForm,
    TeacherSchoolForm,
    UserAvatarPicker,
  },
  props: {
    teacher: Object,
  },
  data() {
    return {
      tab: null,
    }
  },
  computed: {
    ...mapGetters('teacher', ['avatar']),
  },
  methods: {
    ...mapActions('teacher', ['updateTeacher']),
    reset() {
      this.$refs.teacherGeneralFormEdit.reset()
      this.$refs.teacherSchoolForm.reset()
      this.$refs.teacherContactForm.reset()
      this.$refs.teacherSpecializeForm.reset()
    },
    resetValidation() {
      this.$refs.teacherGeneralFormEdit.resetValidation()
      this.$refs.teacherSchoolForm.resetValidation()
      this.$refs.teacherContactForm.resetValidation()
      this.$refs.teacherSpecializeForm.resetValidation()
    },
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
        this.dialog = false
        this.reset()
      } catch (e) {
        console.log(e)
      }
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
