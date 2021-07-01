<template>
  <v-data-table
    :hide-default-footer="hideFooter"
    :headers="headers ? headers : originHeaders"
    mobile-breakpoint="0"
    sort-by="name"
    :items="attendances"
    :options.sync="tableOptions"
    :server-items-length="totalItems"
    item-key="id"
    loading-text="Đang Tải"
    :footer-props="footerTable"
    @click:row="handleClick"
  >
    <!-- <template v-if="!hideFooter" v-slot:top="{ pagination, options, updateOptions }">
      <v-data-footer
        :pagination="pagination"
        :options="options"
        @update:options="updateOptions"
        items-per-page-text="Học sinh mỗi trang"
        items-per-page-all-text="Tất cả"
      />
    </template> -->
    <template v-slot:[`item.student`]="{ item }">
      <CardStudentName :student="item.student" link />
    </template>
    <template v-slot:[`item.action`]="{ item }">
      <attendance-list-actions :item="item" />
    </template>
    <template v-slot:[`item.checkIn`]="{ item }">
      <span>{{ item.checkin[0] | hhmm }}</span>
    </template>
    <template v-slot:[`item.checkOut`]="{ item }">
      <span>{{ item.checkin[1] | hhmm }}</span>
    </template>
    <template v-slot:[`item.dob`]="{ item }">
      <span>{{ (item.student && item.student.dob) | ddmmyyyy }}</span>
    </template>
    <template v-slot:[`item.class`]="{ item }">
      <router-link style="text-decoration: none" :to="'/class/' + (item.class && item.class.id)">
        <span v-if="item.class">{{ item.class && item.class.title }}</span>
      </router-link>
    </template>
    <template v-slot:[`item.status`]="{ item }">
      <v-chip small label :color="getColor(item.status)" dark>
        <span v-if="item.status">
          {{ item.status | getAttendanceStatus }}
        </span>
      </v-chip>
    </template>
  </v-data-table>
</template>

<script>
import moment from 'moment'
import AttendanceListActions from '@/modules/attendance/AttendanceListActions'
import CardStudentName from '@/components/basic/card/CardStudentName.vue'
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
  components: { AttendanceListActions, CardStudentName },
  data() {
    return {
      tableOptions: {},
      originHeaders: [
        { text: 'Học sinh', value: 'student', width: 200, sortable: true },
        {
          text: 'Ngày sinh',
          value: 'dob',
          width: 100,
          sortable: false
        },
        { text: 'Lớp', value: 'class', width: 100, sortable: false },
        {
          text: 'Giờ đến',
          value: 'checkIn',
          width: 100,
          sortable: false
        },
        {
          text: 'Giờ về',
          value: 'checkOut',
          width: 100,
          sortable: false
        },
        { text: 'Trạng thái', value: 'status', width: 100, sortable: false },
        { text: 'Hành động', value: 'action', width: 100, sortable: false }
      ]
      // attendances: [
      //   { date: '28/01/2021', time: '08:00 / 17:00', type: 'onTime' },
      //   { date: '29/01/2021', time: '09:00 / 17:00', type: 'late' },
      //   { date: '30/01/2021', time: '08:00 / 17:00', type: 'onTime' }
      // ]
    }
  },
  props: {
    hideFooter: { type: Boolean, default: () => false },
    headers: { type: Array, default: () => null }
  },
  async created() {
    await this.refresh({})
  },
  computed: {
    ...mapState('attendance', ['pageText', 'totalItems']),
    ...mapGetters('attendance', ['attendances']),

    footerTable() {
      let footer = {
        'items-per-page-text': 'Hiển thị mỗi trang',
        'items-per-page-all-text': 'Tất cả',
        'items-per-page': 10,
        'page-text': this.pageText
      }
      if (this.totalItems > 100) {
        footer['items-per-page-options'] = [5, 10, 15]
      }
      return footer
    }
  },
  methods: {
    ...mapActions('attendance', ['searchAttendances', 'requestPageSettings']),
    async refresh(query) {
      const start = moment()
        .startOf('day')
        .toISOString()
      const end = moment()
        .endOf('day')
        .toISOString()

      // console.log('query', { ...query, time_gte: start, time_lte: end })
      const params = { time_gte: start, time_lte: end }
      await this.searchAttendances({ ...query })
    },

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
    // getCheckIn(item) {
    //   let time = ''
    //   for (let i = 0; i < item.checkin.length; i += 2) {
    //     time += `<div>${item.checkin[i] || `-:-`}</div><br/>`
    //   }
    //   return time
    // },
    // getCheckOut(item) {
    //   let time = ''
    //   for (let i = 1; i < item.checkin.length + 1; i += 2) {
    //     time += `<div>${item.checkin[i] || `-:-`}</div><br/>`
    //   }
    //   return time
    // }
  },
  watch: {
    tableOptions: {
      handler(newOptions, oldOptions) {
        const itemPerPageChanged = newOptions.itemsPerPage !== oldOptions.itemsPerPage
        const pageChanged = newOptions.page !== oldOptions.page
        if (pageChanged || itemPerPageChanged) {
          this.requestPageSettings({
            page: newOptions.page,
            itemsPerPage: newOptions.itemsPerPage
          })
        }
      },
      deep: true
    }
  }
}
</script>

<style scoped></style>
