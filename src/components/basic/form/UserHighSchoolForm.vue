<template>
  <v-form v-model="valid" ref="form">
    <v-row>
      <v-col cols="12" md="6">
        <v-text-field
          ref="highSchool"
          dense
          outlined
          v-model="highSchool"
          label="Trường Cấp 3"
          placeholder="Nhập tên trường học"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          ref="highSchoolGeneration"
          dense
          outlined
          v-model="highSchoolGeneration"
          label="Niên Khóa"
          placeholder="Nhập niên khóa học"
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-text-field
          ref="highSchoolAddress"
          dense
          v-model="highSchoolAddress"
          label="Địa chỉ trường"
          placeholder="Nhập địa chỉ trường"
          required
          outlined
        ></v-text-field>
      </v-col>
    </v-row>    
  </v-form>
</template>

<script>
export default {
  props: {
    student: {
      type: [Object],
      required: true,
      default: () => {}
    }
  },
  data: () => ({
    valid: true,
    highSchool: '',
    highSchoolGeneration: '',
    achievements: '',
    highSchoolAddress: ''
  }),
  created () {
    this.reset()
  },
  methods: {
    validate () {
      this.$refs.form.validate()
    },
    reset () {
      this.highSchool = this.student.data.highSchool
      this.highSchoolGeneration = this.student.data.highSchoolGeneration
      this.highSchoolAddress = this.student.data.highSchoolAddress
      this.achievements = this.student.data.achievements
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    },
    getData () {
      return {
        highSchool: this.highSchool,
        highSchoolGeneration: this.highSchoolGeneration,
        highSchoolAddress: this.highSchoolAddress,
        achievements: this.achievements
      }
    }
  },
  watch: {
    student (student) {
      this.reset()
    }
  }
}
</script>

<style scoped>
</style>
