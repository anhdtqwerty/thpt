<template>
  <v-form ref="form" flat>
    <v-layout class="pt-4" v-if="lead">
      <v-flex 4 md sm4>
        <v-simple-table>
          <template v-slot:default>
            <tbody>
              <tr>
                <td class="text-right">Hóa Đơn:</td>
                <td>{{lead.code}}</td>
              </tr>
              <tr>
                <td class="text-right">Người Nộp Tiền:</td>
                <td>{{lead.customerName}}</td>
              </tr>
              <tr>
                <td class="text-right">Người Thu Tiền:</td>
                <td>{{lead.staff.name}}</td>
              </tr>
              <!-- <tr>
                <td class="text-right">Thời Gian:</td>
                <td>{{lead.createdAt | familiarizeDate}}</td>
              </tr>-->
            </tbody>
          </template>
        </v-simple-table>
      </v-flex>
      <v-flex md4 sm4>
        <v-simple-table>
          <template v-slot:default>
            <tbody>
              <!-- <tr>
                <td class="text-right">Trạng Thái:</td>
                <td>{{allLeadStatus[lead.status]}}</td>
              </tr>-->
              <!-- <tr>
                <td class="text-right">Người Thu Tiền:</td>
                <td>{{lead.staff.name}}</td>
              </tr>-->
              <!-- <tr>
                <td class="text-right">Loại Thanh Toán:</td>
                <td>{{allPaymentTypes[lead.payemntType]}}</td>
              </tr>-->
            </tbody>
          </template>
        </v-simple-table>
      </v-flex>
      <v-flex md4 sm4>
        <v-textarea
          v-if="lead.notes"
          outlined
          label="Ghi chú"
          height="100"
          disabled
          :value="lead.notes"
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
    lead: Object
  },
  data: () => ({
    valid: true
  }),
  computed: {
    ...mapGetters('constant', ['leadStatus', 'paymentTypes']),
    allLeadStatus () {
      return this.leadStatus.reduce(
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
      if (this.lead) {
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
td {
  border: none !important;
  padding: 4px 8px !important;
  height: auto;
}
</style>
