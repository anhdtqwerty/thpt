<template>
  <v-form ref="form" flat>
    <v-layout class="pt-4" v-if="bill">
      <v-flex 4 md sm4>
        <v-simple-table>
          <template v-slot:default>
            <tbody>
              <tr>
                <td>Hóa Đơn:</td>
                <td>
                  <router-link v-if="bill.requestor" :to="'/bill/' + bill.id">{{bill.title}}</router-link>
                </td>
              </tr>
              <tr>
                <td>Thời Gian:</td>
                <td>{{bill.createdAt | familiarizeDate}}</td>
              </tr>
              <tr>
                <td>Khách Hàng:</td>
                <td>{{bill.customerName}}</td>
              </tr>
              <tr>
                <td>Chi Nhánh:</td>
                <td>{{bill.department.title}}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-flex>
      <v-flex md4 sm4>
        <v-simple-table>
          <template v-slot:default>
            <tbody>
              <tr>
                <td>Trạng Thái:</td>
                <td>{{allBillStatus[bill.status]}}</td>
              </tr>
              <tr>
                <td>Người Bán:</td>
                <td>
                  <router-link
                    v-if="bill.requestor"
                    :to="'/staff/' + bill.requestor.id"
                  >{{bill.requestor.name}}</router-link>
                </td>
              </tr>
              <tr>
                <td>Khênh bán:</td>
                <td>{{bill.provider}}</td>
              </tr>
              <tr>
                <td>Loại Thanh Toán:</td>
                <td>{{allPaymentTypes[bill.payemntType]}}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-flex>
      <v-flex md4 sm4>
        <v-textarea
          outlined
          name="input-7-4"
          label="Ghi chú"
          value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
        ></v-textarea>
      </v-flex>
    </v-layout>
  </v-form>
</template>
<script>
import moment from 'moment'
import { mapGetters } from 'vuex'
export default {
  components: {},
  props: {
    bill: Object
  },
  data: () => ({
    valid: true
  }),
  computed: {
    ...mapGetters('constant', ['billStatus', 'billTypes', 'paymentTypes']),
    allBillStatus () {
      return this.billStatus.reduce(
        (data, curent) => ({
          ...data,
          [curent.status]: curent['title']
        }),
        {}
      )
    },
    allPaymentTypes () {
      return this.paymentTypes.reduce(
        (data, curent) => ({
          ...data,
          [curent.status]: curent['title']
        }),
        {}
      )
    }
  },
  methods: {
    reset () {
      this.$refs.form.reset()
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    },
    save () {
      if (this.$refs.form.validate()) {
        this.$emit('save', {})
      }
    },
    cancel () {
      this.resetDefault()
      this.$emit('cancel')
    },
    resetDefault () {
      if (this.bill) {
      } else {
      }
    }
  },
  created () {
    this.resetDefault()
  },
  filters: {
    familiarizeDate: time => {
      if (!time) {
        return 'None'
      }
      return moment(time).format(' DD/MM hh:mm')
    }
  }
}
</script>

<style scoped>
</style>
