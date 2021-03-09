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
    <template v-slot:[`item.time`]="{ item }">
      {{ formatTime(item.time, 'DD/MM/YYYY') }}
    </template>
    <template v-slot:[`item.action`]="{ item }">
      <span class="mr-10">Gửi tin</span>
      <router-link :student="item" :to="'attendance/' + item.id"
        >Xem</router-link
      >
    </template>
  </v-data-table>
</template>

<script>
import moment from 'moment'

export default {
  data() {
    return {
      headers: [
        { text: 'Học sinh', value: 'student.name', sortable: true },
        { text: 'Lớp', value: 'class.title', width: 100, sortable: false },
        { text: 'Ngày', value: 'time', width: 100, sortable: false },
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
        { text: 'Hành động', value: 'action', width: 200, sortable: false },
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
