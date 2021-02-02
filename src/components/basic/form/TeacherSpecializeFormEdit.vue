<template>
  <v-form v-model="valid" ref="form" v-bind="this.$attrs">
    <p class="text-subtitle-2 mb-0">4. Thông tin chuyên môn</p>
    <v-row class="pr-12">
      <v-col class="d-flex pb-0" cols="12">
        <v-subheader class="px-0">Trình độ</v-subheader>
        <v-text-field
          hide-details
          :outlined="edit"
          v-model="level"
          dense
        ></v-text-field>
      </v-col>
      <v-col class="d-flex pb-0" cols="12">
        <v-subheader class="px-0">Lĩnh vực</v-subheader>
        <v-text-field
          hide-details
          :outlined="edit"
          v-model="subject"
          dense
        ></v-text-field>
      </v-col>
      <v-col class="d-flex pb-0" cols="12">
        <v-subheader class="px-0">Nơi đào tạo</v-subheader>
        <v-text-field
          hide-details
          :outlined="edit"
          v-model="trainingPlace"
          dense
        ></v-text-field>
      </v-col>
      <v-col class="d-flex pb-0" cols="12">
        <v-subheader class="px-0">Năm vào ngành</v-subheader>
        <v-text-field
          hide-details
          :outlined="edit"
          v-model="majorDate"
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
    edit: Boolean
  },
  data: () => ({
    valid: true,
    level: '',
    subject: '',
    trainingPlace: '',
    majorDate: '',
    rules: {
      required: (value) => !!value || 'Required.',
      min: (v) => v.length >= 6 || 'Min 8 characters',
      email: (v) => /.+@.+/.test(v) || 'E-mail must be valid',
    },
  }),
  created() {
    if (this.teacher) {
      this.level = this.teacher.metadata.level
      this.subject = this.teacher.subject
      this.trainingPlace = this.teacher.metadata.trainingPlace
      this.majorDate = this.teacher.metadata.majorDate
    }
  },
  methods: {
    getData() {
      return {
        level: this.level,
        subject: this.subject,
        trainingPlace: this.trainingPlace,
        majorDate: this.majorDate,
      }
    },
    validate() {
      return this.$refs.form.validate()
    },
    reset() {
      this.$refs.form.reset()
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
.v-subheader {
  width: 30%;
}
</style>
