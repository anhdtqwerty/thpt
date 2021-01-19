<template>
  <div>
    <div class="pa-4 d-flex justify-space-between align-center">
      <div>
        <Breadcrumbs
          headline="Giáo viên"
          :link="[{ text: 'Giáo viên', href: '../teachers' }]"
        />
      </div>
      <div class="flex-center">
        <v-btn
          v-if="$vuetify.breakpoint.mdAndUp"
          class="mr-2"
          dark
          color="success"
        >
          <v-icon left>mdi-file-excel</v-icon> Xuất Excel
        </v-btn>
        <v-btn dark color="#0D47A1" @click.stop="createState = !createState">
          <v-icon left>add</v-icon>{{ titleBtn }}
        </v-btn>
      </div>
    </div>

    <v-card class="px-md-6 mx-md-4 elevation-1">
      <v-data-table
        :items-per-page="10"
        item-key="id"
        :headers="headers"
        :items="teachers"
        :loading="isLoading"
        loading-text="Đang Tải"
      >
        <div slot="top" class="py-md-6">
          <teacher-filter @onFilterChanged="refresh"></teacher-filter>
        </div>

        <template v-slot:[`item.name`]="{ item }">
          <user-item :teacher="item" :to="'teacher/' + item.id"></user-item>
        </template>
        <template v-slot:[`item.status`]="{ item }">
          <span v-if="item.status" :class="getColor(item.status)">
            {{
              item.status === 'active'
                ? 'Đang dạy'
                : item.status === 'block'
                ? 'Không dạy'
                : ''
            }}
          </span>
        </template>
        <template v-slot:[`item.metadata.type`]="{ item }">
          <span v-if="item.metadata.type">
            {{
              item.metadata.type === 'long-tern'
                ? 'Dài hạn'
                : item.metadata.type === 'short-tern'
                ? 'Ngắn hạn'
                : ''
            }}
          </span>
        </template>
        <template v-slot:[`item.subject`]="{ item }">
          <span v-if="item.subject">{{
            item.subject[item.subject.length - 1]
          }}</span>
        </template>
        <template v-slot:[`item.metadata.dob`]="{ item }">
          {{ formatDate(item.metadata.dob) }}
        </template>
        <template v-slot:[`item.gender`]="{ item }">
          {{ item.gender | getGender }}
        </template>
        <template v-slot:[`item.action`]="{ item }">
          <teacher-list-actions :item="item"></teacher-list-actions>
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
import TeacherFilterDialog from '@/modules/teacher/TeacherFilterDialog'
import TeacherListActions from '@/modules/teacher/TeacherListActions'
import NewTeacherDialog from '@/modules/teacher/TeacherNewDialog'
import Breadcrumbs from '@/components/layout/Breadcrumbs.vue'
import DropMenu from '@/modules/student/menu/Menu.vue'
import Vuetify from 'vuetify'
import Vue from 'vue'
const originHeaders = [
  {
    text: 'Họ tên',
    value: 'name',
    align: 'left',
    sortable: false,
    show: true,
  },
  {
    text: 'Ngày sinh',
    value: 'metadata.dob',
    align: 'left',
    sortable: false,
    show: true,
  },
  {
    text: 'Giới tính',
    value: 'gender',
    align: 'center',
    sortable: false,
    show: true,
    width: 10,
  },
  {
    text: 'Loại cán bộ',
    value: 'metadata.type',
    align: 'left',
    sortable: false,
    show: true,
    width: 100,
  },
  {
    text: 'Lĩnh vực',
    value: 'subject',
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
    width: 10,
  },
  {
    text: 'Ghi chú',
    value: 'metadata.notes',
    align: 'left',
    sortable: false,
    show: true,
  },
  {
    text: 'Hành động',
    value: 'action',
    align: 'center',
    sortable: false,
    show: true,
    width: 10,
  },
]
Vue.use(Vuetify)

export default {
  components: {
    Breadcrumbs,
    UserItem,
    TeacherFilter,
    TeacherListActions,
    TeacherFilterDialog,
    NewTeacherDialog,
    DropMenu,
  },
  data() {
    return {
      headers: originHeaders,
      isLoading: false,
      originHeaders: originHeaders,
      createState: false,
      filterState: false,
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
    },
  },
  methods: {
    ...mapActions('teacher', ['fetchTeachers', 'setTeachers']),
    getColor(status) {
      if (status === 'active') return 'green--text'
      if (status === 'block') return 'red--text'
      else return 'gray--text'
    },
    formatDate(date) {
      return moment(date).format('DD/MM/YYYY')
    },
    refresh(query) {
      this.isLoading = true
      this.fetchTeachers({ ...query, department: this.department.id }).then(
        () => {
          this.isLoading = false
        }
      )
    },
  },
  filters: {
    getGender(gender) {
      if (gender === 'male') {
        return 'Nam'
      } else if (gender === 'female') {
        return 'Nữ'
      }
    },
  },
}
</script>
