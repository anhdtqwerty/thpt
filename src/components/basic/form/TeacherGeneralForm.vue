<template>
  <v-form v-model="valid" ref="form" v-bind="this.$attrs">
    <v-row>
      <v-col cols="12">
        <v-text-field
          ref="name"
          v-model="name"
          placeholder="Nhập tên giáo viên"
          required
          outlined
          dense
        ></v-text-field>
        <date-picker
          :date.sync="dob"
          placeholder="Nhập Ngày Sinh"
          outlined
          dense
        ></date-picker>
        <v-select
          ref="gender"
          v-model="gender"
          :items="['male', 'female']"
          placeholder="Chọn giới tính"
          outlined
          dense
          required
        ></v-select>
        <v-text-field
          ref="frequentlyAddress"
          v-model="frequentlyAddress"
          placeholder="Nhập địa chỉ thường trú"
          required
          outlined
          dense
        ></v-text-field>
        <v-text-field
          ref="ethinic"
          v-model="ethnic"
          placeholder="Nhập dân tộc"
          required
          outlined
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
    if (this.teacher) {
      this.reset()
    }
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
