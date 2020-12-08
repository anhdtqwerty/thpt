<template>
  <v-form v-model="valid" ref="form">
    <v-text-field dense outlined ref="name" v-model="name" label="Tên CSVC" placeholder="Nhập tên" required></v-text-field>
    <v-text-field dense outlined ref="code" v-model="code" label="Mã CSVC" disabled></v-text-field>
    <v-select
      ref="status"
      dense
      outlined
      v-model="status"
      item-text="title"
      item-value="status"
      :items="facilityStatus"
      disabled
      label="Tình Trạng"
    ></v-select>
    <v-select
      ref="type"
      dense
      outlined
      v-model="type"
      item-text="title"
      item-value="status"
      :items="facilityTypes"
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
    facility: Object
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
    ...mapState('constant', ['facilityStatus', 'facilityTypes'])
  },
  methods: {
    validate () {
      this.$refs.form.validate()
    },
    reset () {
      if (this.facility) {
        this.code = this.facility.code
        this.name = this.facility.name
        this.price = this.facility.price
        this.status = this.facility.status
        this.type = this.facility.type
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
    facility () {
      this.reset()
    }
  }
}
</script>

<style scoped>
</style>
