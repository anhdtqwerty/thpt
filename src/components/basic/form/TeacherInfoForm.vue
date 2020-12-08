<template>
  <v-form v-model="valid" ref="form">
    <v-row>
      <v-col cols="12" md="6">
        <v-text-field
          ref="name"
          v-model="name"
          label="Họ và tên"
          placeholder="Nhập tên giáo viên"
          required
          dense
          outlined
        ></v-text-field>
        <v-text-field
          ref="phone"
          v-model="phone"
          label="Số điện thoại"
          placeholder="Nhập số điện thoại"
          required
          dense
          outlined
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          ref="email"
          v-model="email"
          label="Email Giáo Viên"
          placeholder="Nhập email giáo viên"
          dense
          outlined
        ></v-text-field>
        <v-text-field
          ref="facebook"
          v-model="facebook"
          label="Facebook Giáo Viên"
          placeholder="Nhập facebook link"
          dense
          outlined
        ></v-text-field>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
export default {
  props: {
    teacher: {
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
    phone: '',
    facebook: '',
  }),
  created () {
    this.reset()
  },
  methods: {
    validate () {
      this.$refs.form.validate()
    },
    reset () {
      this.name = this.teacher.name
      this.email = this.teacher.email
      this.phone = this.teacher.phone
      this.facebook = this.teacher.data ? this.teacher.data.facebook : ''
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    },
    getData () {
      return {
        name: this.name,
        email: this.email,
        phone: this.phone,
        facebook: this.facebook
      }
    }
  },
  watch: {
    teacher (teacher) {
      this.reset()
    }
  }
}
</script>

<style>
input {
  margin: 8px 0px;
}

</style>
