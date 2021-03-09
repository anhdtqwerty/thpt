<template>
  <v-card>
    <div class="d-flex justify-space-between pa-4">
      <div class="">Ngày hôm nay</div>
      <div>
        <v-btn @click="checkinState=!checkinState" dark color="#0D47A1">
          <v-icon left>add</v-icon>Thêm điểm danh
        </v-btn>
      </div>
    </div>
    <v-divider></v-divider>
    <attendance-student-filter @onFilterChanged="refresh" class="pa-4" />
    <v-divider></v-divider>
    <attendance-student-data-table :attendances="attendances" />
    <attendance-new-dialog :state="checkinState" />
  </v-card>
</template>

<script>
import moment from 'moment'
import AttendanceStudentDataTable from '@/modules/attendance/AttendanceStudentDataTable'
import AttendanceStudentFilter from '@/modules/attendance/AttendanceStudentFilter.vue'
import AttendanceNewDialog from '@/modules/attendance/AttendanceNewDialog'

export default {
  data() {
    return {
      checkinState: false,
    }
  },
  components: {
    AttendanceStudentDataTable,
    AttendanceStudentFilter,
    AttendanceNewDialog
  },
  props: {
    attendances: Array,
  },
  methods: {
    getCurrentDate() {
      return moment()
    },
    refresh() {
      this.$emit('refresh')
    },
  },
}
</script>

<style>
</style>
