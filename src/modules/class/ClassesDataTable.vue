<template>
  <v-data-table
    v-bind="this.$attrs"
    :options.sync="studentTableOptions"
    item-key="id"
    :headers="headers"
    :items="classesData"
    :server-items-length="totalItems"
    :search="search"
    :loading="loading"
    :disable-sort="$vuetify.breakpoint.smAndDown"
    :footer-props="footerTable"
  >
    <template v-slot:[`item.status`]="{ item }">
      <v-chip small class="white--text" v-if="item.status" :color="getColor(item.status)" label>
        {{ item.status | classStatus }}
      </v-chip>
    </template>
    <template v-slot:[`item.title`]="{ item }">
      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <div v-on="on" style="text-decoration: none; white-space: nowrap">
            <router-link v-on="on" style="text-decoration: none; white-space: nowrap" :to="'/class/' + item.id">{{
              item.title
            }}</router-link>
          </div>
        </template>
        <span>Xem lớp</span>
      </v-tooltip>
    </template>
    <template v-slot:[`item.studentCount`]="{ item }">
      <p style="margin: 0; white-space: nowrap">
        {{ item.students && item.students.length }}
      </p>
    </template>
    <template v-slot:[`item.division`]="{ item }">
      <p style="margin: 0; white-space: nowrap">
        {{ item.division | getDivision }}
      </p>
    </template>
    <template v-slot:[`item.teachers`]="{ item }">
      <p style="margin: 0; white-space: nowrap">
        {{ item | getTeacherNames }}
      </p>
    </template>
  </v-data-table>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'

import moment from 'moment'
import { get } from 'lodash'

const originHeaders = [
  {
    text: 'Tên lớp',
    value: 'title',
    align: 'left',
    sortable: false,
    show: true
  },
  {
    text: 'Khối',
    value: 'grade.title',
    align: 'left',
    sortable: false,
    show: true
  },
  {
    text: 'Phân ban',
    value: 'division',
    align: 'left',
    sortable: false,
    show: true
  },
  {
    text: 'Giáo viên chủ nhiệm',
    value: 'teachers',
    align: 'left',
    sortable: false,
    show: true
  },
  {
    text: 'Sĩ số',
    value: 'studentCount',
    align: 'center',
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
    value: 'actions',
    align: 'left',
    sortable: false,
    show: true
  }
]
export default {
  components: {},
  props: {
    role: String
  },
  data() {
    return {
      headers: originHeaders,
      draw: false,
      search: '',
      status: null,
      loading: false,
      statuses: [
        { text: 'Active', value: 'false' },
        { text: 'Blocked', value: 'true' }
      ],
      range: { from: null, to: null },
      previewUserId: null,
      ready: false,
      editClassId: '',
      dialog: false,
      sendState: false,
      studentTableOptions: {}
    }
  },
  async created() {
    await this.refresh({
      department: this.department.id,
      generation: this.currentGeneration.id
    })
  },
  computed: {
    ...mapState('class', ['classData', 'classesData', 'totalItems', 'pageText']),
    ...mapState('app', ['department', 'currentGeneration']),
    ...mapGetters('class', ['classes']),

    footerTable() {
      let footer = {
        'items-per-page-text': 'Lớp mỗi trang',
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
    ...mapActions('class', [
      'fetchClasses',
      'setClass',
      'setClasses',
      'updateClasses',
      'removeClasses',
      'searchClasses',
      'requestPageSettings'
    ]),

    async refresh(query) {
      this.searchClasses({
        department: this.department.id,
        generation: this.currentGeneration.id,
        _sort: 'createdAt:desc, startTime:desc',
        ...query
      })
    },
    getColor(classStatus) {
      switch (classStatus) {
        case 'running':
          return '#46BE8A'
        default:
          return 'primary'
      }
    }
  },
  filters: {
    studentCounter: students => {
      if (!students) {
        return 0
      }
      return students.length
    },
    classStatus: status => {
      if (status === 'opened') return 'Đang chờ'
      else if (status === 'running') return 'Đang Học'
      else if (status === 'done') return 'Kết Thúc'
      else return ''
    },
    getGeneration: item => {
      return get(item, 'name', '')
    },
    getRoom: item => {
      return get(item, 'title', '')
    },
    getTeacherNames: classData => {
      return classData.teachers.map(teacher => teacher.name).join(',')
    },
    getDivision: division => {
      return division ? division.title : ''
    },
    displayDate: date => {
      if (date) return moment(date).format('DD/MM')
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
    }
  }
}
</script>
