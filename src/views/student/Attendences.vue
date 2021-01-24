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
      <v-data-table
        mobile-breakpoint="0"
        sort-by="name"
        :items="attendances"
        :items-per-page="10"
        item-key="id"
        :headers="headers"
        loading-text="Đang Tải"
        :loading="isLoading"
        show-select
      >
        <template slot="top">
          <attendance-student-filter @onFilterChanged="refresh" class="pa-4" />
        </template>
        <template v-slot:[`item.time`]="{ item }">
          {{ formatTime(item) }}
        </template>

        <template v-slot:[`item.action`]>
          <span class="mr-10">Gửi tin</span>
          <span>Xem</span>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import Breadcrumbs from '@/components/layout/Breadcrumbs.vue'
import AttendanceStudentFilter from '@/modules/attendance/AttendanceStudentFilter.vue'
import { mapActions, mapState, mapGetters } from 'vuex'
import moment from 'moment'

export default {
  components: {
    Breadcrumbs,
    AttendanceStudentFilter,
  },
  data() {
    return {
      headers: [
        { text: 'Học sinh', value: 'student.name', sortable: true },
        { text: 'Lớp', value: 'class.title', width: 100, sortable: false },
        { text: 'Ngày', value: 'time', width: 100, sortable: false },
        { text: 'Giờ đến', value: 'inClass', width: 100, sortable: false },
        { text: 'Giờ về', value: 'outClass', width: 100, sortable: false },
        { text: 'Trạng thái', value: 'status', width: 100, sortable: false },
        { text: 'Hành động', value: 'action', width: 200, sortable: false },
      ],
      isLoading: true,
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
    formatTime(time) {
      return moment(time).format('DD/MM/YYYY')
    },
  },
}
</script>

<style>
</style>
