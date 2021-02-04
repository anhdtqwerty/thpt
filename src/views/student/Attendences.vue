<template>
  <div>
    <div class="pa-4 d-flex justify-space-between align-center">
      <div>
        <Breadcrumbs
          headline="Điểm danh"
          :link="[{ text: 'Điểm danh', href: '../attendances' }]"
        />
      </div>
      <div class="flex-center">
        <v-btn dark color="#0D47A1">
          <v-icon left>add</v-icon>Thêm điểm danh
        </v-btn>
      </div>
    </div>

    <v-card class="pa-md-2 mx-md-4 elevation-1">
      <attendance-student-filter @onFilterChanged="refresh" class="pa-4" />
      <attendance-student-data-table
        @handleClick="handleClick"
        :attendances="attendances"
      />
    </v-card>

    <attendance-student-edit-dialog
      :editClass="editClass"
      :editStudent="editStudent"
      :editInClass="editInClass"
      :editOutClass="editOutClass"
      :state="editState"
    />
  </div>
</template>

<script>
import Breadcrumbs from '@/components/layout/Breadcrumbs.vue'
import AttendanceStudentFilter from '@/modules/attendance/AttendanceStudentFilter.vue'
import AttendanceStudentEditDialog from '@/modules/attendance/AttendanceStudentEditDialog'
import AttendanceStudentDataTable from '@/modules/attendance/AttendanceStudentDataTable'
import { mapActions, mapState, mapGetters } from 'vuex'

export default {
  components: {
    Breadcrumbs,
    AttendanceStudentFilter,
    AttendanceStudentEditDialog,
    AttendanceStudentDataTable,
  },
  data() {
    return {
      isLoading: true,
      editState: false,
      editStudent: { name: '' },
      editClass: { title: '' },
      editInClass: '',
      editOutClass: '',
    }
  },
  computed: {
    ...mapGetters('attendance', ['attendances']),
    ...mapState('app', ['department']),
  },
  created() {
    this.refresh({})
  },
  methods: {
    ...mapActions('attendance', ['fetchAttendances']),
    refresh(query) {
      this.isLoading = true
      this.fetchAttendances({ ...query, department: this.department.id }).then(
        () => {
          this.isLoading = false
        }
      )
    },
    handleClick(data) {
      this.editState = !this.editState
      this.editClass = data.class
      this.editStudent = data.student
      this.editInClass = data.checkin[0]
      this.editOutClass = data.checkin[1]
    },
  },
}
</script>

<style>
</style>
