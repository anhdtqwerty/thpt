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
      <student-filter @onFilterChanged="refresh" />
    </v-card>

    <v-card outlined class="mx-md-4 elevation-0">
      <student-data-table ref="studentDataTable" :selected.sync="selected" />
    </v-card>

    <student-new-dialog :state="createState" @done="requestPageSettings({})" />
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
      selected: []
    }
  },
  computed: {
    ...mapState('app', ['department']),
    ...mapState('students', ['students']),
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
    exportExcel() {
      const excelHeader = this.$refs.studentDataTable.headers.map(({ text, value }) => ({ text, value }))
      utils.exportExcel(this.students, excelHeader, 'Student_List')
    }
  }
}
</script>
<style scoped>
td {
  white-space: nowrap !important   ;
}
</style>
