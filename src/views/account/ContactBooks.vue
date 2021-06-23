<template>
  <div class="pa-4">
    <div class="d-flex justify-space-between align-center">
      <div>
        <Breadcrumbs headline="Danh sách sổ liên lạc" :link="[{ text: 'Sổ liên lạc', href: '../contact-book' }]" />
      </div>
    </div>
    <v-card class="card-border elevation-0 pa-5 mt-4">
      <ContactBookFilter @onFilterChanged="onFilterChanged"></ContactBookFilter>
    </v-card>
    <ContactBookDataTable ref="table" />
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
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
      filteredStudents: []
    }
  },
  computed: {
    ...mapState('app', ['department']),
    ...mapState('students', ['totalItems', 'students', 'pageText'])
  },
  methods: {
    ...mapActions('students', ['requestPageSettings', 'searchStudents', 'updateStudent', 'removeStudents', 'fetchStudents']),
    async onFilterChanged(data) {
      this.$refs.table.refresh(data)
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
