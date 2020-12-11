<template>
  <v-form v-model="valid" ref="form">
    <v-row no-gutters>
      <v-col class="pl-0" cols="12" md="6">
        <h4>Bố</h4>
        <v-text-field
          ref="dadName"
          v-model="dadName"
          label="Họ Và Tên Bố"
          placeholder="Nhập họ và tên bố"
          dense
        ></v-text-field>
        <v-text-field
          ref="dadPhone"
          v-model="dadPhone"
          label="Số điện thoại bố"
          placeholder="Nhập số điện thoại bố"
          dense
        ></v-text-field>
        <v-text-field
          ref="dadEmail"
          v-model="dadEmail"
          label="Email Bố"
          placeholder="Nhập email bố"
          dense
        ></v-text-field>
      </v-col>
      <v-col class="pl-2" cols="12" md="6">
        <h4>Mẹ</h4>
        <v-text-field
          ref="momName"
          v-model="momName"
          label="Họ Và Tên Mẹ"
          placeholder="Nhập họ và tên mẹ"
          dense
        ></v-text-field>
        <v-text-field
          ref="momPhone"
          v-model="momPhone"
          label="Số Điện Thoại Mẹ"
          placeholder="Nhập số điện thoại mẹ"
          dense
        ></v-text-field>
        <v-text-field
          ref="momEmail"
          v-model="momEmail"
          label="Email Mẹ"
          placeholder="Nhập email mẹ"
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
      required: true,
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
  }),
  created() {
    this.reset()
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
      this.dadName = this.student.data.dadName
      this.dadEmail = this.student.data.dadEmail
      this.dadPhone = this.student.data.dadPhone
      this.momName = this.student.data.momName
      this.momEmail = this.student.data.momEmail
      this.momPhone = this.student.data.momPhone
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
h4 {
  margin-bottom: 10px;
}
</style>
