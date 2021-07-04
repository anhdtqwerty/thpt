<template>
  <v-form ref="form" v-model="valid">
    <currency-input outlined v-model="customerPaid" label="Nhập số tiền khách trả" dense class="py-2"></currency-input>
    <autocomplete-student
      v-model="student"
      label="Tìm kiếm học sinh"
      outlined
      dense
      return-object
      @change="selectStudent"
      class="pb-4"
    />
    <v-text-field v-model="customerName" label="Họ Tên Người Nộp Tiền" outlined dense></v-text-field>
    <v-text-field v-model="customerPhone" label="SDT Người Nộp Tiền" outlined dense></v-text-field>
    <date-picker label="Chọn Ngày" outlined dense></date-picker>
    <v-select
      v-model="paymentType"
      :items="paymentTypes"
      outlined
      dense
      label="Hình thức thanh toán"
      item-text="title"
      item-value="status"
    ></v-select>
    <v-textarea outlined full-width no-resize label="Ghi chú" v-model="notes" dense :height="45"></v-textarea>
  </v-form>
</template>
<script>
import { mapState } from 'vuex'
import CurrencyInput from '@/components/basic/input/CurrencyInput.vue'
import AutocompleteStudent from '@/components/basic/input/AutocompleteStudent.vue'
import DatePicker from '@/components/basic/picker/DateIOSPicker.vue'
import { get } from 'lodash'
export default {
  components: { CurrencyInput, AutocompleteStudent, DatePicker },
  props: {},
  data() {
    return {
      valid: true,
      date: new Date().toISOString(),
      notes: '',
      student: null,
      customerName: '',
      customerPhone: '',
      paymentType: 'cash',
      customerPaid: 0
    }
  },
  created() {},
  computed: {
    ...mapState('constant', ['billStatus', 'paymentTypes'])
  },
  methods: {
    selectStudent(student) {
      this.student = student
      this.customerName = student.name
      this.customerPhone = student.phone
    },
    getValues() {
      return {
        notes: this.notes,
        student: get(this.student, 'id'),
        paymentType: this.paymentType,
        customerPaid: parseInt(this.customerPaid),
        customerName: this.customerName,
        customerPhone: this.customerPhone,
        date: this.date,
        code: 'HD-' + Math.round(Date.now() / 1000)
      }
    },
    save() {
      this.$emit('save', this.getValues())
    },
    reset() {
      this.student = null
      this.customerName = ''
      this.customerPhone = ''
      this.date = new Date().toISOString()
      this.notes = ''
      this.paymentType = 'cash'
      this.customerPaid = 0
    }
  },
  watch: {}
}
</script>
<style scoped>
.nowrap {
  white-space: nowrap;
}
td {
  padding-left: 0 !important;
}
.v-text-field {
}
</style>
