<template>
  <div>
    <div class="pa-4 d-flex justify-space-between align-center">
      <div>
        <Breadcrumbs headline="Danh sách học sinh" :link="[{ text: 'Học sinh', href: '../students' }]" />
      </div>
      <div class="flex-center">
        <v-btn v-if="$vuetify.breakpoint.mdAndUp" class="mr-2" outlined color="primary" @click="exportExcel">
          <v-icon left>mdi-file-excel</v-icon> Xuất Excel
        </v-btn>
        <v-btn depressed dark color="#0D47A1" @click.stop="createState = !createState">
          <v-icon left>add</v-icon>{{ btnTitle }}
        </v-btn>
      </div>
    </div>

    <v-card outlined class="py-md-4 px-md-6 mx-md-4 mb-6 elevation-0">
      <student-filter :defaultFilters="defaultStudentFilters" @onFilterChanged="refresh" />
    </v-card>

    <v-card outlined class="mx-md-4 elevation-0">
      <student-data-table ref="studentDataTable" :selected.sync="selected" />
    </v-card>

    <student-new-dialog :state="createState" @done="studentAdded" />
    <!-- <student-send-s-m-s-dialog
      :data="selected"
      :state="sendState"
    ></student-send-s-m-s-dialog> -->
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import StudentFilter from '@/modules/student/StudentFilter'
import StudentNewDialog from '@/modules/student/StudentNewDialog'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
// import StudentSendSMSDialog from '@/modules/sms/StudentSendSMSDialog'
import StudentDataTable from '@/modules/student/StudentDataTable'
import utils from '@/plugins/utils'

export default {
  components: {
    StudentNewDialog,
    StudentFilter,
    Breadcrumbs,
    // StudentSendSMSDialog,
    StudentDataTable
  },
  props: {
    role: String
  },
  data() {
    return {
      createState: false,
      sendState: false,
      selected: [],
      defaultStudentFilters: {}
    }
  },
  computed: {
    ...mapState('app', ['department']),
    ...mapState('students', ['students', 'studentSearchParams']),
    btnTitle() {
      if (this.$vuetify.breakpoint.smAndDown) {
        return 'Thêm'
      } else {
        return 'Thêm học sinh'
      }
    }
  },
  methods: {
    ...mapActions('students', [
      'requestPageSettings',
      'searchStudents',
      'updateStudent',
      'removeStudents',
      'fetchStudents'
    ]),
    refresh(query) {
      this.$refs.studentDataTable.refresh(query)
    },
    onRemove() {
      this.$dialog.confirm({
        title: 'Xóa Học Sinh',
        text: `Bạn Có chắc muốn xóa những học sinh này.? ${this.selected.length} học sinh đã chọn`,
        okText: 'Có',
        cancelText: 'Không',
        done: async () => {
          await this.removeStudents(this.selected)
          this.selected = []
          this.$emit('removed')
        }
      })
    },
    async exportExcel() {
      const excelHeader = this.$refs.studentDataTable.headers.map(({ text, value }) => ({ text, value }))
      const filters = this.$refs.studentDataTable.$options.filters
      const list = await this.fetchStudents({ ...this.studentSearchParams, _limit: -1 })
      const students = JSON.parse(JSON.stringify(list))
      const data = students.map(item => {
        item.status = filters.getStatus(item.status)
        item.currentClass = filters.getCurrentClass(item.currentClass)
        item.gender = filters.gender(item.gender)
        item.dob = filters.ddmmyyyy(item.dob)
        return item
      })
      utils.exportExcel(data, excelHeader, 'Student_List')
    },
    async studentAdded(student) {
      const code = this.$options.filters.getStudentCode(student.code)
      this.defaultStudentFilters = { code }
      await this.searchStudents({ code_contains: code })
    }
  }
}
</script>
<style scoped>
td {
  white-space: nowrap !important   ;
}
</style>
