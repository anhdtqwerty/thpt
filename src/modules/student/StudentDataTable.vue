<template>
  <v-data-table
    mobile-breakpoint="0"
    item-key="id"
    :options.sync="studentTableOptions"
    :server-items-length="totalItems"
    :headers="headers"
    :items="students"
    :items-per-page="10"
    sort-by="name"
    @change="$emit('update:selected', selected)"
    :footer-props="{
      'items-per-page-text': 'Học sinh mỗi trang',
      'items-per-page-all-text': 'Tất cả',
    }"
  >
    <template v-slot:[`item.name`]="{ item }">
      <card-student-name :student="item" link />
    </template>
    <template v-slot:[`item.status`]="{ item }">
      <span v-if="item.status" :class="getColor(item.status)">
        {{ item.status | getStatus }}
      </span>
    </template>
    <template v-slot:[`item.classes`]="{ item }">
      <router-link
        style="text-decoration: none"
        :to="'/class/' + item.classes[0].id"
      >
        <span v-if="item.classes">{{ item.classes | getClasses }}</span>
      </router-link>
    </template>
    <template v-slot:[`item.gender`]="{ item }">{{
      item.gender === 'male' ? 'Nam' : item.gender === 'female' ? 'Nữ' : 'Khác'
    }}</template>
    <template v-slot:[`item.dob`]="{ item }">
      <span>{{ formatDate(item.dob) }}</span>
    </template>
    <template v-slot:[`item.action`]="{ item }">
      <student-list-actions :item="item"></student-list-actions>
    </template>
    <template v-slot:[`item.notes`]="{ item }">
      <v-tooltip max-width="250px" bottom>
        <template v-slot:activator="{ on, attrs }">
          <p v-bind="attrs" v-on="on" class="nowrap ma-0">{{ item.notes }}</p>
        </template>
        <span>{{ item.notes }}</span>
      </v-tooltip>
    </template>
  </v-data-table>
</template>

<script>
import CardStudentName from '@/components/basic/card/CardStudentName.vue'
import StudentListActions from '@/modules/student/StudentListActions'
import { mapState, mapActions } from 'vuex'
import moment from 'moment'

const originHeaders = [
  {
    text: 'Tên học sinh',
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
    width: '10px',
  },
  {
    text: 'Ngày sinh',
    value: 'dob',
    align: 'center',
    sortable: false,
    show: true,
  },
  {
    text: 'Giới tính',
    value: 'gender',
    align: 'center',
    sortable: false,
    show: true,
    width: '100',
  },
  {
    text: 'Trạng thái',
    value: 'status',
    align: 'left',
    sortable: false,
    show: true,
    width: '100',
  },
  {
    text: 'Ghi chú',
    value: 'notes',
    align: 'left',
    sortable: false,
    show: true,
  },
  {
    value: 'action',
    align: 'center',
    sortable: false,
    show: true,
    width: '10px',
  },
]
export default {
  data() {
    return {
      headers: originHeaders,
      originHeaders: originHeaders,
      studentTableOptions: {},
      status: null,
      statuses: [
        { text: 'Active', value: 'false' },
        { text: 'Blocked', value: 'true' },
      ],
    }
  },
  components: {
    CardStudentName,
    StudentListActions,
  },
  computed: {
    ...mapState('students', ['totalItems', 'students']),
  },
  methods: {
    ...mapActions('students', [
      'requestPageSettings',
      'searchStudents',
      'fetchStudents',
    ]),
    async refresh(query) {
      await this.searchStudents({ ...query })
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
  },
  async created() {
    await this.refresh({})
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
}
</script>

<style scoped>
.nowrap {
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;
  width: 230px;
}
</style>
