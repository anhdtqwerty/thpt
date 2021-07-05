<template>
  <v-card>
    <div class="d-flex justify-space-between align-center pa-4">
      <div class="font-weight-bold">Ngày {{ currentDate }}</div>
      <div>
        <v-btn @click="checkinState = !checkinState" dark color="#0D47A1">
          <v-icon left>add</v-icon>Thêm điểm danh
        </v-btn>
      </div>
    </div>
    <v-divider></v-divider>
    <AttendanceStudentFilter @onFilterChanged="refresh" class="pa-4" />
    <v-divider></v-divider>
    <AttendanceStudentDataTable class="mt-4" ref="table" />
    <AttendanceNewDialog :state="checkinState" @attendanceAdded="refresh" />
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
      checkinState: false
    }
  },
  components: {
    AttendanceStudentDataTable,
    AttendanceStudentFilter,
    AttendanceNewDialog
  },
  props: {
    attendances: Array
  },
  computed: {
    currentDate() {
      return moment().format('DD/MM/YYYY')
    }
  },
  methods: {
    refresh(query) {
      this.$refs.table.refresh(query)
    }
  }
}
</script>

<style></style>
