<template>
  <v-form v-model="valid" ref="form" v-bind="this.$attrs">
    <v-row>
      <v-col cols="12">
        <v-text-field
          ref="name"
          v-model="name"
          label="Họ và tên"
          placeholder="Nhập tên giáo viên"
          required
          dense
        ></v-text-field>
        <date-picker
          :date.sync="dob"
          label="Ngày Sinh"
          placeholder="Nhập Ngày Sinh"
          dense
        ></date-picker>
        <v-select
          ref="gender"
          v-model="gender"
          :items="['male', 'female']"
          label="Giới Tính"
          placeholder="Chọn giới tính"
          dense
          required
        ></v-select>
        <v-text-field
          ref="frequentlyAddress"
          v-model="frequentlyAddress"
          label="Quê quán"
          placeholder="Nhập địa chỉ thường trú"
          required
          dense
        ></v-text-field>
        <v-text-field
          ref="ethinic"
          v-model="ethnic"
          label="Dân tộc"
          placeholder="Nhập dân tộc"
          required
          dense
        ></v-text-field>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
// import { get } from 'lodash'
import DatePicker from '@/components/basic/picker/DateIOSPicker.vue'
export default {
  components: { DatePicker },
  props: {
    teacher: {
      type: [Object],
      required: true,
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
  }),
  created() {
    this.reset()
  },
  methods: {
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
      this.name = this.teacher.name
      this.gender = this.teacher.gender
      this.dob = this.teacher.metadata.dob
      this.ethnic = this.teacher.metadata.ethnic
      this.frequentlyAddress = this.teacher.metadata.frequentlyAddress
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
  },
  watch: {
    teacher(teacher) {
      this.reset()
    },
  },
}
</script>
