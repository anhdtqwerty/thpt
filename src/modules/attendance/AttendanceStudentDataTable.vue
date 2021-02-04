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
  >
    <template v-slot:[`item.time`]="{ item }">
      {{ formatTime(item.checkin[0], 'DD/MM/YYYY') }}
    </template>
    <template v-slot:[`item.action`]="{ item }">
      <span class="mr-10">Gửi tin</span>
      <router-link :student="item" :to="'attendance/' + item.id"
        >Xem</router-link
      >
    </template>
    <template v-slot:[`item.inClass`]="{ item }">
      {{ formatTime(item.checkin[0], 'LT') }}
    </template>
    <template v-slot:[`item.outClass`]="{ item }">
      {{ formatTime(item.checkin[1], 'LT') }}
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
          value: 'inClass',
          width: 100,
          sortable: false,
        },
        {
          text: 'Giờ về',
          value: 'outClass',
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
