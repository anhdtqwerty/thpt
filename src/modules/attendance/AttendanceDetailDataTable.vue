<template>
  <v-card class="ma-4" outlined>
    <v-data-table
      :headers="originHeaders"
      mobile-breakpoint="0"
      sort-by="name"
      :items="attendances"
      item-key="id"
      loading-text="Đang Tải"
      hide-default-footer
      :loading="loading"
    >
      <template v-if="!hideFooter" v-slot:top="{ pagination, options, updateOptions }">
        <v-data-footer
          :pagination="pagination"
          :options.sync="tableOptions"
          items-per-page-text="Hiển thị mỗi trang"
          items-per-page-all-text="Tất cả"
          :page-text="pageText"
        />
      </template>

      <template v-slot:[`item.time`]="{ item }">
        <div v-if="item">
          <div class="pt-2" style="height: 36px" v-for="index in evenNumbers(item)" :key="index">
            {{ item.checkin[index] | hhmm }} / {{ item.checkin[index + 1] | hhmm }}
          </div>
        </div>
        <div v-else>
          --:-- / --:--
        </div>
      </template>
      <template v-slot:[`item.date`]="{ item }">
        <span>{{ item.time | ddmmyyyy }}</span>
      </template>
      <template v-slot:[`item.status`]="{ item }">
        <v-chip small label :color="item.status | getAttendanceStatusColor" dark>
          <span v-if="item.status">
            {{ item.status | getAttendanceStatus }}
          </span>
        </v-chip>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import moment from 'moment'
import { mapActions, mapState } from 'vuex'

export default {
  components: {},
  data() {
    return {
      tableOptions: {},
      originHeaders: [
        {
          text: 'Ngày',
          value: 'date',
          sortable: false
        },
        {
          text: 'Giờ đến / Giờ về',
          value: 'time',
          sortable: false
        },

        { text: 'Trạng thái', value: 'status', sortable: false }
      ],
      loading: false
    }
  },
  props: {
    hideFooter: { type: Boolean, default: () => false },
    student: Object
  },
  async created() {
    await this.refresh({})
  },
  computed: {
    ...mapState('AttendanceDetail', ['attendances', 'pageText', 'totalItems']),
    ...mapState('app', ['currentGeneration'])
  },
  methods: {
    ...mapActions('AttendanceDetail', ['searchAttendances', 'requestPageSettings', 'fetchAttendances']),
    async refresh(query) {
      await this.fetchAttendances({ ...query, student: this.student.id })
    },
    evenNumbers(item) {
      if (item) {
        return [...Array(item.checkin.length)].map((_, i) => i).filter(i => i % 2 === 0)
      }
      return [0]
    }
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

<style></style>
