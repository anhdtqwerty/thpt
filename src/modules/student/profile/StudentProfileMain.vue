<template>
  <div>
    <v-card elevation="0" outlined>
      <v-tabs v-model="tab">
        <v-tab :key="1"> Hồ sơ </v-tab>
        <v-tab :key="2"> Học tập </v-tab>
        <v-tab :key="3"> Chuyên cần </v-tab>
        <v-tab :key="4"> Khen thưởng kỷ luật </v-tab>
      </v-tabs>
    </v-card>

    <v-card elevation="0" outlined>
      <v-tabs-items v-model="tab">
        <v-tab-item :key="1">
          <student-general-info :edit="edit" :student="student" />
        </v-tab-item>
        <v-tab-item :key="2"> </v-tab-item>
        <v-tab-item :key="3">
          <attendance-student-data-table :attendances="attendances" />
        </v-tab-item>
        <v-tab-item :key="4">
          <violation-data-table :violations="violations" />
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script>
import StudentGeneralInfo from '@/modules/student/profile/StudentGeneralInfo'
import ViolationDataTable from '@/modules/violation/ViolationDataTable'
import AttendanceStudentDataTable from '@/modules/attendance/AttendanceStudentDataTable'
import { mapActions, mapState, mapGetters } from 'vuex'

export default {
  data() {
    return {
      tab: null,
    }
  },
  components: {
    StudentGeneralInfo,
    ViolationDataTable,
    AttendanceStudentDataTable,
  },
  props: {
    student: Object,
    edit: Boolean,
  },
  computed: {
    ...mapState('violation', ['violations']),
    ...mapGetters('attendance', ['attendances']),
  },
  async created() {
    await this.fetchViolation({ student: this.student.id })
    await this.fetchAttendances({ student: this.student.id })
  },
  methods: {
    ...mapActions('violation', ['fetchViolation']),
    ...mapActions('attendance', ['fetchAttendances']),
  },
}
</script>

<style>
</style>
