<template>
  <v-form v-model="valid" ref="form">
    <v-row>
      <v-col cols="12" md="6">
        <v-text-field
          ref="university"
          dense
          v-model="university"
          label="Trường Đại Học"
          placeholder="Nhập tên trường đại học"
          outlined
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          ref="universityGeneration"
          dense
          outlined
          v-model="universityGeneration"
          label="Chuyên Ngành"
          placeholder="Nhập Chuyên Ngành"
        ></v-text-field>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
export default {
  props: {
    data: Object
  },
  data: () => ({
    valid: true,
    university: '',
    universityGeneration: '',
    achievements: '',
    universityAddress: ''
  }),
  created () {
    this.reset()
  },
  methods: {
    validate () {
      this.$refs.form.validate()
    },
    reset () {
      if (this.data) {
        this.university = this.data.university
        this.universityGeneration = this.data.universityGeneration
        this.universityAddress = this.data.universityAddress
        this.achievements = this.data.achievements
      } else {
        this.university = ''
        this.universityGeneration = ''
        this.universityAddress = ''
        this.achievements = ''
      }
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    },
    getData () {
      return {
        university: this.university,
        universityGeneration: this.universityGeneration,
        universityAddress: this.universityAddress,
        achievements: this.achievements
      }
    }
  },
  watch: {
    data () {
      this.reset()
    }
  }
}
</script>
