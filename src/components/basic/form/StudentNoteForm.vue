<template>
  <v-form v-model="valid" ref="form" v-bind="this.$attrs">
    <v-row>
      <v-col cols="12">
        <v-text-field
          v-model="notes"
          label="Ghi chú"
          outlined
          dense
        ></v-text-field>
        <v-text-field
          v-model="changeNotes"
          label="Những thay đổi cần ghi chú"
          dense
          outlined
        ></v-text-field>
        <v-row no-gutters>
          <v-col class="pa-0" cols="6">
            <v-checkbox
              class="pa-0 ma-0"
              v-model="isYoung"
              label="Đội viên"
            ></v-checkbox>
          </v-col>
          <v-col class="pa-0" cols="6">
            <date-picker
              :disabled="!isYoung"
              v-model="youngJoinedDate"
              label="Ngày vào Đội"
              outlined
              dense
            ></date-picker>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col class="pa-0" cols="6">
            <v-checkbox
              class="pa-0 ma-0"
              v-model="isCommunist"
              label="Đoàn viên"
            ></v-checkbox>
          </v-col>
          <v-col class="pa-0" cols="6">
            <date-picker
              :disabled="!isCommunist"
              v-model="communistJoinedDate"
              label="Ngày vào Đoàn"
              dense
              outlined
            ></date-picker>
          </v-col>
        </v-row>
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
  },
  data: () => ({
    valid: true,
    notes: '',
    changeNotes: '',
    youngJoinedDate: '',
    communistJoinedDate: '',
    isCommunist: false,
    isYoung: false,
  }),
  created() {
    if (this.student) {
      this.reset()
    }
  },
  methods: {
    validate() {
      this.$refs.form.validate()
    },
    getData() {
      return {
        notes: this.notes,
        changeNotes: this.changeNotes,
        youngJoinedDate: this.youngJoinedDate,
        communistJoinedDate: this.communistJoinedDate,
      }
    },
    reset() {
      this.notes = this.student.notes
      this.changeNotes = this.student.data.changeNotes
      this.youngJoinedDate = this.student.data.youngJoinedDate
      this.communistJoinedDate = this.student.data.communistJoinedDate
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
  },
  watch: {
    student(student) {
      this.reset()
    },
  },
}
</script>

<style scoped>
</style>
