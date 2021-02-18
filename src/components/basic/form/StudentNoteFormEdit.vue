<template>
  <v-form v-model="valid" ref="form" v-bind="this.$attrs">
    <p class="text-subtitle-2">3. Ghi chú về học sinh</p>
    <v-row class="pr-12">
      <v-col class="py-0" cols="12">
        <v-subheader class="pa-0">Ghi chú</v-subheader>
        <v-text-field
          :outlined="edit"
          hide-details
          class="ma-0"
          v-model="notes"
          dense
        ></v-text-field>
      </v-col>
      <v-col class="py-0" cols="12" md="6">
        <v-subheader class="pa-0">Ngày vào đội</v-subheader>
        <date-picker
          :outlined="edit"
          hide-details
          class="ma-0"
          :date.sync="youngJoinedDate"
          dense
        ></date-picker>
      </v-col>
      <v-col class="py-0" cols="12" md="6">
        <v-subheader class="pa-0">Ngày vào đoàn</v-subheader>
        <date-picker
          :outlined="edit"
          hide-details
          class="ma-0"
          :date.sync="communistJoinedDate"
          dense
        ></date-picker>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
// import { get } from 'lodash'
import DatePicker from '@/components/basic/picker/DateIOSPicker.vue'
export default {
  components: {
    DatePicker,
  },
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
