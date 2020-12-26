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
          ref="district"
          v-model="district"
          label="Quận/Huyện"
          placeholder="Nhập quận/huyện đang sống"
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
    student: {
      type: [Object],
      default: () => {},
    },
  },
  data: () => ({
    valid: true,
    currentLive: '',
    province: '',
    district: '',
  }),
  created() {
    if (this.student) {
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
        district: this.district,
      }
    },
    reset() {
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
