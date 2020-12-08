<template>
  <v-row v-if="teacher">
    <v-app-bar class="d-md-none mb-2 white">
      <v-btn to="/teachers" icon>
        <v-icon left>mdi-arrow-left</v-icon>
      </v-btn>
      <h3>Hồ sơ</h3>
      <v-spacer></v-spacer>
      <div class="d-flex flex-row justify-end">
        <v-btn
          depressed
          medium
          class="primary--text mr-2"
          color="blue lighten-5"
          right
          @click="cancel"
          :to="'/teachers'"
          >Hủy</v-btn
        >
        <v-btn depressed medium color="primary" @click="save">Lưu</v-btn>
      </div>
    </v-app-bar>

    <v-col cols="12" md="4" class="text-center">
      <h2>{{ teacher.name }}</h2>
      <user-avatar-picker
        v-if="teacher"
        type="teacher"
        :student="teacher"
        :avatar="avatar"
      />
    </v-col>

    <v-col cols="12" md="8">
      <div>
        <div class="d-md-flex justify-space-between">
          <h3 class="mb-4">Thông tin cá nhân</h3>
          <div class="flex-row justify-end d-none d-md-flex">
            <v-btn
              depressed
              medium
              class="primary--text mr-2"
              color="blue lighten-5"
              right
              @click="cancel"
              :to="'/teachers'"
              >Hủy</v-btn
            >
            <v-btn depressed medium color="primary" @click="save">Lưu</v-btn>
          </div>
        </div>
        <h4 class="my-4">Thông tin liên lạc</h4>
        <teacher-info-form ref="teacherInfoForm" :teacher="teacher" />
        <h4 class="my-4">Địa chỉ</h4>
        <user-address-form ref="teacherAddressForm" :address="teacher.data" />
      </div>

      <div>
        <h3 class="mb-4">Học tập & làm việc</h3>
        <h4 class="my-4">Trường đại học</h4>
        <teacher-university-form
          ref="teacherUniversityForm"
          :data="teacher.data"
        />
        <h4 class="my-4">Công ty</h4>
        <teacher-company-form ref="teacherCompanyForm" :work="teacher.data" />
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import TeacherInfoForm from '@/components/basic/form/TeacherInfoForm'
import UserAvatarPicker from '@/components/basic/picker/UserAvatarPicker'
import TeacherUniversityForm from '@/components/basic/form/UserUniversityForm'
import TeacherCompanyForm from '@/components/basic/form/UserCompanyForm'
import UserAddressForm from '@/components/basic/form/UserAddressForm'

export default {
  components: {
    TeacherInfoForm,
    UserAddressForm,
    UserAvatarPicker,
    TeacherCompanyForm,
    TeacherUniversityForm
  },
  props: {
    teacher: Object
  },
  data() {
    return {
      tab: null
    }
  },
  computed: {
    ...mapGetters('teacher', ['avatar'])
  },
  methods: {
    ...mapActions('teacher', ['updateTeacher']),
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
    save() {
      const teacherInfo = this.$refs.teacherInfoForm.getData()
      const teacherAddress = this.$refs.teacherAddressForm.getData()
      const teacherUniversity = this.$refs.teacherUniversityForm.getData()
      const teacherCompany = this.$refs.teacherCompanyForm.getData()

      this.updateTeacher({
        id: this.teacher.id,
        ...teacherInfo,
        address: teacherAddress.frequentlyAddress,
        data: {
          ...this.teacher.data,
          facebook: teacherInfo.facebook,
          ...teacherAddress,
          ...teacherUniversity,
          ...teacherCompany
        }
      })
    },
    cancel() {
      this.state = false
    }
  }
}
</script>
