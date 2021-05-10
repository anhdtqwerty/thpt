<template>
  <div>
    <div class="pa-4 d-flex justify-space-between align-center">
      <div>
        <Breadcrumbs headline="Lớp học" :link="[{ text: 'Lớp học', href: '../classes' }]" />
      </div>
      <div class="flex-center">
        <v-btn v-if="$vuetify.breakpoint.mdAndUp" class="mr-2" outlined color="success">
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
    <v-card class="px-md-6 mx-md-4 elevation-1">
      <v-data-table
        item-key="id"
        :headers="headers"
        :items="classes"
        :search="search"
        v-model="selected"
        :loading="loading"
        show-select
        :disable-sort="$vuetify.breakpoint.smAndDown"
      >
        <div slot="top" class="py-md-6">
          <class-filter @onFilterChanged="refresh" />
        </div>
        <template v-slot:[`item.status`]="{ item }">
          <span v-if="item.status" :class="getColor(item.status)">{{ item.status | classStatus }} </span>
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
        <template v-slot:[`item.generation`]="{ item }">
          <p style="margin: 0; white-space: nowrap">
            {{ item.generation | getGeneration }}
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
        <template v-slot:[`item.actions`]="{ item }">
          <ClassListActions :selected="item" />
        </template>
      </v-data-table>
    </v-card>
    <new-class-dialog :state="dialog" style="margin: 0 20px"></new-class-dialog>
    <classes-send-s-m-s-dialog :data="selected" :state="sendState"></classes-send-s-m-s-dialog>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'

import Breadcrumbs from '@/components/layout/Breadcrumbs'
import NewClassDialog from '@/modules/class/ClassNewDialog'
import ClassFilter from '@/modules/class/ClassFilter'
import ClassListActions from '@/modules/class/ClassListActions'
import ClassesSendSMSDialog from '@/modules/sms/ClassesSendSMSDialog'
import moment from 'moment'
import _ from 'lodash'

const originHeaders = [
  {
    text: 'Tên lớp',
    value: 'title',
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
    text: 'Trạng thái',
    value: 'status',
    align: 'left',
    sortable: false,
    show: true
  },
  {
    text: 'Ghi chú',
    value: 'note',
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
  components: {
    ClassFilter,
    NewClassDialog,
    ClassListActions,
    Breadcrumbs,
    ClassesSendSMSDialog
  },
  props: {
    role: String
  },
  data() {
    return {
      headers: originHeaders,
      originHeaders: originHeaders,
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
  async created() {
    await this.refresh({
      department: this.department.id,
      generation: this.currentGeneration.id
    })
  },
  computed: {
    ...mapState('class', ['classData']),
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
    ...mapActions('class', ['fetchClasses', 'setClass', 'setClasses', 'updateClasses', 'removeClasses']),
    getColor(status) {
      if (status === 'opened') return 'primary--text'
      if (status === 'running') return 'green--text'
      else if (status === 'pending' || status === 'rejected') return 'red--text'
      else if (status === 'done') return 'gray--text'
      else return 'red'
    },
    getCourse: course => {
      return course || {}
    },
    async refresh(query) {
      this.loading = true
      await this.setClasses([])
      await this.fetchClasses({
        department: this.department.id,
        generation: this.currentGeneration.id,
        ...query,
        _sort: 'createdAt:desc, startTime:desc'
      })
      this.loading = false
    },
    onRemove() {
      this.$dialog.confirm({
        title: 'Xóa Lớp Học',
        text: `Bạn Có chắc muốn xóa những Lớp học này.? ${this.selected.length} lớp học đã chọn`,
        okText: 'Có',
        cancelText: 'Không',
        done: async () => {
          await this.removeClasses(this.selected)
          this.selected = []
          this.$emit('removed')
        }
      })
    },
    onUpdate(status) {
      this.$dialog.confirm({
        title: 'Cập Nhật Lớp Học',
        text: `${this.selected.length} lớp học đã chọn`,
        okText: 'Có',
        cancelText: 'Không',
        done: async () => {
          await this.updateClasses(this.selected.map(c => ({ id: c.id, status })))
          this.selected = []
        }
      })
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
      return _.get(item, 'name', '')
    },
    getRoom: item => {
      return _.get(item, 'title', '')
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
