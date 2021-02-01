<template>
  <v-form v-model="valid" ref="form" v-bind="this.$attrs">
    <p class="text-subtitle-2 mb-0">1. Thông tin cơ bản</p>
    <v-row class="pr-12">
      <v-col class="d-flex pb-0" cols="12">
        <v-subheader class="px-0">Họ và tên</v-subheader>
        <v-text-field v-model="name" dense></v-text-field>
      </v-col>
      <v-col class="d-flex pb-0" cols="12">
        <v-subheader class="px-0">Ngày sinh</v-subheader>
        <date-picker :date.sync="dob" dense></date-picker>
      </v-col>
      <v-col class="d-flex pb-0" cols="12">
        <v-subheader class="px-0">Giới tính</v-subheader>
        <v-select v-model="gender" :items="['male', 'female']" dense></v-select>
      </v-col>
      <v-col class="d-flex pb-0" cols="12">
        <v-subheader class="px-0">Dân tộc</v-subheader>
        <v-text-field v-model="ethnic" dense></v-text-field>
      </v-col>
      <v-col class="d-flex pb-0" cols="12">
        <v-subheader class="px-0">Địa chỉ thường trú</v-subheader>
        <v-text-field v-model="frequentlyAddress" dense></v-text-field>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { mapActions } from 'vuex'
import DatePicker from '@/components/basic/picker/DateIOSPicker.vue'
export default {
  components: { DatePicker },
  props: {
    teacher: {
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
    rules: {
      required: (value) => !!value || 'Required.',
      min: (v) => v.length >= 6 || 'Min 8 characters',
      email: (v) => /.+@.+/.test(v) || 'E-mail must be valid',
    },
  }),
  created() {
    this.name = this.teacher.name
    this.gender = this.teacher.gender
    this.dob = this.teacher.metadata.dob
    this.ethinic = this.teacher.metadata.ethinic
    this.frequentlyAddress = this.teacher.metadata.frequentAddress
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
      }
    },
    validate() {
      this.$refs.form.validate()
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
