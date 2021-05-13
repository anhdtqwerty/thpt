<template>
  <v-data-table
    :hide-default-footer="hideFooter"
    :headers="headers ? headers : originHeaders"
    mobile-breakpoint="0"
    sort-by="name"
    :items="attendances"
    :items-per-page="10"
    item-key="id"
    loading-text="Đang Tải"
    @click:row="handleClick"
    :footer-props="{
      'items-per-page-text': 'Học sinh mỗi trang',
      'items-per-page-all-text': 'Tất cả'
    }"
  >
    <template v-if="!hideFooter" v-slot:top="{ pagination, options, updateOptions }">
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
    <template v-slot:[`item.checkin`]="{ item }">
      <span>{{ formatTime(item.checkin[0], 'LT') }}</span>
    </template>
    <template v-slot:[`item.student.dob`]="{ item }">
      <span>{{ formatTime(item.student.dob, 'DD/MM/YYYY') }}</span>
    </template>
    <template v-slot:[`item.type`]="{ item }">
      <v-chip small label :color="getColor(item.type)" dark
        ><span v-if="item.type">
          {{ item.type === 'late' ? 'Đi muộn' : item.type === 'onTime' ? 'Đúng giờ' : '' }}
        </span>
      </v-chip>
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
      originHeaders: [
        { text: 'Học sinh', value: 'student.name', sortable: true },
        {
          text: 'Ngày sinh',
          value: 'student.dob',
          width: 200,
          sortable: false
        },
        { text: 'Lớp', value: 'class.title', width: 100, sortable: false },
        {
          text: 'Giờ đến',
          value: 'checkin',
          width: 100,
          sortable: false
        },
        {
          text: 'Giờ về',
          value: '09:00',
          width: 100,
          sortable: false
        },
        { text: 'Trạng thái', value: 'status', width: 100, sortable: false },
        { text: 'Hành động', value: 'action', width: 100, sortable: false }
      ],
      attendances: [
        { date: '28/01/2021', time: '08:00 / 17:00', type: 'onTime' },
        { date: '29/01/2021', time: '09:00 / 17:00', type: 'late' },
        { date: '30/01/2021', time: '08:00 / 17:00', type: 'onTime' }
      ]
    }
  },
  props: {
    // attendances: Array,
    hideFooter: { type: Boolean, default: () => false },
    headers: { type: Array, default: () => null }
  },
  methods: {
    formatTime(time, str) {
      return moment(time).format(str)
    },
    handleClick(data) {
      this.$emit('handleClick', data)
    },
    getColor(s) {
      if (s === 'late') return 'orange'
      else return '#46BE8A'
    }
  }
}
</script>

<style></style>
