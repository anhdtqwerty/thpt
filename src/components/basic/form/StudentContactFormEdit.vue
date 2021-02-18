<template>
  <v-form v-model="valid" ref="form" v-bind="this.$attrs">
    <p class="text-subtitle-2">2. Thông tin liên lạc</p>
    <v-row class="pr-12">
      <v-col class="d-flex py-0" cols="12">
        <v-subheader class="px-0">Địa chỉ</v-subheader>
        <v-text-field
          :outlined="edit"
          hide-details
          v-model="currentLive"
          dense
        ></v-text-field>
      </v-col>
      <v-col class="py-0 d-flex" cols="12">
        <v-subheader class="px-0">Quận/huyện</v-subheader>
        <v-text-field
          :outlined="edit"
          hide-details
          v-model="district"
          dense
        ></v-text-field>
      </v-col>
      <v-col class="py-0 d-flex" cols="12">
        <v-subheader class="px-0">Tỉnh/thành phố</v-subheader>
        <v-text-field
          :outlined="edit"
          hide-details
          v-model="province"
          dense
        ></v-text-field>
      </v-col>
      <v-col class="py-0 d-flex" cols="12">
        <v-subheader class="px-0">Số điện thoại</v-subheader>
        <v-text-field
          :outlined="edit"
          hide-details
          v-model="phone"
          dense
        ></v-text-field>
      </v-col>
      <v-col class="py-0 d-flex" cols="12">
        <v-subheader class="px-0">Email</v-subheader>
        <v-text-field
          :outlined="edit"
          hide-details
          v-model="email"
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
      default: () => {},
    },
    edit: Boolean,
  },
  data: () => ({
    valid: true,
    currentLive: '',
    province: '',
    district: '',
    phone: '',
    email: '',
    rules: {
      required: (value) => !!value || 'Required.',
      min: (v) => v.length >= 6 || 'Min 8 characters',
      email: (v) => /.+@.+/.test(v) || 'E-mail must be valid',
    },
  }),
  created() {
    if (this.student) {
      this.currentLive = this.student.data.currentLive
      this.province = this.student.data.province
      this.district = this.student.data.district
      this.phone = this.student.phone
      this.email = this.student.email
    }
  },
  methods: {
    validate() {
      return this.$refs.form.validate()
    },
    getData() {
      return {
        currentLive: this.currentLive,
        province: this.province,
        district: this.district,
        phone: this.phone,
        email: this.email,
      }
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
