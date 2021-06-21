<template>
  <div>
    <v-card class="mb-3" :flat="$vuetify.breakpoint.smAndDown">
      <v-tabs v-model="tab">
        <v-tab :key="1"> Học sinh</v-tab>
        <v-tab :key="2"> Phụ huynh </v-tab>
        <v-tab :key="3"> Giáo viên </v-tab>
        <v-tab :key="4"> Thống kê báo cáo </v-tab>
      </v-tabs>
    </v-card>

    <v-card :flat="$vuetify.breakpoint.smAndDown">
      <v-tabs-items v-model="tab">
        <v-tab-item :key="1">
          <v-card>
            <div class="d-flex justify-end align-end ">
              <v-btn
                v-if="$vuetify.breakpoint.mdAndUp"
                class="mt-4 mr-4"
                outlined
                color="primary"
                @click="exportExcel('STUDENT_TABLE')"
              >
                <v-icon left>mdi-file-excel</v-icon> Xuất Excel
              </v-btn>
            </div>
            <student-table disableSort mobile-breakpoint="0" ref="studentTable" />
          </v-card>
        </v-tab-item>
        <v-tab-item :key="2">
          <v-card>
            <div class="d-flex justify-end align-end ">
              <v-btn
                v-if="$vuetify.breakpoint.mdAndUp"
                class="mt-4 mr-4"
                outlined
                color="primary"
                @click="exportExcel('PARENT_TABLE')"
              >
                <v-icon left>mdi-file-excel</v-icon> Xuất Excel
              </v-btn>
            </div>
            <ParentDataTable disableSort mobile-breakpoint="0" ref="parentDataTable" />
          </v-card>
        </v-tab-item>
        <v-tab-item :key="3">
          <div>
            <v-card outlined class="ma-8 pa-5">
              <h4>Giáo viên chủ nhiệm</h4>
              <CardOwnClassTeacherInfo
                v-for="(value, index) in classData.headTeachers"
                :ownClassTeacher="value"
                :key="index"
              />
            </v-card>
            <div class="d-flex justify-space-between align-center ma-8">
              <h3>Giáo viên bộ môn</h3>
              <v-btn v-if="$vuetify.breakpoint.mdAndUp" outlined color="primary" @click="exportExcel('TEACHER_TABLE')">
                <v-icon left>mdi-file-excel</v-icon> Xuất Excel
              </v-btn>
            </div>
            <v-card class="ma-8" outlined>
              <TeacherTable disableSort mobile-breakpoint="0" ref="teacherTable" />
            </v-card>
          </div>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script>
import StudentTable from '@/modules/class/student/StudentTable.vue'
import TeacherTable from '@/modules/class/teacher/TeacherTable.vue'
import ParentDataTable from '@/modules/class/ParentDataTable.vue'
import CardOwnClassTeacherInfo from '@/components/basic/card/CardOwnClassTeacherInfo.vue'
import { mapGetters, mapState } from 'vuex'
import utils from '@/plugins/utils'
export default {
  data() {
    return {
      tab: null
    }
  },
  components: {
    CardOwnClassTeacherInfo,
    StudentTable,
    ParentDataTable,
    TeacherTable
  },
  methods: {
    exportExcel(tableName) {
      const filters = this.$options.filters
      let excelHeader, fileName, data
      switch (tableName) {
        case 'STUDENT_TABLE':
          excelHeader = this.$refs.studentTable.headers.map(({ text, value }) => ({ text, value }))
          const students = JSON.parse(JSON.stringify(this.students))
          data = students.map((item, index) => {
            item.index = index + 1
            item.status = filters.status(item.status)
            item.dob = filters.ddmmyyyy(item.dob)
            item.gender = filters.gender(item.gender)
            return item
          })
          fileName = 'Class_Student_List'
          break
        case 'PARENT_TABLE':
          excelHeader = this.$refs.parentDataTable.headers.map(({ text, value }) => ({ text, value }))
          fileName = 'Parent_List'
          break
        case 'TEACHER_TABLE':
          console.log('Ggs')
          excelHeader = this.$refs.teacherTable.headers.map(({ text, value }) => ({ text, value }))
          data = this.teachings
          fileName = 'Teacher_List'
      }
      utils.exportExcel(data, excelHeader, fileName)
    }
  },
  computed: { ...mapGetters('classDetail', ['students', 'classData']), ...mapState('classDetail', ['teachings']) }
}
</script>

<style></style>
