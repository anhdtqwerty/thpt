<template>
  <div>
    <div class="pa-4 pa-md-2 d-flex justify-space-between align-center">
      <div>
        <Breadcrumbs
          headline="Giáo viên"
          :link="[
            { text: 'Giáo viên', href: '../teachers' },
            ]"
        />
      </div>
      <div class="flex-center">
        <v-btn dark color="#0D47A1" @click.stop="createState = !createState">
          <v-icon left>add</v-icon>{{ titleBtn }}
        </v-btn>
      </div>
    </div>

    <v-card class="pa-2 pa-md-4 ma-md-2 elevation-1">
      <v-data-table
        :items-per-page="5"
        item-key="id"
        :headers="headers"
        :items="teachers"
        :loading="isLoading"
        loading-text="Đang Tải"
        :search="search"
        dense
      >
        <div slot="top" class="d-flex mb-4">
          <div v-if="!$vuetify.breakpoint.mobile">
            <teacher-filter @onFilterChanged="refresh"></teacher-filter>
          </div>
          <v-spacer></v-spacer>
          <div>
            <v-btn
              v-if="$vuetify.breakpoint.mobile"
              icon
              @click.stop="filterState = !filterState"
            >
              <v-icon right>mdi-filter-outline</v-icon>
            </v-btn>
             <drop-menu
              :default-headers="originHeaders"
              @change="headers = $event"
              v-if="$vuetify.breakpoint.mdAndUp"
            ></drop-menu>
          </div>
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
        <template v-slot:[`item.actions`]="{ item }">
          <teacher-list-actions :item="item"></teacher-list-actions>
        </template>
      </v-data-table>
    </v-card>
    <new-teacher-dialog :state="createState" />
  </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import UserItem from '@/components/basic/card/CardTeacherName.vue'
import TeacherFilter from '@/modules/teacher/TeacherFilter.vue'
import TeacherListActions from '@/modules/teacher/TeacherListActions'
import NewTeacherDialog from '@/modules/teacher/TeacherNewDialog'
import Breadcrumbs from '@/components/layout/Breadcrumbs.vue'
import SettingTableHeader from '@/components/basic/table/SettingHeaders'
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
    value: 'data.dob',
    align: 'left',
    sortable: false,
    show: true,
  },
  {
    text: 'Giới tính',
    value: 'gender',
    align: 'left',
    sortable: false,
    show: true,
  },
  {
    text: 'Loại cán bộ',
    value: 'type',
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
  { text: 'Hành động', value: 'actions', show: true },
]
Vue.use(Vuetify)

export default {
  components: {
    Breadcrumbs,
    UserItem,
    TeacherFilter,
    TeacherListActions,
    NewTeacherDialog,
    DropMenu
  },
  data() {
    return {
      headers: originHeaders,
      search: '',
      teacherId: '',
      isLoading: false,
      originHeaders: originHeaders,
      createState: false,
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
    refresh(query) {
      this.isLoading = true
      this.fetchTeachers({ ...query, department: this.department.id }).then(
        () => {
          this.isLoading = false
        }
      )
    },
  },
}
</script>
