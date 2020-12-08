<template>
  <v-form v-model="valid" ref="form" v-bind="this.$attrs">
    <v-row>
      <v-col cols="12" md="6">
        <v-text-field
          ref="name"
          v-model="name"
          label="Học Sinh"
          placeholder="Nhập tên học sinh"
          required
          dense outlined
        ></v-text-field>
        <v-text-field
          ref="phone"
          v-model="phone"
          label="Số điện thoại"
          placeholder="Nhập số điện thoại"
          required
          dense outlined
        ></v-text-field>
        <v-text-field
          ref="email"
          v-model="email"
          label="Email Học Sinh"
          placeholder="Nhập email học sinh"
          dense outlined
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-select
          ref="gender"
          v-model="gender"
          :items="['male', 'female']"
          label="Giới Tính"
          placeholder="Chọn giới tính"
          dense outlined
          required
        ></v-select>
        <date-picker :date.sync="dob" label="Ngày Sinh" placeholder="Nhập Ngày Sinh" dense></date-picker>
        <v-text-field
          ref="facebook"
          v-model="facebook"
          label="Facebook Học Sinh"
          placeholder="Nhập facebook link"
          dense outlined
        ></v-text-field>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { get } from 'lodash'
import DatePicker from '@/components/basic/picker/DateIOSPicker.vue'
export default {
  components: { DatePicker },
  props: {
    student: {
      type: [Object],
      required: true,
      default: () => {}
    }
  },
  data: () => ({
    valid: true,
    name: '',
    email: '',
    parentEmail: '',
    school: '',
    gender: '',
    dob: '',
    notes: '',
    phone: '',
    facebook: ''
  }),
  created () {
    this.reset()
  },
  methods: {
    validate () {
      this.$refs.form.validate()
    },
    reset () {
      this.name = this.student.name
      this.email = this.student.email
      this.gender = this.student.gender
      this.dob = this.student.dob
      this.phone = this.student.phone
      this.facebook = get(this.student, 'data.facebook')
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    },
    getData () {
      return {
        name: this.name,
        email: this.email,
        phone: this.phone,
        gender: this.gender,
        dob: this.dob,
        data: { facebook: this.facebook },
        facebook: this.facebook
      }
    }
  },
  watch: {
    student (student) {
      this.reset()
    }
  }
}
</script>

<style scoped>
</style>
