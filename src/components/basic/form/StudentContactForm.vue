<template>
  <v-form v-model="valid" ref="form" v-bind="this.$attrs">
    <v-row>
      <v-col cols="12">
        <v-text-field
          ref="currentLive"
          v-model="currentLive"
          label="Địa chỉ liên lạc"
          placeholder="Nhập địa chỉ hiện tại"
          required
          dense
        ></v-text-field>
        <v-text-field
          ref="province"
          v-model="province"
          label="Tỉnh/Thành phố"
          placeholder="Nhập tỉnh/thành phố đang sống"
          required
          dense
        ></v-text-field>
        <v-text-field
          ref="district"
          v-model="district"
          label="Quận/Huyện"
          placeholder="Nhập quận/huyện đang sống"
          required
          dense
        ></v-text-field>
        <v-text-field
          ref="phone"
          v-model="phone"
          label="Số điện thoại"
          placeholder="Nhập số điện thoại"
          required
          dense
        ></v-text-field>
        <v-text-field
          ref="email"
          v-model="email"
          label="Email Học Sinh"
          placeholder="Nhập email học sinh"
          dense
        ></v-text-field>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
// import { get } from 'lodash'
export default {
  props: {
    student: {
      type: [Object],
      required: true,
      default: () => {},
    },
  },
  data: () => ({
    valid: true,
    email: '',
    phone: '',
    currentLive: '',
    province: '',
    district: '',
  }),
  created() {
    this.reset()
  },
  methods: {
    validate() {
      this.$refs.form.validate()
    },
    getData() {
      return {
        email: this.email,
        phone: this.phone,
        currentLive: this.currentLive,
        province: this.province,
        district: this.district,
      }
    },
    reset() {
      this.email = this.student.email
      this.phone = this.student.phone
      this.currentLive = this.student.data.currentLive
      this.province = this.student.data.province
      this.district = this.student.data.district
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
  },
  watch: {
    student(student) {
      this.reset()
    },
  },
}
</script>

<style scoped>
</style>
