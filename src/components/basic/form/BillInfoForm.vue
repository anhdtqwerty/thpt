<template>
  <v-form ref="form" flat>
    <div class="pt-4" v-if="bill">
      <v-row >
        <v-col cols="2"></v-col>
        <v-col cols="8">
          <v-simple-table>
          <template v-slot:default>
            <tbody>
              <tr>
                <td class="text-left font-weight-bold text-left">Mã Phiếu Thu:</td>
                <td class="font-weight-bold">{{bill.code}}</td>
              </tr>
              <tr>
                <td class="text-left font-weight-bold">Thời Gian:</td>
                <td class="font-weight-bold">{{bill.createdAt | familiarizeDate}}</td>
              </tr>
              <tr>
                <td class="text-left font-weight-bold">Người Nộp Tiền:</td>
                <td>{{bill.customerName}}</td>
              </tr>
              <tr>
                <td class="text-left font-weight-bold">Người Thu Tiền:</td>
                <td>{{bill.staff.name}}</td>
              </tr>
              <tr>
                <td class="text-left">Hình thức thanh toán:</td>
                <td>{{bill.paymentType}}</td>
              </tr>
              <tr>
                <td class="text-left">Tổng Tiền:</td>
                <td class="text-left font-weight-bold">{{bill.total | formatMoney}}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        </v-col>
      </v-row>
        
        <v-row >
          <v-col class="d-flex justify-center">
            <h5 cl>Người lập phiếu</h5>
          </v-col>
          <v-col class="d-flex justify-center">
            <div>
              <p>Hà Nội, ngày ... ... ...</p>
            </div>
          </v-col>
        </v-row>
    </div>
  </v-form>
</template>
<script>
import moment from 'moment'
import utils from '@/plugins/utils.js'
import { mapGetters } from 'vuex'
export default {
  components: {},
  props: {
    bill: Object,
  },
  data: () => ({
    valid: true,
  }),
  computed: {
    ...mapGetters('constant', ['billStatus', 'billTypes', 'paymentTypes']),
    allBillStatus() {
      return this.billStatus.reduce(
        (data, curent) => ({
          ...data,
          [curent.status]: curent['title'],
        }),
        {}
      )
    },
    allPaymentTypes() {
      return this.paymentTypes.reduce(
        (data, curent) => ({
          ...data,
          [curent.status]: curent['title'],
        }),
        {}
      )
    },
  },
  methods: {
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
    save() {
      if (this.$refs.form.validate()) {
        this.$emit('save', {})
      }
    },
    cancel() {
      this.resetDefault()
      this.$emit('cancel')
    },
    resetDefault() {
      if (this.bill) {
      } else {
      }
    },
  },
  created() {
    this.resetDefault()
  },
  filters: {
    familiarizeDate: (time) => {
      if (!time) {
        return 'None'
      }
      return moment(time).format(' DD/MM/YYYY hh:mm')
    },
    formatMoney(data) {
      return utils.formatMoney(data)
    },
  },
}
</script>

<style scoped>
td {
  width: 300px;
  border: 1px solid gray !important;
  padding: 4px 8px !important;
  height: auto;
}
</style>
