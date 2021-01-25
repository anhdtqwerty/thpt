<template>
  <div>
    <div class="pa-4 d-flex justify-space-between align-center">
      <div>
        <Breadcrumbs
          headline="Chuyên cần"
          :link="[{ text: 'Học sinh', href: '../students' },
          { text: 'Chuyên cần', href: '../diligence' }]"
        />
      </div>
    </div>
    <v-card class="px-md-6 mx-md-4 elevation-1">
       <v-data-table
        mobile-breakpoint="0"
        :items-per-page="10"
        item-key="id"
        :headers="headers"
        :items="teachers"
        :loading="isLoading"
        loading-text="Đang Tải"
        sort-by="name"
      >
        <div slot="top" class="py-md-6">
          <DiligenceFilter  @onFilterChanged="refresh"/>
        </div>

        
      </v-data-table>
    </v-card>

    <student-filter-dialog
      @onFilterDialogChanged="refresh"
      :state="filterState"
    />
    <student-new-dialog :state="createState" @done="requestPageSettings({})" />
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'

import Breadcrumbs from '@/components/layout/Breadcrumbs'
import DiligenceFilter from '@/modules/diligence/DiligenceFilter.vue'

import moment from 'moment'
const originHeaders = [
  {
    text: 'Học sinh',
    value: 'name',
    align: 'left',
    sortable: true,
    show: true,
  },
  {
    text: 'Lớp',
    value: 'classes',
    align: 'center',
    sortable: false,
    show: true,
  },
  {
    text: 'Có phép',
    value: 'dob',
    align: 'center',
    sortable: false,
    show: true,
  },
  {
    text: 'Không phép',
    value: 'gender',
    align: 'center',
    sortable: false,
    show: true,
  },
  {
    text: 'Hàng động',
    value: 'action',
    align: 'center',
    sortable: false,
    show: true,
  },
]
export default {
  components: {
    DiligenceFilter,
    Breadcrumbs
    },
  props: {
    role: String,
  },
  data() {
    return {
      headers: originHeaders,
      originHeaders: originHeaders,
      draw: false,
      search: '',
      status: null,
      loading: true,
      statuses: [
        { text: 'Active', value: 'false' },
        { text: 'Blocked', value: 'true' },
      ],
      range: { from: null, to: null },
      previewUserId: null,
      ready: false,
      studentTableOptions: {},
      createState: false,
      filterState: false,
      selected: [],
      sendState: false,
    }
  },
  async created() {
    await this.refresh({})
  },
  computed: {
    ...mapState('app', ['department']),
    ...mapState('students', ['totalItems', 'students']),
    btnTitle() {
      if (this.$vuetify.breakpoint.smAndDown) {
        return 'Thêm'
      } else {
        return 'Thêm học sinh'
      }
    },
  },
  methods: {
    ...mapActions('students', [
      'requestPageSettings',
      'searchStudents',
      'updateStudent',
      'removeStudents',
      'fetchStudents',
    ]),
    updateDraw(draw) {
      this.draw = draw
    },
    formatDate(date) {
      return moment(date).format('DD/MM/YYYY')
    },
    getColor(status) {
      switch (status) {
        case 'active':
          return 'green--text'
        case 'reserved':
          return 'orange--text'
        case 'graduated':
          return 'primary--text'
        case 'left':
          return 'red--text'
        default:
          return 'grey--text'
      }
    },
    onRemove() {
      this.$dialog.confirm({
        title: 'Xóa Học Sinh',
        text: `Bạn Có chắc muốn xóa những học sinh này.? ${this.selected.length} học sinh đã chọn`,
        okText: 'Có',
        cancelText: 'Không',
        done: async () => {
          await this.removeStudents(this.selected)
          this.selected = []
          this.$emit('removed')
        },
      })
    },
    async refresh(query) {
      this.loading = true
      await this.searchStudents({ department: this.department.id, ...query })
      this.loading = false
    },
    getTuitionStatus(leads) {
      if (!leads) return ''
      return leads
        .map((lead) => {
          return lead.liabilities
        })
        .reduce((a, b) => a + b, 0) >= 0
        ? ''
        : 'Nợ'
    },
  },
  watch: {
    studentTableOptions: {
      handler(newOptions, oldOptions) {
        const itemPerPageChanged =
          newOptions.itemsPerPage !== oldOptions.itemsPerPage
        const pageChanged = newOptions.page !== oldOptions.page
        if (pageChanged || itemPerPageChanged) {
          this.requestPageSettings({
            page: newOptions.page,
            itemsPerPage: newOptions.itemsPerPage,
          })
        }
      },
      deep: true,
    },
  },
  filters: {
    getStatus(status) {
      if (status === 'reserved') return 'Bảo Lưu'
      if (status === 'active') return 'Đang học'
      return status
    },
    getClassCount(classes) {
      return classes ? classes.length : 0
    },
    getClasses(classes) {
      if (classes && classes.length > 0) {
        return classes.map((c) => c.title).join(' ,')
      } else return ''
    },
  },
}
</script>
<style scoped>
td {
  white-space: nowrap !important   ;
}
</style>
