<template>
  <div>
    <div class="pa-4 d-flex justify-space-between align-center">
      <div>
        <Breadcrumbs headline="Chuyên cần" :link="[{ text: 'Chuyên cần', href: '../attendances' }]" />
      </div>
    </div>
    <v-card outlined class="mx-md-4 elevation-0">
      <v-tabs color="primary" v-model="tab">
        <v-tab :key="1">Điểm danh</v-tab>
        <v-tab :key="2">Chuyên cần</v-tab>
      </v-tabs>
    </v-card>

    <v-card outlined class="mx-md-4 elevation-0">
      <v-tabs-items v-model="tab">
        <v-tab-item :key="1">
          <AttendanceInfo />
        </v-tab-item>
        <v-tab-item :key="2">
          <DiligenceInfo />
        </v-tab-item>
      </v-tabs-items>
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
import AttendanceInfo from '@/views/student/AttendanceInfo.vue'
import DiligenceInfo from '@/views/student/DiligenceInfo'
import AttendanceStudentEditDialog from '@/modules/attendance/AttendanceStudentEditDialog'
import { mapActions, mapState, mapGetters } from 'vuex'

export default {
  components: {
    Breadcrumbs,
    AttendanceStudentEditDialog,
    AttendanceInfo,
    DiligenceInfo
  },
  data() {
    return {
      isLoading: true,
      editState: false,
      editStudent: { name: '' },
      editClass: { title: '' },
      editInClass: '',
      editOutClass: '',
      tab: null
    }
  },
  computed: {
    ...mapGetters('attendance', ['attendances']),
    ...mapState('app', ['department'])
  },
  created() {
    // this.refresh({})
  },
  methods: {
    ...mapActions('attendance', ['fetchAttendances']),
    refresh(query) {
      this.isLoading = true
      this.fetchAttendances({ ...query }).then(() => {
        this.isLoading = false
      })
    },
    handleClick(data) {
      this.editState = !this.editState
      this.editClass = data.class
      this.editStudent = data.student
      this.editInClass = data.checkin[0]
      this.editOutClass = data.checkin[1]
    }
  }
}
</script>

<style></style>
