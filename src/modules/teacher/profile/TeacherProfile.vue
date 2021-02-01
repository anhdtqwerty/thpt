<template>
  <v-row
    :no-gutters="$vuetify.breakpoint.smAndDown"
    class="px-md-3"
    v-if="teacher"
  >
    <v-col class="text-center" cols="12" md="3">
      <v-card class="pa-0">
        <user-avatar-picker width="100%" :student="teacher" type="students" />
        <p class="font-weight-bold pt-6 my-0">Sửa hồ sơ giáo viên</p>
        <p class="red--text py-4">Xóa giáo viên</p>
      </v-card>
    </v-col>
    <v-col class="" cols="12" md="9">
      <v-card :flat="$vuetify.breakpoint.smAndDown"
        ><v-tabs v-model="tab">
          <v-tab :key="1"> Hồ sơ </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item :key="1">
            <v-row>
              <v-col cols="9">
                <teacher-general-info :teacher="teacher" />
              </v-col>
            </v-row>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import UserAvatarPicker from '@/components/basic/picker/UserAvatarPicker'
import TeacherGeneralInfo from '@/modules/teacher/profile/TeacherGeneralInfo'

export default {
  components: {
    UserAvatarPicker,
    TeacherGeneralInfo,
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
