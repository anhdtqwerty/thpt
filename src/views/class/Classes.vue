<template>
  <div>
    <div class="pa-4 d-flex justify-space-between align-center">
      <div>
        <Breadcrumbs
          headline="Lớp học"
          :link="[{ text: 'Lớp học', href: '../classes' }]"
        />
      </div>
      <div class="flex-center">
        <v-btn color="primary" @click="dialog = !dialog"
          ><v-icon left>add</v-icon>{{ addButtonText }}</v-btn
        >
        <v-btn
          v-if="selected.length"
          color="green"
          @click="onUpdate('running')"
          dark
          class="mx-2"
          ><v-icon left>mdi-lock-open</v-icon>Mở</v-btn
        >
        <v-btn
          v-if="selected.length"
          color="gray"
          @click="onUpdate('done')"
          dark
          class="mr-2"
          ><v-icon left>mdi-lock</v-icon>Đóng</v-btn
        >
        <v-btn
          v-if="selected.length"
          color="red"
          @click="onRemove"
          dark
          ><v-icon left>mdi-delete</v-icon>Xóa</v-btn
        >
      </div>
    </div>
    <v-card class="px-md-6 mx-md-4 elevation-1">
      <v-data-table
        item-key="id"
        :headers="headers"
        :items="classes"
        :search="search"
        v-model="selected"
        show-select
        :disable-sort="$vuetify.breakpoint.smAndDown"
      >
        <div slot="top">
          <div class="d-flex justify-end">
            <drop-menu
              :default-headers="originHeaders"
              @change="headers = $event"
              v-if="$vuetify.breakpoint.mdAndUp"
            ></drop-menu>
            <span v-if="$vuetify.breakpoint.mdAndUp">
              <kebap-menu>
                <v-list>
                  <v-list-item>
                    <export-excel :custom-header="headers" api="/classes/" />
                  </v-list-item>
                </v-list>
              </kebap-menu>
            </span>
          </div>
          <div class="ma-2">
            <class-filter
              v-if="$vuetify.breakpoint.mdAndUp"
              @onFilterChanged="refresh"
            />
          </div>
          <div class="d-flex justify-end pa-0">
            <span v-if="$vuetify.breakpoint.smAndDown">
              <class-filter-dialog @onFilterChanged="refresh" />
            </span>
          </div>
        </div>
        <template v-slot:item.status="{ item }">
          <span v-if="item.status" :class="getColor(item.status)"
            >{{ item.status | classStatus }}
          </span>
        </template>
        <template v-slot:item.title="{ item }">
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <div v-on="on" style="text-decoration: none; white-space: nowrap">
                <router-link
                  v-on="on"
                  style="text-decoration: none; white-space: nowrap"
                  :to="'/class/' + item.id"
                  >{{ item.title }}</router-link
                >
              </div>
            </template>
            <span>Xem lớp</span>
          </v-tooltip>
        </template>
        <template v-slot:item.generation="{ item }">
          <p style="margin: 0; white-space: nowrap">
            {{ item.generation | getGeneration }}
          </p>
        </template>
        <template v-slot:item.division="{ item }">
          <p style="margin: 0; white-space: nowrap">
            {{ item.division | getDivision }}
          </p>
        </template>
        <template v-slot:item.teachers="{ item }">
          <p style="margin: 0; white-space: nowrap">
            {{ item | getTeacherNames }}
          </p>
        </template>
        <template v-slot:item.actions="{ item }">
          <class-list-actions :selected="item" />
        </template>
      </v-data-table>
    </v-card>
    <new-class-dialog :state="dialog" style="margin: 0 20px"></new-class-dialog>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'

import Breadcrumbs from '@/components/layout/Breadcrumbs'
import NewClassDialog from '@/modules/class/ClassNewDialog'
import ClassFilter from '@/modules/class/ClassFilter'
import ClassListActions from '@/modules/class/ClassListActions'
import ClassFilterDialog from '@/modules/class/ClassFilterDialog'
import ExportExcel from '@/components/basic/ExportExcel'
import KebapMenu from '@/components/basic/menu/KebapMenu'
import DropMenu from '@/modules/student/menu/Menu.vue'
import moment from 'moment'
import _ from 'lodash'

const originHeaders = [
  {
    text: 'Tên lớp',
    value: 'title',
    align: 'left',
    sortable: false,
    show: true,
  },
  {
    text: 'Phân ban',
    value: 'division',
    align: 'left',
    sortable: false,
    show: true,
  },
  {
    text: 'Giáo viên chủ nhiệm',
    value: 'teachers',
    align: 'left',
    sortable: false,
    show: true,
  },
  {
    text: 'Trạng thái',
    value: 'status',
    align: 'left',
    sortable: false,
    show: true,
  },
  {
    text: 'Ghi chú',
    value: 'note',
    align: 'left',
    sortable: false,
    show: true,
  },
]
export default {
  components: {
    ClassFilter,
    DropMenu,
    NewClassDialog,
    ClassFilterDialog,
    ClassListActions,
    Breadcrumbs,
    ExportExcel,
    KebapMenu,
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
      statuses: [
        { text: 'Active', value: 'false' },
        { text: 'Blocked', value: 'true' },
      ],
      range: { from: null, to: null },
      previewUserId: null,
      ready: false,
      editClassId: '',
      dialog: false,
      selected: [],
    }
  },
  async created() {
    await this.refresh({
      department: this.department.id,
      generation: this.currentGeneration.id,
      _sort: 'createdAt:desc',
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
    },
  },
  methods: {
    ...mapActions('class', [
      'fetchClasses',
      'setClass',
      'setClasses',
      'updateClasses',
      'removeClasses',
    ]),
    getColor(status) {
      if (status === 'opened') return 'primary--text'
      if (status === 'running') return 'green--text'
      else if (status === 'pending' || status === 'rejected') return 'red--text'
      else if (status === 'done') return 'gray--text'
      else return 'red'
    },
    getCourse: (course) => {
      return course || {}
    },
    refresh(query) {
      this.setClasses([])
      this.fetchClasses({
        department: this.department.id,
        generation: this.currentGeneration.id,
        ...query,
      })
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
        },
      })
    },
    onUpdate(status) {
      this.$dialog.confirm({
        title: 'Cập Nhật Lớp Học',
        text: `${this.selected.length} lớp học đã chọn`,
        okText: 'Có',
        cancelText: 'Không',
        done: async () => {
          await this.updateClasses(
            this.selected.map((c) => ({ id: c.id, status }))
          )
          this.selected = []
        },
      })
    },
  },
  filters: {
    studentCounter: (students) => {
      if (!students) {
        return 0
      }
      return students.length
    },
    classStatus: (status) => {
      if (status === 'opened') return 'Đang chờ'
      else if (status === 'running') return 'Đang Học'
      else if (status === 'done') return 'Kết Thúc'
      else return ''
    },
    getGeneration: (item) => {
      return _.get(item, 'name', '')
    },
    getRoom: (item) => {
      return _.get(item, 'title', '')
    },
    getTeacherNames: (classData) => {
      return classData.teachers.map((teacher) => teacher.name).join(',')
    },
    getDivision: (division) => {
      return division ? division.title : ''
    },
    displayDate: (date) => {
      if (date) return moment(date).format('DD/MM')
    },
  },
}
</script>

<style scoped>
.chip-width {
  min-width: 82px;
  justify-content: center;
}
</style>
