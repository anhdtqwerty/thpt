<template>
  <div>
    <div class="pa-4 d-flex justify-space-between align-center">
      <div>
        <Breadcrumbs
          headline="Quản lý học kỳ"
          :link="[
            { text: 'Nâng cao', href: '../divisions' },
            { text: 'QL Học Kỳ', href: '/semesters' }
          ]"
        />
      </div>
      <div class="flex-center">
        <v-btn v-if="$vuetify.breakpoint.mdAndUp" class="mr-2" outlined color="success" @click="exportExcel">
          <v-icon left>mdi-file-excel</v-icon> Xuất Excel
        </v-btn>
        <v-btn @click="createState = !createState" dark color="#0D47A1"> <v-icon left>add</v-icon>Thêm học kỳ </v-btn>
      </div>
    </div>

    <v-card class="px-md-6 mx-md-4 elevation-1">
      <v-data-table :loading="loading" :headers="headers" :items="semesters" item-key="id" :footer-props="footerTable">
        <div slot="top" class="py-md-6">
          <div v-if="$vuetify.breakpoint.mdAndUp">
            <semester-filter @onFilterChanged="refresh"></semester-filter>
          </div>
          <div>
            <v-btn v-if="$vuetify.breakpoint.smAndDown" icon @click.stop="filterState = !filterState">
              <v-icon right>mdi-filter-outline</v-icon>
            </v-btn>
          </div>
        </div>

        <template v-slot:[`item.status`]="{ item }">
          <span v-if="item.status" :class="getColor(item.status)">{{ item.status | getStatus }} </span>
        </template>
        <template v-slot:[`item.action`]="{ item }">
          <semester-list-action :item="item"></semester-list-action>
        </template>
        <template v-slot:[`item.config.startDate`]="{ item }">
          {{ formatStartDate(item) }}
        </template>
        <template v-slot:[`item.config.endDate`]="{ item }">
          {{ formatEndDate(item) }}
        </template>
      </v-data-table>
    </v-card>

    <semester-new-dialog :state="createState"></semester-new-dialog>
    <semester-filter-dialog @onFilterChanged="refresh" :state="filterState"></semester-filter-dialog>
  </div>
</template>

<script>
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import { mapActions, mapGetters } from 'vuex'
import DropMenu from '@/modules/student/menu/Menu.vue'
import SemesterFilter from '@/modules/semester/SemesterFilter'
import SemesterNewDialog from '@/modules/semester/SemesterNewDialog'
import SemesterFilterDialog from '@/modules/semester/SemesterFilterDialog'
import SemesterListAction from '@/modules/semester/SemesterListAction'
import moment from 'moment'
import { get } from 'lodash'
import utils from '@/plugins/utils'

const originHeaders = [
  {
    text: 'Học kỳ',
    value: 'title',
    align: 'left',
    sortable: false,
    show: true
  },
  {
    text: 'Năm học',
    value: 'generation.name',
    align: 'left',
    sortable: false,
    show: true
  },
  {
    text: 'Ngày bắt đầu',
    value: 'config.startDate',
    align: 'left',
    sortable: false,
    show: true
  },
  {
    text: 'Ngày kết thúc',
    value: 'config.endDate',
    align: 'left',
    sortable: false,
    show: true
  },
  {
    text: 'Trạng thái',
    value: 'status',
    align: 'left',
    sortable: false,
    show: true
  },
  {
    text: 'Ghi chú',
    value: 'config.notes',
    align: 'left',
    sortable: false,
    show: true
  },
  {
    text: 'Hành động',
    value: 'action',
    align: 'left',
    sortable: false,
    show: true
  }
]

export default {
  components: {
    Breadcrumbs,
    DropMenu,
    SemesterFilter,
    SemesterNewDialog,
    SemesterFilterDialog,
    SemesterListAction
  },
  data() {
    return {
      loading: false,
      headers: originHeaders,
      createState: false,
      filterState: false
    }
  },
  computed: {
    ...mapGetters('semester', ['semesters']),
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
  created() {
    this.loading = true
    this.fetchSemesters({}).then(() => {
      this.loading = false
    })
  },
  methods: {
    ...mapActions('semester', ['fetchSemesters', 'searchSemesters']),
    refresh(query) {
      this.loading = true
      this.fetchSemesters({
        ...query
      }).then(() => {
        this.loading = false
      })
    },
    getColor(status) {
      if (status === 'open') return 'green--text'
      if (status === 'block') return 'orange--text'
      else return 'gray--text'
    },
    formatStartDate(item) {
      return get(item, 'config.startDate', '') ? moment(item.config.startDate).format('D/MM/YYYY') : ''
    },
    formatEndDate(item) {
      return get(item, 'config.endDate', '') ? moment(item.config.endDate).format('D/MM/YYYY') : ''
    },
    exportExcel() {
      const excelHeader = this.headers.map(({ text, value }) => ({ text, value }))
      utils.exportExcel(this.semesters, excelHeader, 'Semesters_List')
    }
  }
}
</script>
