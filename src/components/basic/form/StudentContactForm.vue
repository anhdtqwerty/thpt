<template>
  <v-form v-model="valid" ref="form" v-bind="this.$attrs">
    <v-row>
      <v-col cols="12">
        <v-text-field
          v-model="currentLive"
          label="Địa chỉ liên lạc"
          outlined
          dense
          :rules="[rules.required]"
        ></v-text-field>
        <v-text-field
          v-model="province"
          label="Tỉnh/Thành phố"
          outlined
          dense
          :rules="[rules.required]"
        ></v-text-field>
        <v-text-field
          v-model="district"
          label="Quận/Huyện"
          outlined
          dense
          :rules="[rules.required]"
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
    rules: {
      required: (value) => !!value || 'Required.',
      min: (v) => v.length >= 6 || 'Min 8 characters',
      email: (v) => /.+@.+/.test(v) || 'E-mail must be valid',
    },
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
