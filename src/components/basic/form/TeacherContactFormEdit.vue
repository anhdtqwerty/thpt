<template>
  <v-form v-model="valid" ref="form" v-bind="this.$attrs">
    <p class="text-subtitle-2 mb-0">3. Thông tin liên lạc</p>
    <v-row class="pr-12">
      <v-col class="d-flex pb-0" cols="12">
        <v-subheader class="px-0">Địa chỉ hiện tại</v-subheader>
        <v-text-field
          hide-details
          :outlined="edit"
          v-model="currentLive"
          dense
        ></v-text-field>
      </v-col>
      <v-col class="d-flex pb-0" cols="12">
        <v-subheader class="px-0">Tỉnh/thành phố</v-subheader>
        <v-text-field
          hide-details
          :outlined="edit"
          v-model="province"
          dense
        ></v-text-field>
      </v-col>
      <v-col class="d-flex pb-0" cols="12">
        <v-subheader class="px-0">Điện thoại nhà riêng</v-subheader>
        <v-text-field
          hide-details
          :outlined="edit"
          v-model="landlinePhone"
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
    edit: Boolean,
  },
  data: () => ({
    valid: true,
    currentLive: '',
    province: '',
    mobilePhone: '',
    landlinePhone: '',
    rules: {
      required: (value) => !!value || 'Required.',
      min: (v) => v.length >= 6 || 'Min 8 characters',
      email: (v) => /.+@.+/.test(v) || 'E-mail must be valid',
    },
  }),
  created() {
    this.currentLive = this.teacher.metadata.currentLive
    this.province = this.teacher.metadata.province
    this.mobilePhone = this.teacher.metadata.mobilePhone
    this.landlinePhone = this.teacher.metadata.landlinePhone
  },
  methods: {
    validate() {
      return this.$refs.form.validate()
    },
    getData() {
      return {
        currentLive: this.currentLive,
        province: this.province,
        mobilePhone: this.mobilePhone,
        landlinePhone: this.landlinePhone,
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
