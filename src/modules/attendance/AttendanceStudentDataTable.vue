<template>
  <v-data-table
    mobile-breakpoint="0"
    sort-by="name"
    :items="attendances"
    :items-per-page="10"
    item-key="id"
    :headers="headers"
    loading-text="Đang Tải"
    show-select
    @click:row="handleClick"
    :footer-props="{
      'items-per-page-text': 'Học sinh mỗi trang',
      'items-per-page-all-text': 'Tất cả',
    }"
  >
    <template v-slot:top="{ pagination, options, updateOptions }">
      <v-data-footer
        :pagination="pagination"
        :options="options"
        @update:options="updateOptions"
        items-per-page-text="Học sinh mỗi trang"
        items-per-page-all-text="Tất cả"
      />
    </template>

    <template v-slot:[`item.action`]="{ item }">
      <attendance-list-actions :item="item" />
    </template>
  </v-data-table>
</template>

<script>
import moment from 'moment'
import AttendanceListActions from '@/modules/attendance/AttendanceListActions'

export default {
  components: { AttendanceListActions },
  data() {
    return {
      headers: [
        { text: 'Học sinh', value: 'student.name', sortable: true },
        { text: 'Ngày sinh', value: 'student.dob', width: 200, sortable: false },
        { text: 'Lớp', value: 'class.title', width: 100, sortable: false },
        {
          text: 'Giờ đến',
          value: 'checkin.onTime',
          width: 100,
          sortable: false,
        },
        {
          text: 'Giờ về',
          value: '09:00',
          width: 100,
          sortable: false,
        },
        { text: 'Trạng thái', value: 'status', width: 100, sortable: false },
        { text: 'Hành động', value: 'action', width: 100, sortable: false },
      ],
    }
  },
  props: {
    attendances: Array,
  },
  methods: {
    formatTime(time, str) {
      return moment(time).format(str)
    },
    handleClick(data) {
      this.$emit('handleClick', data)
    },
  },
}
</script>

<style>
</style>
