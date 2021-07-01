<template>
  <div>
    <div class="pa-4 d-flex justify-space-between align-center">
      <div>
        <Breadcrumbs
          headline="Điểm danh"
          :link="[{ text: 'Điểm danh', href: '../attendances' }, { text: 'Chi tiết điểm danh' }]"
        />
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
      >
        <template slot="top">
          <attendance-student-filter @onFilterChanged="refresh" class="pa-4" />
        </template>
        <template v-slot:[`item.time`]="{ item }">
          {{ formatTime(item.time, 'DD/MM/YYYY') }}
        </template>
        <template v-slot:[`item.action`]="{ item }">
          <span>Xóa</span>
        </template>
        <template v-slot:[`item.checkin.inClass`]="{ item }">
          {{ formatTime(item.checkin.inClass, 'LT') }}
        </template>
        <template v-slot:[`item.checkin.outClass`]="{ item }">
          {{ formatTime(item.checkin.outClass, 'LT') }}
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import Breadcrumbs from '@/components/layout/Breadcrumbs.vue'
import AttendanceStudentFilter from '@/modules/attendance/AttendanceStudentFilter.vue'
import { mapActions, mapGetters } from 'vuex'
import moment from 'moment'

export default {
  components: {
    Breadcrumbs,
    AttendanceStudentFilter
  },
  props: {
    student: Object
  },
  data() {
    return {
      headers: [
        { text: 'Ngày', value: 'time', width: 100, sortable: false },
        {
          text: 'Giờ đến',
          value: 'checkin.inClass',
          width: 100,
          align: 'center',
          sortable: false
        },
        {
          text: 'Giờ về',
          value: 'checkin.outClass',
          width: 100,
          align: 'center',
          sortable: false
        },
        {
          text: 'Ghi chú',
          value: 'data',
          width: 300,
          align: 'center',
          sortable: false
        },
        { text: 'Hành động', value: 'action', width: 100, sortable: false }
      ],
      isLoading: true,
      editState: false,
      editStudent: '',
      editClass: '',
      editInClass: '',
      editOutClass: ''
    }
  },
  computed: {
    ...mapGetters('attendance', ['attendances'])
  },
  created() {
    this.refresh({})
  },
  methods: {
    ...mapActions('attendance', ['fetchAttendances']),
    refresh(query) {
      this.isLoading = true
      this.fetchAttendances({ ...query }).then(() => {
        this.isLoading = false
      })
    },
    formatTime(time, str) {
      return moment(time).format(str)
    },
    handleClick(data) {
      this.editState = !this.editState
      this.editClass = data.class
      this.editStudent = data.student
      this.editInClass = data.inClass
      this.editOutClass = data.outClass
    }
  }
}
</script>

<style></style>
