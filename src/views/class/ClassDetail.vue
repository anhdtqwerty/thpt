<template>
  <div
    v-if="classData"
    class="pt-2"
    :class="{ 'px-3': $vuetify.breakpoint.mdAndUp }"
  >
    <Breadcrumbs
      :class="{ 'px-5 mt-2': $vuetify.breakpoint.smAndDown }"
      data="classData.title"
      :headline="classData.title"
      :link="[
        { text: 'Danh sách lớp', href: '../classes' },
        { text: classData.title, id: classData.id },
      ]"
    />

    <v-card class="mt-6">
      <v-img
        src="../../assets/class-default-img.png"
        class="pa-6"
        max-height="178"
      >
        <div class="d-flex">
          <div
            class="white--text pa-6 sm-12 xs-12 md-12 lg-6"
            style="
            width: 99%;
              background: rgba(33, 33, 33, 0.3);
              border-radius: 4px;
              position: relative;
            "
          >
            <div class="d-flex justify-space-between">
              <div class="">
                <p>Lớp học</p>
                <h2>{{ classData.title }}</h2>
              </div>
              <div class="">
                <p>Giáo viên chủ nhiệm</p>
                <p
                  style="border: 1px solid #fff; border-radius: 4px"
                  class="pa-1"
                >
                  {{ classData.teachers | getTeacher }}
                </p>
              </div>
              <div class="">
                <p>Sĩ số</p>
                <p>{{ getStudentCount }}</p>
              </div>
              <div class="">
                <p>Niên khóa</p>
                <p>{{ classData.generation | getGeneration }}</p>
              </div>
              <div class="">
                <p class="">Ban học</p>
                <p>{{ classData.division | getDivision }}</p>
              </div>
            </div>
          </div>
          <v-btn icon dark @click="updateClass"
            ><v-icon medium>create</v-icon></v-btn
          >
        </div>
      </v-img>
    </v-card>
    <ClassTabs class="mt-4" />
    <v-row no-gutters>
      <v-col cols="12" :class="{ 'pa-0': $vuetify.breakpoint.smAndDown }">
        <v-card>
          <div class="d-flex align-center">
            <v-card-title>Danh sách học sinh trong lớp </v-card-title>
            <v-spacer />
            <drop-menu class="mr-2" @add-new-student="dialog = !dialog" />
          </div>
          <student-table
            @onCheckAttendance="checkAttendance"
            disableSort
            mobile-breakpoint="0"
          />
        </v-card>
      </v-col>
    </v-row>
    <class-update-dialog
      :state="updateDialogState"
      :classData="classInfo"
    ></class-update-dialog>
  </div>
  <h1 v-else-if="!$loading.active">Class not found</h1>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { get } from 'lodash'
import Breadcrumbs from '@/components/layout/Breadcrumbs.vue'
import ClassUpdateDialog from '@/modules/class/ClassUpdateDialog.vue'
import StudentTable from '@/modules/class/student/StudentTable.vue'
import DropMenu from '@/modules/class/student/Menu.vue'
import ClassTabs from '@/modules/class/ClassTabs.vue'
export default {
  components: {
    Breadcrumbs,
    ClassUpdateDialog,
    StudentTable,
    DropMenu,
    ClassTabs,
  },
  data() {
    return {
      selectedSlot: {},
      attendanceDialogState: false,
      updateDialogState: false,
      tab: null,
      dialog: false,
    }
  },
  computed: {
    ...mapGetters('classDetail', ['classData', 'slots', 'logs', 'attendances']),
    teacherNames() {
      if (!this.classData.teachers || this.classData.teachers.length === 0) {
        return ''
      }
      return this.classData.teachers.reduce((acc, cur, idx, arr) => {
        acc += cur.name
        if (idx !== arr.length - 1) acc += ','
        return acc
      }, '')
    },
    mentorNames() {
      if (!this.classData.mentors || this.classData.mentors.length === 0) {
        return ''
      }
      return this.classData.mentors.reduce((acc, cur, idx, arr) => {
        acc += cur.name
        if (idx !== arr.length - 1) acc += ','
        return acc
      }, '')
    },
    imageHeight() {
      switch (this.$vuetify.breakpoint.name) {
        case 'lg':
        case 'xl':
          return '436px'
        default:
          return '100%'
      }
    },
    teachers() {
      return []
    },
    students() {
      return []
    },
    classInfo() {
      return this.classData
    },
    classLogs() {
      return this.logs
    },
    classSlots() {
      return this.slots
    },
    isMobile() {
      switch (this.$vuetify.breakpoint.name) {
        case 'lg':
        case 'xl':
          return true
        default:
          return false
      }
    },
    getStudentCount() {
      return get(this.classData.students, 'length', 0)
    },
    getCurrentSlot() {
      const currentSlot = this.slots.filter((slot) => {
        return new Date(slot.endTime).getTime() < new Date().getTime()
      })
      return currentSlot.length
    },
    getTotalSlot() {
      return get(this.slots, 'length', 0)
    },
    getPercentageAttendance() {
      const attendanceValues = Object.values(this.attendances)
      const attendanceNum = attendanceValues.filter(
        (attendance) =>
          attendance.status === 'attendance' || attendance.status === 'late'
      )
      return Math.floor((attendanceNum.length / attendanceValues.length) * 100)
    },
  },
  methods: {
    ...mapActions('classDetail', ['initClass', 'fetchAttendances']),
    checkAttendance(selected) {
      this.selectedSlot = selected
      this.attendanceDialogState = !this.attendanceDialogState
    },
    updateClass() {
      this.updateDialogState = !this.updateDialogState
    },
  },
  async created() {
    const classId = this.$route.params.id
    await this.initClass({ id: classId })
    console.log(this.classData)
  },
  filters: {
    getMajorName(data) {
      return data ? data.title : ''
    },
    getRoomName(data) {
      return data ? data.title : ''
    },
    getTeacher(data) {
      if (!data || !data.length) return 'không có'
      else return data[0].name
    },
    getGeneration(generation) {
      if (!generation) return 'không có'
      else return generation.name
    },
    getDivision(division) {
      if (!division) return 'không có'
      else return division.title
    },
  },
}
</script>
<style scoped>
.theme--light.v-tabs-items {
  background-color: transparent;
}
td {
  padding-top: 4px;
}
td:first-child {
  padding-right: 48px;
}
</style>
