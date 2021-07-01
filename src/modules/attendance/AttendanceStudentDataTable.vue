<template>
  <v-data-table
    :hide-default-footer="hideFooter"
    :headers="headers ? headers : originHeaders"
    mobile-breakpoint="0"
    :items="hideFooter ? attendances : studentAttendances"
    item-key="id"
    loading-text="Đang Tải"
    :footer-props="{ 'items-per-page-text': 'Học sinh mỗi trang', 'items-per-page-options': [5, 10, 15] }"
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
    <template v-slot:[`footer.page-text`]="items">
      {{ items.pageStart }} - {{ items.pageStop }} trên {{ items.itemsLength }}
    </template>
    <template v-slot:[`item.student`]="{ item }">
      <CardStudentName :student="item.student" link />
    </template>
    <template v-slot:[`item.action`]="{ item }">
      <div v-for="index in evenNumbers(item)" :key="index">
        <AttendanceListActions :item="item" :checkinIndex="index" @attendanceUpdated="refresh" />
      </div>
    </template>
    <template v-slot:[`item.time`]="{ item }">
      <div v-if="item.attendance">
        <div class="pt-2" style="height: 36px" v-for="index in evenNumbers(item)" :key="index">
          {{ item.attendance.checkin[index] | hhmm }} / {{ item.attendance.checkin[index + 1] | hhmm }}
        </div>
      </div>
      <div v-else>
        --:-- / --:--
      </div>
    </template>
    <template v-slot:[`item.dob`]="{ item }">
      <span>{{ (item.student && item.student.dob) | ddmmyyyy }}</span>
    </template>
    <template v-slot:[`item.class`]="{ item }">
      <router-link
        style="text-decoration: none"
        :to="'/class/' + (item.student.currentClass && item.student.currentClass.id)"
      >
        <span v-if="item.student.currentClass">{{ item.student.currentClass && item.student.currentClass.title }}</span>
      </router-link>
    </template>
    <template v-slot:[`item.status`]="{ item }">
      <v-chip small label :color="item.attendance | getAttendanceStatusColor" dark>
        <span>
          {{ item.attendance | getAttendanceStatus }}
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
          text: 'Giờ đến / Giờ về',
          value: 'time',
          sortable: false,
          align: 'center'
        },
        { text: 'Trạng thái', value: 'status', sortable: false, align: 'center' },
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
    ...mapState('attendance', ['pageText', 'totalItems', 'studentAttendances']),
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
    ...mapActions('attendance', ['searchAttendances', 'requestPageSettings', 'fetchStudentAttendances']),
    async refresh(query) {
      // const start = moment()
      //   .startOf('day')
      //   .toISOString()
      // const end = moment()
      //   .endOf('day')
      //   .toISOString()
      // console.log('query', { ...query, time_gte: start, time_lte: end })
      // const params = { time_gte: start, time_lte: end }
      // await this.searchAttendances({ ...query })
      await this.fetchStudentAttendances(query)
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
    },
    evenNumbers(item) {
      if (item.attendance) {
        return [...Array(item.attendance.checkin.length)].map((_, i) => i).filter(i => i % 2 === 0)
      }
      return [0]
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
  filters: {
    getAttendanceStatus(attendance) {
      if (attendance) return 'Có mặt'
      return 'Chưa điểm danh'
    },
    getAttendanceStatusColor(attendance) {
      if (!attendance) return '#FD6B6B'
      return '#46BE8A'
    }
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
