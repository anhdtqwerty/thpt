<template>
  <v-form v-model="valid" ref="form">
    <v-text-field
      ref="title"
      dense
      v-model="title"
      label="Tên Sản Phẩm"
      placeholder="Nhập tên sản phẩm"
      required
      outlined
    ></v-text-field>
    <v-text-field
      outlined
      ref="code"
      dense
      v-model="code"
      label="Mã Sản Phẩm"
      disabled
    ></v-text-field>
    <currency-input
      dense
      v-model="price"
      label="Giá Sản Phẩm"
      placeholder="Nhập giá sản phẩm"
    ></currency-input>

    <v-text-field
      outlined
      ref="type"
      dense
      v-model="type"
      label="Phân Loại Sản Phẩm"
    ></v-text-field>
  </v-form>
</template>

<script>
import CurrencyInput from '@/components/basic/input/CurrencyInput.vue'
import moment from 'moment'
export default {
  components: { CurrencyInput },
  data: () => ({
    valid: true,
    title: '',
    price: '',
    type: '',
    code: 'SP' + moment().format('YYYYDDMM') + Math.floor(Math.random() * 1000),
  }),
  created() {
    this.reset()
  },
  methods: {
    validate() {
      this.$refs.form.validate()
    },
    reset() {
      this.code = moment().format('YYYYDDMM') + Math.floor(Math.random() * 1000)
      this.title = ''
      this.price = 0
      this.type = ''
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
    getData() {
      return {
        title: this.title,
        price: this.price,
        type: this.type,
        code: this.code,
      }
    },
  },
}
</script>

<style scoped>
</style>
