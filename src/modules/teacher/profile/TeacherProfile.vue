<template>
  <v-row
    :no-gutters="$vuetify.breakpoint.smAndDown"
    class="px-md-3"
    v-if="teacher"
  >
    <v-col class="text-center" cols="12" md="3">
      <user-avatar-picker :student="teacher" type="students" />
    </v-col>
    <v-col class="" cols="12" md="9">
      <v-card :flat="$vuetify.breakpoint.smAndDown"
        ><v-tabs v-model="tab" background-color="primary" dark>
          <v-tab :key="1"> Hồ sơ </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item :key="1">
            <v-card flat>
              <v-col cols="12" class="pa-4">
                <div class="d-flex justify-space-between">
                  <h3>1. Thông tin cơ bản</h3>
                  <v-btn
                    v-if="!edit"
                    depressed
                    class="mb-3"
                    color="success"
                    @click="edit = !edit"
                    >Sửa</v-btn
                  >
                  <v-btn
                    v-else
                    depressed
                    class="mb-3"
                    color="primary"
                    @click="onSave"
                    >Lưu</v-btn
                  >
                </div>
                <teacher-general-form-edit
                  ref="teacherGeneralFormEdit"
                  :readonly="!edit"
                  :teacher="teacher"
                ></teacher-general-form-edit>
              </v-col>
              <v-col cols="12" class="pa-4">
                <h3>2. Thông tin tại trường</h3>
                <teacher-school-form
                  :readonly="!edit"
                  :teacher="teacher"
                  ref="teacherSchoolForm"
                ></teacher-school-form>
              </v-col>
              <v-col cols="12" class="pa-4">
                <h3>3. Thông tin liên lạc</h3>
                <teacher-contact-form
                  :readonly="!edit"
                  :teacher="teacher"
                  ref="teacherContactForm"
                ></teacher-contact-form>
              </v-col>
              <v-col cols="12" class="pa-4">
                <h3>4. Thông tin chuyên môn</h3>
                <teacher-specialize-form
                  :readonly="!edit"
                  :teacher="teacher"
                  ref="teacherSpecializeForm"
                ></teacher-specialize-form>
              </v-col>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
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
      edit: false,
    }
  },
  computed: {
    ...mapGetters('teacher', ['avatar']),
  },
  methods: {
    ...mapActions('teacher', ['updateTeacher']),
    resetValidation() {
      this.$refs.teacherGeneralFormEdit.resetValidation()
      this.$refs.teacherSchoolForm.resetValidation()
      this.$refs.teacherContactForm.resetValidation()
      this.$refs.teacherSpecializeForm.resetValidation()
    },
    async onSave() {
      await this.save()
      this.edit = !this.edit
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
