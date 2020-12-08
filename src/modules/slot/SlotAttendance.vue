<template>
  <v-list>
    <v-subheader>Giáo Viên & Trợ Giảng</v-subheader>
    <student-list-item
      v-for="(item, index) in teachers"
      :key="index"
      :student="item"
      :append="{icon :getIcon(item), color: getColor(item)}"
    ></student-list-item>
    <v-subheader>Học Sinh</v-subheader>
    <v-list v-if="!classData.students">
      <v-skeleton-loader class="mx-auto" type="list-item-avatar-two-line"></v-skeleton-loader>
      <v-skeleton-loader class="mx-auto" type="list-item-avatar-two-line"></v-skeleton-loader>
      <v-skeleton-loader class="mx-auto" type="list-item-avatar-two-line"></v-skeleton-loader>
      <v-skeleton-loader class="mx-auto" type="list-item-avatar-two-line"></v-skeleton-loader>
    </v-list>
    <student-list-item
      v-else
      v-for="(item, index) in students"
      :key="index"
      :student="item"
      :append="{icon :getIcon(item), color: getColor(item)}"
    ></student-list-item>
  </v-list>
</template>

<script>
import StudentListItem from '@/components/basic/list/StudentListItem'
import { mapState } from 'vuex'
import _ from 'lodash'

export default {
  components: {
    StudentListItem
  },
  props: {
    slotData: {
      type: [Object],
      required: true,
      default: () => {}
    },
    classData: {
      type: [Object],
      required: true,
      default: () => {}
    }
  },
  data: () => ({
    search: '',
    valid: true,
    name: '',
    email: '',
    parentEmail: '',
    school: '',
    address: '',
    parentName: '',
    attendances: []
  }),
  computed: {
    ...mapState('app', ['department']),
    students () {
      return this.classData.students.map(student => ({
        ...student,
        attendance: _.get(
          this.slotData,
          `attendances.${student.id + this.slotData.id}.status`,
          'absent'
        )
      }))
    },
    teachers () {
      return [
        ...(this.classData.teachers || []),
        ...(this.classData.mentors || [])
      ].map(teacher => ({
        ...teacher,
        attendance: _.get(
          this.slotData,
          `attendances.${teacher.id + this.slotData.id}.status`,
          'absent'
        )
      }))
    }
  },
  methods: {
    refresh () {
      this.attendance = this.slotData.attendances
    },
    getIcon (data) {
      if (data.attendance === 'attendance') return 'mdi-check'
      if (data.attendance === 'absent') return 'mdi-close'
      else return 'mdi-close'
    },
    getColor (data) {
      if (data.attendance === 'attendance') return 'green'
      if (data.attendance === 'absent') return 'red'
      if (data.attendance === 'late') return 'orange'
      else return 'gray'
    }
  },
  watch: {
    staff (staff) {
      this.name = staff.name
      this.email = staff.email
      this.parentName = staff.parentName
      this.parentEmail = staff.parentEmail
      this.school = staff.school
      this.address = staff.address
    },
    async slotData (slotData) {
      this.refresh()
    },
    async classData (classData) {
      this.refresh()
    }
  }
}
</script>

<style scoped>
</style>
