<template>
  <div>
    <div class="pa-4 d-flex justify-space-between align-center">
      <div>
        <Breadcrumbs headline="Lớp học" :link="[{ text: 'Lớp học', href: '../classes' }]" />
      </div>
      <div class="flex-center">
        <v-btn v-if="$vuetify.breakpoint.mdAndUp" class="mr-2" outlined color="success" @click="exportExcel">
          <v-icon left>mdi-file-excel</v-icon> Xuất Excel
        </v-btn>
        <v-btn color="primary" @click="dialog = !dialog"><v-icon left>add</v-icon>{{ addButtonText }}</v-btn>
        <v-btn v-if="selected.length" dark color="amber" @click="sendState = !sendState" class="mx-2">
          <v-icon left>mdi-message-processing</v-icon>Gửi SMS
        </v-btn>
        <v-btn v-if="selected.length" color="green" @click="onUpdate('running')" dark class="mr-2"
          ><v-icon left>mdi-lock-open</v-icon>Mở</v-btn
        >
        <v-btn v-if="selected.length" color="gray" @click="onUpdate('done')" dark class="mr-2"
          ><v-icon left>mdi-lock</v-icon>Đóng</v-btn
        >
        <v-btn v-if="selected.length" color="red" @click="onRemove" dark><v-icon left>mdi-delete</v-icon>Xóa</v-btn>
      </div>
    </div>

    <v-card outlined class="py-md-4 px-md-6 mx-md-4 mb-6 elevation-0">
      <class-filter @onFilterChanged="refresh" />
    </v-card>

    <v-card outlined class="mx-md-4 elevation-0">
      <ClassesDataTable ref="classesDataTable" />
    </v-card>

    <new-class-dialog :state="dialog" @done="requestPageSettings({})" style="margin: 0 20px"></new-class-dialog>
    <classes-send-s-m-s-dialog :data="selected" :state="sendState"></classes-send-s-m-s-dialog>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'

import Breadcrumbs from '@/components/layout/Breadcrumbs'
import NewClassDialog from '@/modules/class/ClassNewDialog'
import ClassFilter from '@/modules/class/ClassFilter'
import ClassesSendSMSDialog from '@/modules/sms/ClassesSendSMSDialog'
import moment from 'moment'
import { get } from 'lodash'
import utils from '@/plugins/utils'
import ClassesDataTable from '@/modules/class/ClassesDataTable.vue'

export default {
  components: {
    ClassFilter,
    NewClassDialog,
    Breadcrumbs,
    ClassesSendSMSDialog,
    ClassesDataTable
  },
  props: {
    role: String
  },
  data() {
    return {
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
      selected: [],
      sendState: false
    }
  },
  computed: {
    ...mapState('class', ['classData', 'classesData', 'classSearchParams']),
    ...mapState('app', ['department', 'currentGeneration']),
    ...mapGetters('class', ['classes']),
    addButtonText() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
        case 'sm':
          return 'Thêm'
        default:
          return 'Thêm lớp học'
      }
    }
  },
  methods: {
    ...mapActions('class', [
      'fetchClasses',
      'setClass',
      'setClasses',
      'updateClasses',
      'removeClasses',
      'requestPageSettings'
    ]),

    async refresh(query) {
      this.$refs.classesDataTable.refresh(query)
    },
    getColor(classStatus) {
      switch (classStatus) {
        case 'running':
          return '#46BE8A'
        default:
          return 'primary'
      }
    },
    async exportExcel() {
      const excelHeader = this.$refs.classesDataTable.headers.map(({ text, value }) => ({ text, value }))
      const filters = this.$options.filters
      // map on an array modify the original array => need to clone a new array
      const classes = await this.fetchClasses({ ...this.classSearchParams, _limit: -1 })
      const classesData = JSON.parse(JSON.stringify(classes))
      const data = classesData.map(item => {
        item.division = filters.getDivision(item.division)
        item.teachers = filters.getTeacherNames(item)
        item.status = filters.classStatus(item.status)
        item.studentCount = filters.studentCounter(item.students)
        return item
      })
      utils.exportExcel(data, excelHeader, 'Classes_List')
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
  }
}
</script>

<style scoped>
.chip-width {
  min-width: 82px;
  justify-content: center;
}
</style>
