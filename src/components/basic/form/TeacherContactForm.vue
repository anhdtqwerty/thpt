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
          outlined
          dense
        ></v-text-field>
        <v-text-field
          ref="province"
          v-model="province"
          label="Tỉnh/Thành phố"
          placeholder="Nhập tỉnh/thành phố đang sống"
          required
          outlined
          dense
        ></v-text-field>
        <v-text-field
          ref="email"
          v-model="email"
          label="Địa chỉ email"
          placeholder="Nhập địa chỉ email"
          outlined
          dense
        ></v-text-field>
        <v-text-field
          ref="mobilePhone"
          v-model="phone"
          label="Điện thoại di động"
          placeholder="Điện thoại di động"
          required
          outlined
          dense
        ></v-text-field>
        <v-text-field
          ref="landlinePhone"
          v-model="phone"
          label="Điện thoại nhà riêng"
          placeholder="Điện thoại nhà riêng"
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
export default {
  props: {
    teacher: {
      type: [Object],
      default: () => {},
    },
  },
  data: () => ({
    valid: true,
    currentLive: '',
    province: '',
    email: '',
    mobilePhone: '',
    landlinePhone: '',
  }),
  created() {
    if (this.teacher) {
      this.reset()
    }
  },
  methods: {
    validate() {
      this.$refs.form.validate()
    },
    getData() {
      return {
        currentLive: this.teacher.metadata.currentLive,
        province: this.teacher.metadata.province,
        email: this.teacher.email,
        mobilePhone: this.teacher.metadata.mobilePhone,
        landlinePhone: this.teacher.metadata.landlinePhone,
      }
    },
    reset() {
      this.currentLive = this.teacer.metadata.currentLive
      this.province = this.teacher.metadata.province
      this.email = this.teacher.email
      this.mobilePhone = this.teacher.metadata.mobilePhone
      this.landlinePhone = this.teacher.metadata.landlinePhone
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

<style scoped>
</style>
