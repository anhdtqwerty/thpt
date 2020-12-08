<template>
  <v-form v-model="valid" ref="form">
    <v-text-field ref="name" dense v-model="name" label="Tên CSVC" placeholder="Nhập tên" required></v-text-field>
    <v-text-field ref="code" dense v-model="code" label="Mã CSVC" disabled></v-text-field>
    <v-select
      ref="status"
      dense
      v-model="status"
      item-text="title"
      item-value="status"
      :items="bookStatus"
      disabled
      label="Tình Trạng"
    ></v-select>
    <v-select
      ref="type"
      dense
      v-model="type"
      item-text="title"
      item-value="status"
      :items="bookTypes"
      label="Loại"
    ></v-select>
    <currency-input dense v-model="price" label="Giá Sản Phẩm" placeholder="Nhập giá"></currency-input>
  </v-form>
</template>

<script>
import CurrencyInput from '@/components/basic/input/CurrencyInput.vue'
import { mapState } from 'vuex'

import moment from 'moment'
export default {
  components: { CurrencyInput },
  props: {
    book: Object
  },
  data: () => ({
    valid: true,
    name: '',
    status: 'inventory',
    price: '',
    type: '',
    code: moment().format('YYYYDDMM') + Math.floor(Math.random() * 1000)
  }),
  created () {
    this.reset()
  },
  computed: {
    ...mapState('constant', ['bookStatus', 'bookTypes'])
  },
  methods: {
    validate () {
      this.$refs.form.validate()
    },
    reset () {
      if (this.book) {
        this.code = this.book.code
        this.name = this.book.name
        this.price = this.book.price
        this.status = this.book.status
        this.type = this.book.type
      } else {
        this.code =
          moment().format('YYYYDDMM') + Math.floor(Math.random() * 1000)
        this.name = ''
        this.price = 0
        this.type = ''
        this.status = 'inventory'
      }
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    },
    getData () {
      return {
        name: this.name,
        price: this.price,
        status: this.status,
        type: this.type,
        code: this.code
      }
    }
  },
  watch: {
    book () {
      this.reset()
    }
  }
}
</script>

<style scoped>
</style>
