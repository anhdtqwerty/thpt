<template>
  <v-form v-model="valid" ref="form" v-bind="this.$attrs">
    <v-row>
      <v-col cols="12">
        <v-text-field
          ref="level"
          v-model="level"
          label="Trình độ"
          outlined
          dense
        ></v-text-field>
        <v-text-field
          ref="subject"
          v-model="subject"
          label="Lĩnh vực"
          outlined
          dense
        ></v-text-field>
        <v-text-field
          ref="trainingPlace"
          v-model="trainingPlace"
          label="Nơi đào tạo"
          outlined
          dense
        ></v-text-field>
        <v-text-field
          ref="majorDate"
          v-model="majorDate"
          label="Năm vào ngành"
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
      default: () => {}
    }
  },
  data: () => ({
    valid: true,
    level: '',
    subject: '',
    trainingPlace: '',
    majorDate: '',
    rules: {
      required: value => !!value || 'Required.',
      min: v => v.length >= 6 || 'Min 8 characters',
      email: v => /.+@.+/.test(v) || 'E-mail must be valid'
    }
  }),
  created() {
    if (this.teacher) {
      this.level = this.teacher.metadata.level
      this.subject = this.teacher.subject
      this.trainingPlace = this.teacher.metadata.trainingPlace
      this.majorDate = this.teacher.metadata.majorDate
    } else {
      this.reset()
    }
  },
  methods: {
    getData() {
      return {
        level: this.level,
        subject: this.subject,
        trainingPlace: this.trainingPlace,
        majorDate: this.majorDate
      }
    },
    validate() {
      return this.$refs.form.validate()
    },
    reset() {
      // this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    }
  },
  watch: {
    teacher(teacher) {
      this.reset()
    }
  }
}
</script>
