<template>
  <v-form v-model="valid" ref="form">
    <v-row>
      <v-col cols="12" md="6">
          <v-text-field
          ref="company"
          dense
          v-model="company"
          label="Công Ty"
          placeholder="Nhập tên công ty"
          outlined
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          ref="companyRole"
          dense
          outlined
          v-model="companyRole"
          label="Cấp bậc"
          placeholder="Nhập cấp bậc"
          required
        ></v-text-field>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
export default {
  props: {
    work: Object
  },
  data: () => ({
    valid: true,
    company: '',
    companyRole: ''
  }),
  created () {
    this.reset()
  },
  methods: {
    validate () {
      this.$refs.form.validate()
    },
    reset () {
      if (this.work) {
        this.company = this.work.company
        this.companyRole = this.work.companyRole
      } else {
        this.company = ''
        this.companyRole = ''
      }
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    },
    getData () {
      return {
        company: this.company,
        companyRole: this.companyRole
      }
    }
  },
  watch: {
    work () {
      this.reset()
    }
  }
}
</script>

<style scoped>
</style>
