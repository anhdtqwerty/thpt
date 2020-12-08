<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    :return-value.sync="value"
    transition="scale-transition"
    min-width="290px"
    offset-y
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        :value="displayValue"
        :label="label"
        readonly
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker v-model="value" color="#0D47A1" locale="vi-VN" scrollable>
      <v-spacer></v-spacer>
      <v-btn text color="gray" @click="menu = false">Hủy</v-btn>
      <v-btn text color="primary" @click="onDateChange">OK</v-btn>
    </v-date-picker>
  </v-menu>
</template>
<script>
import moment from 'moment'
export default {
  props: {
    date: String,
    label: String
  },
  data: () => ({
    menu: false,
    value: '2019-10-11'
  }),
  computed: {
    displayValue() {
      return moment(this.value, 'YYYY-MM-DD').format('DD/MM/YYYY')
    }
  },
  created() {
    this.value = this.date
  },
  watch: {
    date() {
      this.value = this.date
    }
  },
  methods: {
    onDateChange() {
      this.$refs.menu.save(this.value)
      this.$emit('change', this.value)
      this.menu = false
    }
  }
}
</script>

<style scoped></style>
