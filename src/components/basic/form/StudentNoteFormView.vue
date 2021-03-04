<template>
  <v-form v-model="valid" ref="form" v-bind="this.$attrs">
    <p class="font-weight-black black--text">3. Ghi chú về học sinh</p>
    <v-row class="pr-12">
      <v-col class="py-0 px-0" cols="12">
        <v-subheader class="px-3">Ghi chú</v-subheader>
        <v-text-field
          class="pt-1"
          flat
          solo
          hide-details
          v-model="notes"
          dense
          regular
        ></v-text-field>
      </v-col>
      <v-col class="py-0" cols="12" md="6">
        <v-subheader class="pa-0">Ngày vào đội</v-subheader>
        <v-text-field
          flat
          solo
          hide-details
          v-model="youngJoinedDate"
          dense
          regular
        ></v-text-field>
      </v-col>
      <v-col class="py-0" cols="12" md="6">
        <v-subheader class="pa-0">Ngày vào đoàn</v-subheader>
        <v-text-field
          flat
          solo
          hide-details
          v-model="communistJoinedDate"
          dense
          regular
        ></v-text-field>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
// import { get } from 'lodash'
export default {
  props: {
    student: {
      type: [Object],
      default: () => {},
    },
    edit: Boolean,
  },
  data: () => ({
    valid: true,
    notes: '',
    youngJoinedDate: '',
    communistJoinedDate: '',
    isCommunist: false,
    isYoung: false,
  }),
  created() {
    if (this.student) {
      this.notes = this.student.notes
      this.youngJoinedDate = this.student.data.youngJoinedDate
      this.communistJoinedDate = this.student.data.communistJoinedDate
    }
  },
  methods: {
    validate() {
      this.$refs.form.validate()
    },
    getData() {
      return {
        notes: this.notes,
        youngJoinedDate: this.youngJoinedDate,
        communistJoinedDate: this.communistJoinedDate,
      }
    },
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
  },
}
</script>

<style scoped>
</style>
