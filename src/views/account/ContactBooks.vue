<template>
  <div class="pa-4">
    <ConfigPasswordDialog
      :state="configPasswordDialog"
      :student="selectedStudent"
      @close="configPasswordDialog = false"
    />
    <div class="d-flex justify-space-between align-center">
      <div>
        <Breadcrumbs headline="Danh sách sổ liên lạc" :link="[{ text: 'Sổ liên lạc', href: '../contact-book' }]" />
      </div>
    </div>
    <v-card class="card-border elevation-0 pa-5 mt-4">
      <ContactBookFilter @onFilterChanged="onFilterChanged"></ContactBookFilter>
    </v-card>
    <ContactBookDataTable :loading="loading" :students="filteredStudents" />
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import ConfigPasswordDialog from './ConfigPasswordDialog.vue'
import ContactBookFilter from '@/modules/contactBook/ContactBookFilter.vue'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import ContactBookDataTable from '@/modules/contactBook/ContactBookDataTable.vue'

const originHeaders = [
  {
    text: 'Học sinh',
    value: 'name',
    align: 'left',
    sortable: false,
    show: true
  },
  {
    text: 'Ngày sinh',
    value: 'dob',
    align: 'left',
    sortable: false,
    show: true
  },
  { text: 'Lớp', value: 'classes', align: 'left', sortable: false, show: true },
  {
    text: 'Hình thức sử dụng',
    value: 'senderMethod',
    align: 'left',
    sortable: false,
    show: true
  },
  {
    text: 'SĐT đăng ký',
    value: 'phone',
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
    text: '',
    value: 'action',
    align: 'center',
    sortable: false,
    show: true
  }
]
export default {
  components: {
    ContactBookFilter,
    Breadcrumbs,
    ConfigPasswordDialog,
    ContactBookDataTable
  },
  props: {
    role: String
  },
  data() {
    return {
      headers: originHeaders,
      originHeaders: originHeaders,
      selectedStudent: {},
      search: '',
      loading: false,
      configDialog: false,
      configPasswordDialog: false,
      studentTableOptions: {},
      filteredStudents: []
    }
  },
  async created() {
    await this.refresh({ _sort: 'contactBook.createdAt:desc' })
    this.filteredStudents = this.students
  },
  computed: {
    ...mapState('app', ['department']),
    ...mapState('students', ['totalItems', 'students', 'pageText']),

    footerTable() {
      let footer = {
        'items-per-page-text': 'Học sinh mỗi trang',
        'items-per-page-all-text': 'Tất cả',
        'items-per-page': 10,
        'page-text': this.pageText
      }
      if (this.totalItems > 100) {
        footer['items-per-page-options'] = [5, 10, 15, 30]
      }
      return footer
    }
  },
  methods: {
    ...mapActions('students', [
      'requestPageSettings',
      'searchStudents',
      'updateStudent',
      'removeStudents',
      'fetchStudents'
    ]),

    configPassword(item) {
      this.configPasswordDialog = true
      this.selectedStudent = item
    },

    async refresh(query) {
      this.loading = true

      await this.searchStudents({ department: this.department.id, ...query })
      this.loading = false
    },
    async onFilterChanged(data) {
      this.$loading.active = true

      await this.refresh({
        ...data
      })
      this.filteredStudents = this.students
      this.$loading.active = false
    }
  },
  watch: {
    studentTableOptions: {
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
    },
    students(students) {
      this.filteredStudents = students
    }
  },
  filters: {}
}
</script>
<style scoped>
td {
  white-space: nowrap !important   ;
}
.card-border {
  border: 1px solid rgba(224, 224, 224, 1);
}
</style>
