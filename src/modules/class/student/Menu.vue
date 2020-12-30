<template>
  <div>
    <v-menu open-on-hover bottom offset-y>
      <template v-slot:activator="{ on }">
        <v-btn text v-on="on" icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item @click="getXLSX()">
          <v-list-item-title>Xuất File</v-list-item-title>
        </v-list-item>
        <v-list-item @click="addState = !addState">
          <v-list-item-title>Thêm Học Sinh</v-list-item-title>
        </v-list-item>
        <v-list-item @click="newDialogState = !newDialogState">
          <v-list-item-title>Tạo mới Học Sinh</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <StudentNewDialog
      :state="newDialogState"
      :data="{ class: classData.id }"
      @done="addStudentToClass"
    />
    <StudentAddDialog
      :state="addState"
      :lastSelectedStudents="classData.students"
    />
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { parse } from 'json2csv'
import { saveAs } from 'file-saver'
import StudentNewDialog from '@/modules/student/StudentNewDialog'
import StudentAddDialog from '@/modules/class/student/StudentAddDialog'
export default {
  props: {
    role: String
  },
  components: { StudentNewDialog, StudentAddDialog },
  data() {
    return {
      studentTableOptions: {},
      newDialogState: false,
      addState: false
    }
  },
  async created() {},
  computed: {
    ...mapGetters('classDetail', ['students', 'classData'])
  },
  methods: {
    ...mapActions('classDetail', ['updateClass']),
    getXLSX() {
      try {
        const csv = parse(
          this.students.map(s => ({
            code: s.code,
            name: s.name,
            email: s.email,
            phone: s.phone,
            address: s.address,
            tags: s.tags
          })),
          Object.keys(this.students)
        )
        var csvFile = new Blob([csv], { type: 'text/csv' })
        // const file = new Blob(csv, 'hello world.csv', { type: 'text/csv;charset=utf-8' })
        saveAs(csvFile, `PARTNER.csv`)
        // saveAs(csv, 'hello world.csv')
      } catch (err) {
        console.error(err)
      }
    },
    async addStudentToClass(student) {
      await this.updateClass({
        id: this.classData.id,
        students: [...new Set([...this.classData.students, student.id])]
      })
    }
  },
  watch: {}
}
</script>
