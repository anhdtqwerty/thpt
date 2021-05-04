<template>
  <v-form v-model="valid" ref="form" v-bind="this.$attrs">
    <p class="font-weight-black black--text">1. Thông tin cơ bản</p>
    <v-row class="pr-12">
      <v-col class="d-flex py-0" cols="12">
        <v-subheader class="px-0">Họ và tên</v-subheader>
        <v-text-field class="pt-1" flat solo hide-details v-model="name" dense regular></v-text-field>
      </v-col>
      <v-col class="d-flex py-0" cols="12">
        <v-subheader class="px-0">Giới tính</v-subheader>
        <v-text-field class="pt-1" flat solo hide-details v-model="gender" dense regular></v-text-field>
      </v-col>
      <v-col class="py-0 d-flex" cols="12">
        <v-subheader class="px-0">Ngày sinh</v-subheader>
        <v-text-field class="pt-1" flat solo hide-details v-model="dobDisplay" dense regular />
      </v-col>
      <v-col class="py-0 d-flex" cols="12">
        <v-subheader class="px-0">Quê quán</v-subheader>
        <v-text-field class="pt-1" flat solo hide-details v-model="frequentlyAddress" dense regular></v-text-field>
      </v-col>
      <v-col class="py-0 d-flex" cols="12">
        <v-subheader class="px-0">Dân tộc</v-subheader>
        <v-text-field class="pt-1" flat solo hide-details v-model="ethnic" dense regular></v-text-field>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { mapActions } from 'vuex'
import moment from 'moment'

export default {
  props: {
    student: Object
  },
  data: () => ({
    valid: true,
    name: '',
    gender: '',
    dob: '',
    ethnic: '',
    frequentlyAddress: '',
    classes: [],
    rules: {
      required: value => !!value || 'Required.',
      min: v => v.length >= 6 || 'Min 8 characters',
      email: v => /.+@.+/.test(v) || 'E-mail must be valid'
    },
    genderList: [
      { value: 'male', title: 'Nam' },
      { value: 'female', title: 'Nữ' }
    ]
  }),
  created() {
    if (this.student) {
      this.name = this.student.name
      this.gender = this.student.gender
      this.dob = this.student.dob
      this.ethnic = this.student.data.ethnic
      this.frequentlyAddress = this.student.data.frequentlyAddress
      this.classes = this.student.classes
    }
  },
  methods: {
    ...mapActions('user', ['generateStudentCode', 'validateEmail']),
    getData() {
      return {
        name: this.name,
        gender: this.gender,
        dob: this.dob,
        ethnic: this.ethnic,
        frequentlyAddress: this.frequentlyAddress,
        classes: this.classes
      }
    },
    validate() {
      return this.$refs.form.validate()
    },
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    }
  },
  watch: {
    student(val) {
      if (val) {
        this.name = val.name
        this.gender = val.gender
        this.dob = val.dob
        this.ethnic = val.data.ethnic
        this.frequentlyAddress = val.data.frequentlyAddress
        this.classes = val.classes
      }
    }
  },
  computed: {
    dobDisplay() {
      return moment(this.dob).format('DD/MM/YYYY')
    }
  }
}
</script>

<style scoped>
.v-subheader {
  width: 30%;
}
.v-text-field > .v-input__control > .v-input__slot:before {
  border-style: none;
}
</style>
