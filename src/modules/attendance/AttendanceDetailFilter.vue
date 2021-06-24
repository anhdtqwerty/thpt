<template>
  <v-card class="ma-4 pa-4" outlined>
    <v-row>
      <v-col cols="12" md="10">
        <v-row>
          <v-col cols="12" md="6">
            <DateIOSPicker
              label="Từ ngày"
              outlined
              dense
              hide-details
              outline
              :date.sync="dateFrom"
              @onEnterPress="onFilterChanged"
            />
          </v-col>
          <v-col cols="12" md="6" v-bind="$attrs">
            <DateIOSPicker
              label="Đến ngày"
              outlined
              dense
              hide-details
              outline
              :date.sync="dateTo"
              @onEnterPress="onFilterChanged"
            />
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="2">
        <v-btn class="pa-2" height="40" color="#0D47A1" outlined @click="onFilterChanged">
          Tìm kiếm
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import DateIOSPicker from '@/components/basic/picker/DateIOSPicker.vue'
import moment from 'moment'
import { mapState } from 'vuex'

export default {
  components: { DateIOSPicker },
  data() {
    return {
      dateFrom: '',
      dateTo: '',
      dateData_gte: '',
      dateData_lte: ''
    }
  },
  computed: {},
  methods: {
    onFilterChanged() {
      if (this.dateFrom && this.dateTo) {
        this.dateData_gte = moment(this.dateFrom)
          .startOf('day')
          .toISOString()
        this.dateData_lte = moment(this.dateTo)
          .endOf('day')
          .toISOString()
      } else if (this.dateFrom) {
        this.dateData_gte = moment(this.dateFrom)
          .startOf('day')
          .toISOString()
        this.dateData_lte = moment().toISOString()
      } else if (this.dateTo) {
        this.dateData_lte = moment(this.dateTo)
          .endOf('day')
          .toISOString()
      }

      this.$emit('onFilterChanged', { createdAt_gte: this.dateData_gte, createdAt_lte: this.dateData_lte })
    }
  }
}
</script>

<style></style>
