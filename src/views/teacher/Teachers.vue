<template>
  <div>
    <div class="pa-4 d-flex justify-space-between align-center">
      <div>
        <Breadcrumbs headline="Danh sách giáo viên" :link="[{ text: 'Giáo viên', href: '../teachers' }]" />
      </div>
      <div class="flex-center">
        <v-btn v-if="$vuetify.breakpoint.mdAndUp" class="mr-2" outlined @click="exportExcel" color="primary">
          <v-icon left>mdi-file-excel</v-icon> Xuất Excel
        </v-btn>
        <v-btn depressed dark color="#0D47A1" @click.stop="createState = !createState">
          <v-icon left>add</v-icon>{{ titleBtn }}
        </v-btn>
      </div>
    </div>

    <v-card outlined class="py-md-4 px-md-6 mx-md-4 mb-6 elevation-0">
      <teacher-filter @onFilterChanged="refresh" ref="teacherFilter"></teacher-filter>
    </v-card>
    <v-card outlined class="py-md-4 px-md-6 mx-md-4 mb-6 elevation-0">
      <TeacherDataTable ref="teacherDataTable"
    /></v-card>
    <v-card outlined class="mx-md-4 elevation-0"> </v-card>
    <TeacherNewDialog :state="createState" @done="onFilter" />
  </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import TeacherFilter from '@/modules/teacher/TeacherFilter.vue'
import TeacherNewDialog from '@/modules/teacher/TeacherNewDialog'
import TeacherDataTable from '@/modules/teacher/TeacherDataTable'
import Breadcrumbs from '@/components/layout/Breadcrumbs.vue'
import Vuetify from 'vuetify'
import Vue from 'vue'
import utils from '@/plugins/utils'
import { map } from 'lodash'
Vue.use(Vuetify)

export default {
  components: {
    Breadcrumbs,
    TeacherDataTable,
    TeacherFilter,
    TeacherNewDialog
  },
  data() {
    return {
      isLoading: false,
      createState: false,
      allTeachers: [],
      teachings: []
    }
  },
  computed: {
    ...mapState('teacher', ['teacher']),
    ...mapGetters('app', ['commonQuery']),
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
  async created() {
    this.teachings = await this.fetchTeachings({ ...this.commonQuery })
    this.allTeachers = await this.fetchTeachers()
  },
  methods: {
    ...mapActions('teachers', ['fetchTeachers']),
    ...mapActions('teaching', ['fetchTeachings']),
    async refresh(query) {
      try {
        this.$loading.active = true
        this.teachings = await this.fetchTeachings({ ...this.commonQuery })
        this.allTeachers = await this.fetchTeachers()
        this.$refs.teacherDataTable.refresh(query)
      } catch {
        this.$loading.active = false
      }
    },
    onFilter() {
      this.$refs.teacherFilter.onFilterChanged()
    },
    async exportExcel() {
      let excelHeader = this.$refs.teacherDataTable.headers.map(({ text, value }) => ({ text, value }))
      excelHeader = excelHeader.filter(excel => excel.value !== 'action')
      const filters = this.$options.filters
      const teacherTableFilters = this.$refs.teacherDataTable.$options.filters
      const teachingsData = map(this.teachings, 'teacher.id')
      const teachers = JSON.parse(JSON.stringify(this.allTeachers))
      const data = teachers.map(item => {
        if (item.metadata) {
          item.metadata.dob = filters.ddmmyyyy(item.metadata.dob)
        }
        item.gender = filters.gender(item.gender)
        item.status = filters.teacherStatus(item.status)
        item.classTeaching = teacherTableFilters.getClassesTeaching(item, teachingsData)
        item.ownClasses = item.ownClasses ? item.ownClasses.length : 0
        return item
      })
      utils.exportExcel(data, excelHeader, 'Teacher_List')
    }
  }
}
</script>
