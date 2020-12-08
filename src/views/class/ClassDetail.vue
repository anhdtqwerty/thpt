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
    <v-row
      class="mt-n2"
      :class="{ 'px-3': $vuetify.breakpoint.smAndDown }"
      no-gutters
    >
      <v-col class="xs-6 sm-6">
        <v-card class="pl-5 pt-5">
          <div class="d-flex justify-start">
            <v-avatar size="82">
              <v-img src="@/assets/diem_danh.svg" />
            </v-avatar>
            <div class="ml-2">
              <v-card-title
                class="text-h6 font-weight-regular grey--text pt-2"
                style="white-space: nowrap"
              >
                Điểm danh
              </v-card-title>
              <v-card-subtitle class="text-h4 font-weight-bold pt-2 black--text"
                >{{getPercentageAttendance}}%</v-card-subtitle
              >
            </div>
          </div>
          <v-card-actions class="mt-n2">
            <v-spacer />
            <v-btn
              color="white"
              elevation="0"
              :to="`/class/attendances/${classData.id}`"
              class="blue--text"
            >
              Chi tiết<v-icon>mdi-arrow-right</v-icon></v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col class="xs-6 sm-6">
        <v-card elevation="3" class="pl-5 pt-5">
          <div class="d-flex justify-start">
            <v-avatar size="82">
              <v-img src="@/assets/lich_hoc.svg" />
            </v-avatar>
            <div class="ml-2">
              <v-card-title
                class="text-h6 font-weight-regular grey--text pt-2"
                style="white-space: nowrap"
              >
                Lịch học
              </v-card-title>
              <v-card-subtitle class="pt-2 text-h6 grey--text"
                ><span class="text-h4 font-weight-bold black--text">{{
                  getCurrentSlot
                }}</span
                >/{{ getTotalSlot }}</v-card-subtitle
              >
            </div>
          </div>
          <v-card-actions class="mt-n2">
            <v-spacer />
            <v-btn
              color="white"
              elevation="0"
              :to="`/class/schedule/${classData.id}`"
              class="blue--text"
            >
              Chi tiết<v-icon>mdi-arrow-right</v-icon></v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col class="xs-6 sm-6">
        <v-card elevation="3" class="pl-5 pt-5">
          <div class="d-flex justify-start">
            <v-avatar size="82">
              <v-img src="@/assets/hoc_vien.svg" />
            </v-avatar>
            <div class="ml-2">
              <v-card-title
                class="text-h6 font-weight-regular grey--text pt-2"
                style="white-space: nowrap"
              >
                Học viên
              </v-card-title>
              <v-card-subtitle class="pt-2 text-h6 grey--text"
                ><span class="text-h4 font-weight-bold black--text">{{
                  getStudentCount
                }}</span></v-card-subtitle
              >
            </div>
          </div>
          <v-card-actions class="mt-n2">
            <v-spacer />
            <v-btn
              color="white"
              elevation="0"
              :to="`/class/students/${classData.id}`"
              class="blue--text"
            >
              Chi tiết<v-icon>mdi-arrow-right</v-icon></v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col class="xs-6 sm-6">
        <v-card elevation="3" class="pl-5 pt-5">
          <div class="d-flex justify-start">
            <v-avatar size="82">
              <v-img src="@/assets/bang_diem.svg" />
            </v-avatar>
            <div class="ml-2 d-flex align-center">
              <v-card-subtitle
                class="pt-4 text-h6 grey--text"
                style="white-space: nowrap; height: 104px"
                ><span class="text-h4 black--text"
                  >Bảng điểm</span
                ></v-card-subtitle
              >
            </div>
          </div>
          <v-card-actions class="mt-n2">
            <v-spacer />
            <v-btn
              color="white"
              elevation="0"
              :to="`/class/mark/${classData.id}`"
              class="blue--text"
            >
              Chi tiết<v-icon>mdi-arrow-right</v-icon></v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-card class="mt-6">
      <v-img
        src="../../assets/class-default-img.png"
        class="pa-8"
        :max-height="imageHeight"
      >
        <v-row no-gutters>
          <v-col
            class="white--text pa-6 sm-12 xs-12 md-12 lg-6"
            style="
              background: rgba(33, 33, 33, 0.3);
              border-radius: 4px;
              position: relative;
            "
          >
            <v-btn
              icon
              dark
              style="position: absolute; top: 10px; right: 10px"
              @click="updateClass"
              ><v-icon medium>create</v-icon></v-btn
            >
            <div>Môn học:</div>
            <div
              class="text-h3 mt-2"
              :class="{ 'text-truncate': $vuetify.breakpoint.lgAndUp }"
            >
              {{ classData.title }}
            </div>
            <table class="mt-8">
              <tr>
                <td>Chuyên ngành:</td>
                <td class="font-weight-medium">
                  {{ classData.major | getMajorName }}
                </td>
              </tr>
              <tr>
                <td>Mã lớp:</td>
                <td class="font-weight-medium">{{ classData.code }}</td>
              </tr>
              <tr>
                <td>Nhóm lớp:</td>
                <td class="font-weight-medium">{{ classData.tags }}</td>
              </tr>
              <tr>
                <td class="mt-2">Phòng học:</td>
                <td class="font-weight-medium mt-2">
                  {{ classData.room | getRoomName }}
                </td>
              </tr>
              <tr>
                <td v-if="classData.teachers" class="mt-2">Giảng viên:</td>
                <td v-if="classData.teachers" class="font-weight-medium mt-2">
                  {{ teacherNames }}
                </td>
              </tr>
              <tr>
                <td v-if="classData.mentors" class="mt-2">Trợ giảng:</td>
                <td v-if="classData.mentors" class="font-weight-medium mt-2">
                  {{ mentorNames }}
                </td>
              </tr>
              <tr>
                <td class="mt-2">Mô tả:</td>
                <td class="font-weight-medium mt-2 text-truncate">
                  {{ classData.description }}
                </td>
              </tr>
            </table>
          </v-col>
          <v-col class="d-none d-lg-flex xs-0 sm-0 md-0 lg-6">
            <v-btn
              elevation="2"
              style="position: absolute; bottom: 32px; right: 32px"
            >
              <v-icon>mdi-camera</v-icon>
              Chỉnh sửa ảnh</v-btn
            >
          </v-col>
        </v-row>
      </v-img>
    </v-card>
    <v-row :class="{ 'mt-6 pb-4': $vuetify.breakpoint.mdAndUp }" no-gutters>
      <v-col cols="12" :class="{ 'pa-0': $vuetify.breakpoint.smAndDown }">
        <v-card>
          <v-card-title class="text-h4 amber--text text--darken-1"
            >Lịch học
          </v-card-title>
          <slots-table
            :class="{ 'mt-n1 px-4': $vuetify.breakpoint.smAndDown }"
            :slots="classSlots"
            :classData="classInfo"
            :headers="headers"
            @onCheckAttendance="checkAttendance"
            disableSort
            mobile-breakpoint="0"
          />
        </v-card>
      </v-col>
    </v-row>
    <class-attendance-dialog
      :state="attendanceDialogState"
      :slotData="selectedSlot"
      :classData="classData"
      :attendances="attendances"
    ></class-attendance-dialog>
    <class-update-dialog
      :state="updateDialogState"
      :classData="classInfo"
      :slots="classSlots"
    ></class-update-dialog>
  </div>
  <h1 v-else-if="!$loading.active">Class not found</h1>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { get } from 'lodash'
import SlotsTable from '@/modules/slot/SlotsTable'
import Breadcrumbs from '@/components/layout/Breadcrumbs.vue'
import ClassAttendanceDialog from '@/modules/class/attendance/ClassAttendanceDialog.vue'
import ClassUpdateDialog from '@/modules/class/ClassUpdateDialog.vue'

export default {
  components: {
    SlotsTable,
    Breadcrumbs,
    ClassAttendanceDialog,
    ClassUpdateDialog
  },
  data() {
    return {
      selectedSlot: {},
      attendanceDialogState: false,
      updateDialogState: false,
      tab: null,
      headers: [
        {
          text: 'Thời gian',
          value: 'startTime',
          align: 'left',
          sortable: false
        },
        {
          text: 'Ngày',
          value: 'startTimeDate',
          align: 'left',
          sortable: false
        },
        { text: 'Phòng học', value: 'room', align: 'left', sortable: true },
        { text: 'Giáo viên', value: 'teachers', align: 'left', sortable: true },
        {
          text: 'Điểm danh',
          value: 'attendances',
          align: 'left',
          sortable: true
        }
      ]
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
      return Math.floor(attendanceNum.length / attendanceValues.length * 100)
    }
  },
  methods: {
    ...mapActions('classDetail', ['initClass', 'fetchAttendances']),
    checkAttendance(selected) {
      this.selectedSlot = selected
      this.attendanceDialogState = !this.attendanceDialogState
    },
    updateClass() {
      this.updateDialogState = !this.updateDialogState
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
