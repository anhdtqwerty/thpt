<template>
  <v-row v-if="student">
    <v-col cols="12" class="text-right">
      <v-btn depressed medium color="primary" class="mr-2" @click="save"
        >Lưu</v-btn
      >
      <v-btn :to="'/students'" depressed medium @click="cancel">Hủy</v-btn>
    </v-col>

    <v-col cols="12" md="4" class="text-center">
      <h3>{{ student.name }}</h3>
      <user-avatar-picker :student="student" type="student" />
    </v-col>

    <v-col cols="12" md="8">
      <v-col cols="12">
        <h3 class="mb-4">Thông tin cá nhân</h3>
        <h4 class="my-4">Thông tin liên lạc</h4>
        <student-info-form ref="studentInfoForm" :student="student" />
        <h4 class="my-4">Địa chỉ</h4>
        <user-address-form ref="studentAddressForm" :address="student.data" />
      </v-col>

      <v-col cols="12">
        <h3 class="mb-4">Trung tâm</h3>
        <h4 class="my-4">Khóa học</h4>
        <student-department-form
          ref="studentDepartmentForm"
          :student="student"
        />
        <h4 class="my-4">Lớp học</h4>
        <student-class-form ref="studentClassForm" :student="student" />
      </v-col>

      <v-col cols="12">
        <h3 class="mb-4">Học tập & làm việc</h3>
        <h4 class="my-4">Trường cấp 3</h4>
        <student-high-school-form
          ref="studentHighSchoolForm"
          :student="student"
        />
        <h4 class="my-4">Trường Đại học</h4>
        <student-university-form
          ref="studentUniversityForm"
          :data="student.data"
        />
        <h4 class="my-4">Công ty</h4>
        <student-company-form ref="studentCompanyForm" :work="student.data" />
      </v-col>

      <v-col cols="12">
        <h3 class="mb-4">Thông tin gia đình</h3>
        <student-family-form ref="studentFamilyForm" :student="student" />
      </v-col>
    </v-col>
  </v-row>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import StudentInfoForm from '@/components/basic/form/StudentInfoForm'
import UserAvatarPicker from '@/components/basic/picker/UserAvatarPicker'
import StudentHighSchoolForm from '@/components/basic/form/UserHighSchoolForm'
import StudentUniversityForm from '@/components/basic/form/UserUniversityForm'
import StudentCompanyForm from '@/components/basic/form/UserCompanyForm'
import UserAddressForm from '@/components/basic/form/UserAddressForm'
import StudentFamilyForm from '@/components/basic/form/StudentFamilyForm.vue'
import StudentDepartmentForm from '@/components/basic/form/StudentDepartmentForm.vue'
import StudentClassForm from '@/components/basic/form/StudentClassForm.vue'

export default {
  components: {
    StudentInfoForm,
    UserAddressForm,
    UserAvatarPicker,
    StudentCompanyForm,
    StudentHighSchoolForm,
    StudentUniversityForm,
    StudentClassForm,
    StudentDepartmentForm,
    StudentFamilyForm
  },
  props: {
    student: Object
  },
  data() {
    return {
      tab: null
    }
  },
  computed: {
    ...mapGetters('student', ['logs'])
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
      const studentInfo = this.$refs.studentInfoForm.getData()
      const studentDepartment = this.$refs.studentDepartmentForm.getData()
      const studentClass = this.$refs.studentClassForm.getData()
      const studentAddress = this.$refs.studentAddressForm.getData()
      const studentHighSchool = this.$refs.studentHighSchoolForm.getData()
      const studentUniversity = this.$refs.studentUniversityForm.getData()
      const studentCompany = this.$refs.studentCompanyForm.getData()
      const studentFamily = this.$refs.studentFamilyForm.getData()

      this.updateStudent({
        id: this.student.id,
        ...studentInfo,
        address: studentAddress.frequentlyAddress,
        ...studentDepartment,
        ...studentClass,
        data: {
          ...this.student.data,
          facebook: studentInfo.facebook,
          ...studentAddress,
          ...studentHighSchool,
          ...studentUniversity,
          ...studentCompany,
          ...studentFamily
        }
      })
    },
    cancel() {
      this.state = false
    }
  }
}
</script>

<style scoped>
.border {
  border: solod 1px lightgray;
  border-radius: 4px;
}
</style>
