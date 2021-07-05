<template>
  <v-card class="ma-4" outlined>
    <v-data-table
      :headers="originHeaders"
      mobile-breakpoint="0"
      sort-by="name"
      :items="attendances"
      :options.sync="tableOptions"
      :server-items-length="totalItems"
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
      <template v-slot:[`footer.page-text`]="items">
        {{ items.pageStart }} - {{ items.pageStop }} trên tổng
        {{ items.itemsLength }}
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
      <template v-slot:[`item.time`]="{ item }">
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
import AttendanceListActions from '@/modules/attendance/AttendanceListActions'
import { mapActions, mapState } from 'vuex'

export default {
  components: { AttendanceListActions },
  data() {
    return {
      tableOptions: {},
      originHeaders: [
        {
          text: 'Ngày',
          value: 'time',
          width: 100,
          sortable: false
        },
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
        { text: 'Trạng thái', value: 'status', width: 100, sortable: false }
      ],
      loading: false
    }
  },
  props: {
    hideFooter: { type: Boolean, default: () => false }
  },
  async created() {
    await this.refresh({})
  },
  computed: {
    ...mapState('AttendanceDetail', ['attendances', 'pageText', 'totalItems'])
  },
  methods: {
    ...mapActions('AttendanceDetail', ['searchAttendances', 'requestPageSettings']),
    async refresh(query) {
      await this.searchAttendances({ ...query })
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
