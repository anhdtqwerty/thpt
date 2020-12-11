<template>
  <div :class="{ 'px-3': $vuetify.breakpoint.mdAndUp }">
    <v-row
      :class="{
        'px-2 mt-2': $vuetify.breakpoint.smAndDown,
        'mx-n2': $vuetify.breakpoint.mdAndUp
      }"
      no-gutters
    >
      <v-col>
        <Breadcrumbs
          headline="Dach sách lớp"
          :link="[{ text: 'Danh sách lớp', href: '../classes' }]"
        />
      </v-col>
      <v-col class="d-flex justify-end pt-4">
        <v-btn color="primary" @click="dialog = !dialog"
          ><v-icon left>add</v-icon>{{ addButtonText }}</v-btn
        >
      </v-col>
    </v-row>
    <v-card class="px-4">
      <v-row>
        <v-col cols="12" md="11">
          <class-filter
            v-if="$vuetify.breakpoint.mdAndUp"
            @onFilterChanged="refresh"
          />
        </v-col>
        <v-col cols="12" md="1">
          <span v-if="$vuetify.breakpoint.smAndDown">
            <class-filter-dialog @onFilterChanged="refresh" />
          </span>
          <setting-table-header
            :default-headers="originHeaders"
            @change="headers = $event"
          />
          <span v-if="$vuetify.breakpoint.mdAndUp">
            <kebap-menu>
              <v-list>
                <v-list-item>
                  <export-excel :custom-header="headers" api="/classes/" />
                </v-list-item>
              </v-list>
            </kebap-menu>
          </span>
        </v-col>
      </v-row>

      <v-row :class="{ 'mt-n5': $vuetify.breakpoint.smAndDown }">
        <v-col>
          <v-data-table
            item-key="id"
            :headers="headers"
            :items="classes"
            :search="search"
            :disable-sort="$vuetify.breakpoint.smAndDown"
          >
            <template v-slot:item.status="{ item }">
              {{ item.status | classStatus }}
            </template>
            <template v-slot:item.title="{ item }">
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <div
                    v-on="on"
                    style="text-decoration: none; white-space: nowrap"
                  >
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
            <template v-slot:item.tags="{ item }">
              <p style="margin: 0; white-space: nowrap">{{ item.tags }}</p>
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
        </v-col>
      </v-row>
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
import SettingTableHeader from '@/components/basic/table/SettingHeaders'
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
  { text: 'Ghi chú', value: 'note', align: 'left', sortable: false, show: true }
]
export default {
  components: {
    ClassFilter,
    SettingTableHeader,
    NewClassDialog,
    ClassFilterDialog,
    ClassListActions,
    Breadcrumbs,
    ExportExcel,
    KebapMenu
  },
  props: {
    role: String
  },
  data() {
    return {
      headers: [],
      originHeaders: originHeaders,
      draw: false,
      search: '',
      status: null,
      statuses: [
        { text: 'Active', value: 'false' },
        { text: 'Blocked', value: 'true' }
      ],
      range: { from: null, to: null },
      previewUserId: null,
      ready: false,
      editClassId: '',
      dialog: false
    }
  },
  async created() {
    console.log(this.currentGeneration.id)
    await this.refresh({
      department: this.department.id,
      generation: this.currentGeneration.id,
      _sort: 'createdAt:desc'
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
    ...mapActions('class', ['fetchClasses', 'setClass', 'setClasses']),
    getColor(status) {
      if (status === 'opened') return 'primary'
      if (status === 'running') return 'green'
      else if (status === 'pending' || status === 'rejected') return 'red'
      else if (status === 'done') return 'gray'
      else return 'red'
    },
    getCourse: course => {
      return course || {}
    },
    refresh(query) {
      this.setClasses([])
      this.fetchClasses({
        department: this.department.id,
        generation: this.currentGeneration.id,
        ...query
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
