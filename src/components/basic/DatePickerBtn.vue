<template>
  <div>
    <v-menu
      ref="menu"
      v-model="menu"
      :close-on-content-click="false"
      :return-value.sync="date"
      transition="scale-transition"
      offset-y
      min-width="290px"
    >
      <template v-slot:activator="{ on }">
        <v-btn text v-on="on">{{date | familiarizeDate}}</v-btn>
      </template>
      <v-date-picker v-model="date" @click:date="dateChange" no-title scrollable>
        <div class="flex-grow-1"></div>
      </v-date-picker>
    </v-menu>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  props: {
    max: moment().toISOString()
  },
  data: () => ({
    date: moment().format('YYYY-MM-DD'),
    menu: false
  }),
  methods: {
    dateChange (date) {
      this.date = date
      this.$emit('change', this.date)
      this.$refs.menu.save(date)
      this.menu = false
    }
  },
  filters: {
    familiarizeDate: time => {
      if (!time) {
        return 'None'
      }
      return moment(time, 'YYYY-MM-DD').format('DD/MM')
    }
  }
}
</script>
