<template>
  <v-form v-model="valid" ref="form" v-bind="this.$attrs">
    <v-row>
      <v-col cols="12">
        <v-text-field
          ref="currentLive"
          v-model="currentLive"
          placeholder="Nhập địa chỉ hiện tại"
          required
          outlined
          dense
        ></v-text-field>
        <v-text-field
          ref="province"
          v-model="province"
          placeholder="Nhập tỉnh/thành phố đang sống"
          required
          outlined
          dense
        ></v-text-field>
        <v-text-field
          ref="email"
          v-model="email"
          placeholder="Nhập địa chỉ email"
          outlined
          dense
        ></v-text-field>
        <v-text-field
          ref="mobilePhone"
          v-model="mobilePhone"
          placeholder="Điện thoại di động"
          required
          outlined
          dense
        ></v-text-field>
        <v-text-field
          ref="landlinePhone"
          v-model="landlinePhone"
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
        currentLive: this.currentLive,
        province: this.province,
        email: this.email,
        mobilePhone: this.mobilePhone,
        landlinePhone: this.landlinePhone,
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
