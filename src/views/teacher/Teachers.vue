<template>
  <div>
    <v-row class="mx-2 justify-space-between align-center">
      <v-col cols="8" class="md-6 px-0 py-2">
        <h2>Giáo viên</h2>
        <breadcrumbs />
      </v-col>
      
      <v-col cols="4" class="text-right md-6 px-0 py-2">
        <v-btn medium class="teacher-btn" color="success" @click="createState=!createState">
          <v-icon left>add</v-icon>
          <span>{{titleBtn}}</span>
        </v-btn>
      </v-col>
    </v-row>

    <v-card class="px-md-6 px-2 mx-md-2">
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
        <template v-slot:top>
          <v-row>
            <v-col cols="10" md="6">
              <teacher-filter @onFilterChanged="refresh"> </teacher-filter>
            </v-col>

            <v-col class="text-right" cols="2" md="6">
              <setting-table-header :default-headers="originHeaders" @change="headers = $event"/>
              <KebapMenu v-if="!$vuetify.breakpoint.xs">
                <v-list>
                  <v-list-item>
                    <export-excel :custom-header="headers" api="/teachers/" />
                  </v-list-item>
                </v-list>
              </KebapMenu>
            </v-col>
          </v-row>
        </template>

        <template v-slot:[`item.name`]="{ item }">
          <user-item :teacher="item" :to="'teacher/' + item.id"></user-item>
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
import Breadcrumbs from '@/components/basic/Breadcrumbs'
import SettingTableHeader from '@/components/basic/table/SettingHeaders'
import ExportExcel from '@/components/basic/ExportExcel'
import KebapMenu from '@/components/basic/menu/KebapMenu.vue'
import Vuetify from 'vuetify'
import Vue from 'vue'
const originHeaders = [
  {
    text: 'Họ tên',
    value: 'name',
    align: 'left',
    sortable: false,
    class: 'font-weight-black',
    show: true 
  },
  {
    text: 'Số Điện Thoại',
    value: 'phone',
    align: 'left',
    sortable: false,
    class: 'font-weight-black',
    show: true 
  },
  {
    text: 'Email',
    value: 'email',
    align: 'left',
    sortable: false,
    class: 'font-weight-black',
    show: true 
  },
  { text: 'Hành động', value: 'actions', show: true }
]
Vue.use(Vuetify)

export default {
  components: {
    Breadcrumbs,
    UserItem,
    TeacherFilter,
    TeacherListActions,
    SettingTableHeader,
    ExportExcel,
    KebapMenu,
    NewTeacherDialog
  },
  data() {
    return {
      headers: [],
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
    titleBtn () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
        case 'sm': return 'Thêm'
        default: return 'Thêm Giáo viên'
      }
    }    
  },
  methods: {
    ...mapActions('teacher', [
      'fetchTeachers',
      'setTeachers',
    ]),
    refresh(query) {
      this.isLoading = true
      this.fetchTeachers({ ...query, department: this.department.id }).then(() => {
        this.isLoading = false
      })
    },
  },
}
</script>

