<template>
  <v-form v-model="valid" ref="form" v-bind="this.$attrs">
    <v-row>
      <v-col cols="12">
        <v-text-field
          ref="type"
          v-model="type"
          placeholder="Loại cán bộ"
          required
          dense
        ></v-text-field>
        <v-text-field
          ref="type"
          v-model="schoolDate"
          placeholder="Năm vào trường"
          required
          dense
        ></v-text-field>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
// import { get } from 'lodash'
import DatePicker from '@/components/basic/picker/DateIOSPicker.vue'
export default {
  components: { DatePicker },
  props: {
    student: {
      type: [Object],
      required: true,
      default: () => {},
    },
  },
  data: () => ({
    valid: true,
    name: '',
    gender: '',
    dob: '',
    ethnic: '',
    frequentlyAddress: '',
  }),
  created() {
    this.reset()
  },
  methods: {
    getData() {
      return {
        name: this.name,
        gender: this.gender,
        dob: this.dob,
        ethnic: this.ethnic,
        frequentlyAddress: this.frequentlyAddress,
      }
    },
    validate() {
      this.$refs.form.validate()
    },
    reset() {
      this.name = this.student.name
      this.gender = this.student.gender
      this.dob = this.student.dob
      this.ethnic = this.student.data.ethnic
      this.frequentlyAddress = this.student.data.frequentlyAddress
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
