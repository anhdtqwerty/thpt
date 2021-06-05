<template>
  <div>
    <div class="pa-4 d-flex justify-space-between align-center">
      <div>
        <Breadcrumbs headline="Giáo viên" :link="[{ text: 'Giáo viên', href: '../teachers' }]" />
      </div>
      <div class="flex-center">
        <v-btn v-if="$vuetify.breakpoint.mdAndUp" class="mr-2" outlined @click="exportExcel" color="success">
          <v-icon left>mdi-file-excel</v-icon> Xuất Excel
        </v-btn>
        <v-btn depressed dark color="#0D47A1" @click.stop="createState = !createState">
          <v-icon left>add</v-icon>{{ titleBtn }}
        </v-btn>
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
          <teacher-filter @onFilterChanged="refresh"></teacher-filter>
        </div>

        <template v-slot:[`item.name`]="{ item }">
          <user-item :teacher="item" :to="'teacher/' + item.id"></user-item>
        </template>
        <template v-slot:[`item.status`]="{ item }">
          <span v-if="item.status" :class="getColor(item.status)">
            {{ item.status | getStatus }}
          </span>
        </template>
        <template v-slot:[`item.metadata.type`]="{ item }">
          <span v-if="item.metadata.type">
            {{ item.metadata.type | getTeacherType }}
          </span>
        </template>
        <template v-slot:[`item.subject`]="{ item }">
          <span v-if="item.subject">{{ item.subject | getTeacherSubject }}</span>
        </template>
        <template v-slot:[`item.metadata.dob`]="{ item }">
          {{ item.metadata.dob | ddmmyyyy }}
        </template>
        <template v-slot:[`item.gender`]="{ item }">
          {{ item.gender | gender }}
        </template>
      </v-data-table>
    </v-card>
    <new-teacher-dialog :state="createState" />
  </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import moment from 'moment'
import UserItem from '@/components/basic/card/CardTeacherName.vue'
import TeacherFilter from '@/modules/teacher/TeacherFilter.vue'
import NewTeacherDialog from '@/modules/teacher/TeacherNewDialog'
import Breadcrumbs from '@/components/layout/Breadcrumbs.vue'
import Vuetify from 'vuetify'
import Vue from 'vue'
import utils from '@/plugins/utils'
const originHeaders = [
  {
    text: 'Họ tên',
    value: 'name',
    align: 'left',
    sortable: true,
    show: true
  },
  {
    text: 'Ngày sinh',
    value: 'metadata.dob',
    align: 'center',
    sortable: false,
    show: true
  },
  {
    text: 'Giới tính',
    value: 'gender',
    align: 'center',
    sortable: false,
    show: true,
    width: 100
  },
  {
    text: 'Loại cán bộ',
    value: 'metadata.type',
    align: 'center',
    sortable: false,
    show: true,
    width: 100
  },
  {
    text: 'Lĩnh vực',
    value: 'subject',
    align: 'left',
    sortable: false,
    show: true,
    width: 100
  },
  {
    text: 'Trạng thái',
    value: 'status',
    align: 'left',
    sortable: false,
    show: true,
    width: 100
  },
  {
    text: 'Ghi chú',
    value: 'metadata.notes',
    align: 'left',
    sortable: false,
    show: true
  }
]
Vue.use(Vuetify)

export default {
  components: {
    Breadcrumbs,
    UserItem,
    TeacherFilter,
    NewTeacherDialog
  },
  data() {
    return {
      headers: originHeaders,
      isLoading: false,
      originHeaders: originHeaders,
      createState: false,
      filterState: false
    }
  },
  created() {
    this.isLoading = true
    this.fetchTeachers({ department: this.department.id }).then(() => {
      this.isLoading = false
    })
  },
  computed: {
    ...mapGetters('teacher', ['teachers', 'teacher']),
    ...mapState('app', ['department']),
    titleBtn() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
        case 'sm':
          return 'Thêm'
        default:
          return 'Thêm Giáo viên'
      }
    }
  },
  methods: {
    ...mapActions('teacher', ['fetchTeachers', 'setTeachers']),
    getColor(status) {
      if (status === 'active') return 'green--text'
      if (status === 'block') return 'red--text'
      else return 'gray--text'
    },
    refresh(query) {
      this.isLoading = true
      this.fetchTeachers({ ...query, department: this.department.id }).then(() => {
        this.isLoading = false
      })
    },
    exportExcel() {
      const excelHeader = this.headers.map(({ text, value }) => ({ text, value }))
      const filters = this.$options.filters
      // map on an array modify the original array => need to clone a new array
      const teacherss = JSON.parse(JSON.stringify(this.teachers))
      const data = teacherss.map(item => {
        item.gender = filters.gender(item.gender)
        if (item.subject) {
          item.subject = filters.getTeacherSubject(item.subject)
        }
        item.metadata.dob = filters.ddmmyyyy(item.metadata.dob)
        item.metadata.type = filters.getTeacherType(item.metadata.type)
        item.status = filters.getStatus(item.status)
        return item
      })
      utils.exportExcel(data, excelHeader, 'Teacher_List')
    }
  },
  filters: {
    getTeacherType(type) {
      return type === 'long-tern' ? 'Dài hạn' : type === 'short-tern' ? 'Ngắn hạn' : ''
    },
    getStatus(status) {
      return status === 'active' ? 'Đang dạy' : status === 'block' ? 'Không dạy' : ''
    },
    getTeacherSubject(subject) {
      return subject[subject.length - 1]
    }
  }
}
</script>
