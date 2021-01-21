<template>
  <v-form v-model="valid" ref="form" v-bind="this.$attrs">
    <v-row>
      <v-col class="pb-0" cols="12" md="6">
        <v-text-field
          ref="dadName"
          v-model="dadName"
          label="Họ Và Tên Bố"
          outlined
          dense
        ></v-text-field>
      </v-col>
      <v-col class="pb-0" cols="12" md="6">
        <v-text-field
          ref="dadPhone"
          v-model="dadPhone"
          label="Số điện thoại bố"
          outlined
          dense
        ></v-text-field>
      </v-col>
      <v-col class="py-0" cols="12" md="6">
        <v-text-field
          ref="dadEmail"
          v-model="dadEmail"
          label="Email Bố"
          dense
          outlined
        ></v-text-field>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row class="mt-1">
      <v-col class="pb-0" cols="12" md="6">
        <v-text-field
          ref="momName"
          v-model="momName"
          label="Họ Và Tên Mẹ"
          outlined
          dense
        ></v-text-field>
      </v-col>
      <v-col class="pb-0" cols="12" md="6">
        <v-text-field
          ref="momPhone"
          v-model="momPhone"
          label="Số Điện Thoại Mẹ"
          outlined
          dense
        ></v-text-field>
      </v-col>
      <v-col class="py-0" cols="12" md="6">
        <v-text-field
          ref="momEmail"
          v-model="momEmail"
          label="Email Mẹ"
          outlined
          dense
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
      default: () => {},
    },
  },
  data: () => ({
    valid: true,
    dadName: '',
    dadEmail: '',
    dadPhone: '',
    momName: '',
    momEmail: '',
    momPhone: '',
    rules: {
      required: (value) => !!value || 'Required.',
      min: (v) => v.length >= 6 || 'Min 8 characters',
      email: (v) => /.+@.+/.test(v) || 'E-mail must be valid',
    },
  }),
  created() {
    if (this.student) {
      this.dadName = this.student.data.dadName
      this.dadEmail = this.student.data.dadEmail
      this.dadPhone = this.student.data.dadPhone
      this.momName = this.student.data.momName
      this.momEmail = this.student.data.momEmail
      this.momPhone = this.student.data.momPhone
    }
  },
  methods: {
    validate() {
      this.$refs.form.validate()
    },
    getData() {
      return {
        dadName: this.dadName,
        dadEmail: this.dadEmail,
        dadPhone: this.dadPhone,
        momPhone: this.momPhone,
        momName: this.momName,
        momEmail: this.momEmail,
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
</style>
