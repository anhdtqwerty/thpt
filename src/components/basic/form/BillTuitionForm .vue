<template>
  <v-form ref="form" v-model="valid">
    <currency-input
      dense
      v-model="customerPaid"
      label="Số tiền nộp"
    ></currency-input>
    <v-text-field outlined :value="student.name" label="Người Nộp Tiền" dense></v-text-field><!-- disabled  -->
    <v-text-field outlined :value="student.phone" label="Số điện thoại" dense></v-text-field>
    <date-picker :date.sync="date" label="Ngày nộp tiền" placeholder="" dense></date-picker>
    <v-select
      outlined
      v-model="paymentType"
      :items="paymentTypes"
      dense
      label="Hình thức thanh toán"
      item-text="title"
      item-value="status"
    ></v-select>
    <v-textarea
      outlined
      full-width
      no-resize
      placeholder="Ghi chú"
      v-model="notes"
      dense
      :height="40"
    ></v-textarea>
  </v-form>
</template>
<script>
import { mapState } from 'vuex'
import CurrencyInput from '@/components/basic/input/CurrencyInput.vue'
import DatePicker from '@/components/basic/picker/DateIOSPicker.vue'
export default {
  components: { CurrencyInput, DatePicker },
  props: {
    lead: {},
    student: {}
  },
  data () {
    return {
      valid: true,
      date: new Date().toISOString(),
      notes: '',
      paymentType: 'cash',
      customerPaid: 0
    }
  },
  created () {
    this.reset()
  },
  computed: {
    ...mapState('constant', ['billStatus', 'paymentTypes'])
  },
  methods: {
    getValues () {
      return {
        notes: this.notes,
        tags: this.notes,
        student: this.student.id,
        paymentType: this.paymentType,
        customerPaid: parseInt(this.customerPaid),
        customerName: this.student.name,
        customerPhone: this.student.phone,
        date: this.date,
        type: 'tuition',
        code: 'HD-' + Math.round(Date.now() / 1000)
      }
    },
    reset () {
      this.date = new Date().toISOString()
      this.notes = ''
      this.type = 'tuition'
      this.tag = ''
      this.paymentType = 'cash'
      this.customerPaid = this.lead.liabilities
    }
  },
  watch: {
    lead () {
      this.reset()
    }
  }
}
</script>
<style scoped>
.nowrap {
  white-space: nowrap;
}
td {
  padding-left: 0 !important;
}
</style>
