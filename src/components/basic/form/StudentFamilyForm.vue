<template>
  <v-form v-model="valid" ref="form">
    <v-row>
      <v-col cols="12" md="6">
        <h4 class="my-4">Bố</h4>
        <v-text-field
          ref="dadName"
          v-model="dadName"
          label="Họ Và Tên Bố"
          placeholder="Nhập họ và tên bố"
          outlined
          dense
          required
        ></v-text-field>
        <v-text-field
          ref="dadPhone"
          v-model="dadPhone"
          label="Số điện thoại bố"
          placeholder="Nhập số điện thoại bố"
          required
          outlined
          dense
        ></v-text-field>
        <v-text-field
          ref="dadEmail"
          v-model="dadEmail"
          label="Email Bố"
          placeholder="Nhập email bố"
          outlined
          dense
        ></v-text-field>
      </v-col>
    
      <v-col cols="12" md="6">
        <h4 class="my-4">Mẹ</h4>
        <v-text-field
          ref="momName"
          v-model="momName"
          label="Họ Và Tên Mẹ"
          placeholder="Nhập họ và tên mẹ"
          required
          outlined
          dense
        ></v-text-field>
        <v-text-field
          ref="momPhone"
          v-model="momPhone"
          label="Số Điện Thoại Mẹ"
          placeholder="Nhập số điện thoại mẹ"
          required
          dense
          outlined
        ></v-text-field>
        <v-text-field
          ref="momEmail"
          v-model="momEmail"
          label="Email Mẹ"
          placeholder="Nhập email mẹ"
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
      required: true,
      default: () => {}
    }
  },
  data: () => ({
    valid: true,
    dadName: '',
    dadEmail: '',
    dadPhone: '',
    momName: '',
    momEmail: '',
    momPhone: ''
  }),
  created () {
    this.reset()
  },
  methods: {
    validate () {
      this.$refs.form.validate()
    },
    reset () {
      this.dadName = this.student.data.dadName
      this.dadEmail = this.student.data.dadEmail
      this.dadPhone = this.student.data.dadPhone
      this.momName = this.student.data.momName
      this.momEmail = this.student.data.momEmail
      this.momPhone = this.student.data.momPhone
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    },
    getData () {
      return {
        dadName: this.dadName,
        dadEmail: this.dadEmail,
        dadPhone: this.dadPhone,
        momName: this.momName,
        momEmail: this.momEmail,
        momPhone: this.momPhone
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
