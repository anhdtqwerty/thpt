<template>
  <v-form v-model="valid" ref="form" v-bind="this.$attrs">
    <p class="text-subtitle-2 mb-0">1. Thông tin cơ bản</p>
    <v-row class="pr-12">
      <v-col class="d-flex pb-0" cols="12">
        <v-subheader class="px-0">Họ và tên</v-subheader>
        <v-text-field v-model="name" dense regular></v-text-field>
      </v-col>
      <v-col class="d-flex pb-0" cols="12">
        <v-subheader class="px-0">Giới tính</v-subheader>
        <v-select
          v-model="gender"
          :items="genders"
          item-text="title"
          item-value="value"
          dense
          regular
        ></v-select>
      </v-col>
      <v-col class="pb-0 d-flex" cols="12">
        <v-subheader class="px-0">Ngày sinh</v-subheader>
        <date-picker :date.sync="dob" dense></date-picker>
      </v-col>
      <v-col class="pb-0 d-flex" cols="12">
        <v-subheader class="px-0">Quê quán</v-subheader>
        <v-text-field v-model="frequentlyAddress" dense></v-text-field>
      </v-col>
      <v-col class="pb-0 d-flex" cols="12">
        <v-subheader class="px-0">Dân tộc</v-subheader>
        <v-text-field v-model="ethnic" dense></v-text-field>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
// import { get } from 'lodash'
import DatePicker from '@/components/basic/picker/DateIOSPicker.vue'
import { mapActions } from 'vuex'
export default {
  components: { DatePicker },
  props: {
    student: {
      type: [Object],
      default: () => {},
    },
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
      required: (value) => !!value || 'Required.',
      min: (v) => v.length >= 6 || 'Min 8 characters',
      email: (v) => /.+@.+/.test(v) || 'E-mail must be valid',
    },
    genderList: [
      { value: 'male', title: 'Nam' },
      { value: 'female', title: 'Nữ' },
    ],
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
        classes: this.classes,
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
    },
  },
}
</script>

<style scoped>
.v-subheader {
  width: 30%;
}
</style>
