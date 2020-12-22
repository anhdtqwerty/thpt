<template>
  <v-form v-model="valid" ref="form" v-bind="this.$attrs">
    <v-row>
      <v-col cols="12">
        <v-text-field
          ref="level"
          v-model="level"
          placeholder="Trình độ"
          required
          dense
        ></v-text-field>
        <v-text-field
          ref="subject"
          v-model="subject"
          placeholder="Lĩnh vực"
          required
          dense
        ></v-text-field>
        <v-text-field
          ref="trainingPlace"
          v-model="trainingPlace"
          placeholder="Nơi đào tạo"
          required
          dense
        ></v-text-field>
        <v-text-field
          ref="majorDate"
          v-model="majorDate"
          placeholder="Năm vào ngành"
          required
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
    level: '',
    subject: '',
    trainingPlace: '',
    majorDate: '',
  }),
  created() {
    this.reset()
  },
  methods: {
    getData() {
      return {
        level: this.teacher.metadata.level,
        subject: this.teacher.subject,
        trainingPlace: this.teacher.meatdata.trainingPlace,
        majorDate: this.teacher.metadata.majorDate,
      }
    },
    validate() {
      this.$refs.form.validate()
    },
    reset() {
      this.level = this.teacher.metadata.level
      this.subject = this.teacher.subject
      this.trainingPlace = this.teacher.meatdata.trainingPlace
      this.majorDate = this.teacher.metadata.majorDate
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
