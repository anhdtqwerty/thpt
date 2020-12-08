<template>
  <v-form v-model="valid" ref="form">
    <v-text-field ref="name" v-model="name" label="Số CMT" placeholder="Nhập tên học sinh" required></v-text-field>
    <v-text-field
      ref="phone"
      v-model="phone"
      label="Số điện thoại"
      placeholder="Nhập số điện thoại"
      required
    ></v-text-field>
    <v-text-field
      ref="email"
      v-model="email"
      label="Email Học Sinh"
      placeholder="Nhập email học sinh"
    ></v-text-field>
    <v-select
      ref="gender"
      v-model="gender"
      :items="['male', 'female']"
      label="Giới Tính"
      placeholder="Chọn giới tính"
      required
    ></v-select>
    <v-text-field ref="address" v-model="address" label="Địa Chỉ" placeholder="Nhập địa chỉ"></v-text-field>
    <v-textarea ref="notes" v-model="notes" label="Ghi Chú" placeholder="Nhập ghi chú"></v-textarea>
  </v-form>
</template>

<script>
export default {
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
    notes: '',
    gender: '',
    phone: '',
    address: '',
    parentName: ''
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
      this.phone = this.student.phone
      this.gender = this.student.gender
      this.dob = this.student.gender
      this.parentName = this.student.parentName
      this.parentEmail = this.student.parentEmail
      this.address = this.student.address
      this.notes = this.student.notes
      this.school = this.student.school
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
        parentEmail: this.parentEmail,
        school: this.school,
        address: this.address,
        notes: this.notes,
        parentName: this.parentName
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
