<template>
  <div v-if="classData" class="pt-2" :class="{ 'px-3': $vuetify.breakpoint.mdAndUp }">
    <Breadcrumbs
      :class="{ 'px-5 mt-2': $vuetify.breakpoint.smAndDown }"
      data="classData.title"
      :headline="classData.title"
      :link="[
        { text: 'Danh sách lớp', href: '../classes' },
        { text: classData.title, id: classData.id }
      ]"
    />

    <v-card class="mt-6">
      <v-row class="d-flex">
        <v-col class="pa-6" cols="10">
          <div class="d-flex align-end justify-space-between">
            <div>
              <div>Lớp</div>
              <h2>{{ classData.title }}</h2>
            </div>
            <div>
              <div>Niên khóa</div>
              <div class="font-weight-bold">{{ classData.generation | getGeneration }}</div>
            </div>
            <div>
              <div>Phân ban</div>
              <div class="font-weight-bold">{{ classData.division | getDivision }}</div>
            </div>
            <div>
              <div>Giáo viên chủ nhiệm</div>
              <div class="font-weight-bold">
                {{ classData.headTeachers | getTeacher }}
              </div>
            </div>
            <div>
              <div>Sĩ số</div>
              <div class="font-weight-bold">{{ getStudentCount }}</div>
            </div>

            <div>
              <div>Trạng thái</div>
              <v-chip
                small
                class="white--text"
                v-if="classData.status"
                :color="classData.status | classStatusColor"
                label
              >
                {{ classData.status | classStatus }}
              </v-chip>
            </div>
          </div>
        </v-col>
        <v-col class="pa-6 d-flex justify-end align-end" cols="2">
          <v-btn @click="detailState = !detailState" small color="primary" outlined>Hồ sơ chi tiết</v-btn>
        </v-col>
      </v-row>
    </v-card>
    <ClassTabs class="mt-4" />
    <div class="text-center">
      <v-btn class="ma-4" @click="remove" color="red" outlined>Xóa lớp</v-btn>
    </div>
    <ClassDetailDialog @edit="updateDialogState = !updateDialogState" :classData="classData" :state="detailState" />

    <class-update-dialog :state="updateDialogState" :classData="classInfo"></class-update-dialog>
  </div>
  <h1 v-else-if="!$loading.active">Class not found</h1>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { get } from 'lodash'
import Breadcrumbs from '@/components/layout/Breadcrumbs.vue'
import ClassUpdateDialog from '@/modules/class/ClassUpdateDialog.vue'
import ClassTabs from '@/modules/class/ClassTabs.vue'
import ClassDetailDialog from '@/modules/class/ClassDetailDialog.vue'

export default {
  components: {
    Breadcrumbs,
    ClassUpdateDialog,
    ClassTabs,
    ClassDetailDialog
  },
  data() {
    return {
      selectedSlot: {},
      attendanceDialogState: false,
      updateDialogState: false,
      tab: null,
      detailState: false,
      dialog: false
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
      const currentSlot = this.slots.filter(slot => {
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
        attendance => attendance.status === 'attendance' || attendance.status === 'late'
      )
      return Math.floor((attendanceNum.length / attendanceValues.length) * 100)
    }
  },
  methods: {
    ...mapActions('classDetail', ['initClass', 'fetchAttendances']),
    ...mapActions('class', ['removeClass']),

    checkAttendance(selected) {
      this.selectedSlot = selected
      this.attendanceDialogState = !this.attendanceDialogState
    },
    updateClass() {
      this.updateDialogState = !this.updateDialogState
    },
    remove() {
      this.$dialog.confirm({
        title: 'Thông báo xác nhận',
        text: 'Bạn có chắc muốn xóa lớp học này? Bạn không thể hoàn tác hành động.',
        okText: 'OK',
        cancelText: 'Hủy',
        done: async () => {
          try {
            this.$loading.active = true
            await this.removeClass(this.classData.id)
            this.$alert.success('Xóa lớp học thành công!')
            this.$router.push(`/classes/`)
          } catch (error) {
            this.$alert.deleteError()
          } finally {
            this.$loading.active = false
          }
        }
      })
    }
  },
  async created() {
    const classId = this.$route.params.id
    await this.initClass({ id: classId })
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
    }
  }
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
