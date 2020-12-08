<template>
  <v-menu
    v-bind="$attrs"
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    :return-value.sync="localDateRange"
    offset-y
    min-width="290px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        :value="dateRangeSorted.join('~')"
        v-on="on"
        dense
        v-bind="$attrs"
      ></v-text-field>
    </template>
    <v-date-picker color="#0D47A1" range locale="vi" v-model="localDateRange">
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
      <v-btn text color="primary" @click="$refs.menu.save(localDateRange)"
        >OK</v-btn
      >
    </v-date-picker>
  </v-menu>
</template>

<script>
import moment from 'moment'
export default {
  inheritAttrs: true,
  props: {
    dateRange: {
      type: Array,
      default() {
        return [
          new Date().toISOString().substr(0, 10),
          new Date().toISOString().substr(0, 10)
        ]
      }
    }
  },
  data: () => ({
    localDateRange: [],
    menu: false
  }),
  created() {
    this.localDateRange = this.dateRange
  },
  computed: {
    dateRangeSorted() {
      let dateRangeFormated = this.localDateRange
        .map(item => moment(item).format('DD/MM/YYYY'))
        .sort((a, b) => moment(a).diff(moment(b), 'day'))
      if (dateRangeFormated.length > 1) {
        dateRangeFormated = dateRangeFormated.sort((a, b) => {
          let firstDate = moment(a, 'DD/MM/YYYY')
          let secondDate = moment(b, 'DD/MM/YYYY')
          return firstDate.diff(secondDate, 'day')
        })
      }

      return dateRangeFormated
    }
  },
  watch: {
    dateRangeSorted: {
      handler(val) {
        this.$emit('update:date-range', val)
      }
    }
  }
}
</script>
