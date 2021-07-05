/* eslint-disable vue/valid-v-slot */
<template>
  <div class="pt-2" :class="{ 'px-3': $vuetify.breakpoint.mdAndUp }">
    <Breadcrumbs
      :class="{ 'px-4 mt-2': $vuetify.breakpoint.smAndDown }"
      v-if="classData"
      data="classData.title"
      :headline="classData.title"
      :link="[
        { text: 'Danh sách lớp', href: '../../../classes' },
        {
          text: classData.title,
          id: classData.id,
          href: `../../class/${classData.id}`
        },
        { text: 'Điểm Danh' }
      ]"
    />
    <v-card>
      <v-skeleton-loader v-if="!slots" class="mx-auto" max-width="300" type="table-heading"></v-skeleton-loader>
      <v-data-table
        v-else
        class="attendances"
        hide-default-header
        :headers="headers"
        :items="items"
        hide-default-footer
        :items-per-page="50"
      >
        <template v-slot:body="{ items }">
          <class-attendance-dialog
            :state="attendanceDialogState"
            :slotData="selectedSlot"
            :classData="classData"
            :attendances="attendances"
          ></class-attendance-dialog>
          <tbody>
            <tr>
              <th v-for="item in headers" :key="item.text">
                <v-tooltip top :disabled="item.minutes > 24">
                  <template v-slot:activator="{ on }">
                    <span
                      v-if="item.slot"
                      v-on="on"
                      style="
                        cursor: pointer;
                        padding: 1px;
                        border-radius: 10%;
                        text-decoration: underline;
                      "
                      @click="openAttendanceDialog(item)"
                      >{{ item.text }}</span
                    >
                    <p v-else class="subtitle-1" style="color: gray; margin: 0">
                      {{ item.text }}
                    </p>
                  </template>
                  <span>{{ isValid(item) ? 'Bấm Vào để Điểm Danh' : 'Đã Quá hạn điểm danh' }}</span>
                </v-tooltip>
              </th>
            </tr>
            <tr v-for="item in items" :key="item.code">
              <td style="width: 200px !important">
                <user-item :data="item.user" :to="'../users/' + item.user.id">{{ item.user.status }}</user-item>
              </td>
              <td v-for="data in item.slots" :key="data.mergedId">
                <v-btn v-if="requesting(`teacher_attendance_${data.mergedId}`)" loading small icon></v-btn>
                <v-tooltip top v-else>
                  <template v-slot:activator="{ on }">
                    <v-icon :disabled="data.minutes > 24" v-on="on" :color="getColor(data)">{{
                      data | getIcon(data)
                    }}</v-icon>
                  </template>
                  <span>{{ data | getTooltips(data) }}</span>
                </v-tooltip>
              </td>
            </tr>
          </tbody>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import moment from 'moment'
import { mapActions, mapState, mapGetters } from 'vuex'
import { get } from 'lodash'
import UserItem from '@/modules/user/UserItem'
import ClassAttendanceDialog from '@/modules/class/attendance/ClassAttendanceDialog'
import Breadcrumbs from '@/components/layout/Breadcrumbs.vue'
export default {
  components: {
    UserItem,
    ClassAttendanceDialog,
    Breadcrumbs
  },

  data() {
    return {
      attendanceDialogState: false,
      selectedSlot: {}
    }
  },
  async created() {
    const classId = this.$route.params.id
    this.initClass({ id: classId })
  },
  computed: {
    ...mapState('app', ['department']),
    ...mapGetters('rest', ['requesting']),
    ...mapGetters('classDetail', ['classData', 'slots', 'classList', 'attendances']),
    ...mapState('auth', ['user', 'role']),
    headers() {
      return [
        { text: 'Học sinh', value: 'user', align: 'left', sortable: false },
        ...this.slots.map(slot => {
          return {
            text: moment(slot.startTime).format('DD/MM'),
            value: slot.code,
            align: 'left',
            sortable: false,
            minutes: moment.duration(moment(slot.startTime).diff(moment())).asHours(),
            slot
          }
        })
      ]
    },
    items() {
      const students = get(this.classData, `students`, [])
      return students.map(student => ({
        user: student,
        slots: this.slots.map(slot => {
          const attendance = get(this.attendances, `${slot.id + student.id}`, {})
          return {
            ...attendance,
            ...slot,
            mergedId: `${student.id}_${slot.id}`,
            minutes: moment.duration(moment(slot.startTime).diff(moment())).asMinutes(),
            status: attendance.status,
            dataType: 'student-attendance'
          }
        })
      }))
    }
  },
  methods: {
    ...mapActions('classDetail', ['fetchClass', 'updateClass', 'createAttendance', 'initClass']),
    getColor(slot) {
      if (slot.isFuture) return 'gray'
      if (slot.status === 'attendance') return 'green'
      if (slot.status === 'absent') return 'red'
      if (slot.status === 'late' || slot.status === 'approved-absent') {
        return 'orange'
      } else return 'red'
    },

    takeAttendance(student, data) {
      this.createAttendance({
        data: {
          slot: data.id,
          slotType: data.type,
          student: student.id,
          date: data.startTime,
          duration: moment.duration(moment(data.endTime).diff(data.startTime)).asHours(),
          userId: student.id,
          class: this.classData.id,
          course: get(this.classData, 'course.id'),
          department: this.department.id,
          status: data.status === 'attendance' ? 'absent' : 'attendance',
          type: 'student-attendance'
        },
        option: {
          requestId: `teacher_attendance_${data.mergedId}`
        }
      })
    },
    isValid(item) {
      if (this.role.name === 'Teacher') {
        return item.minutes < 24 && item.minutes > -24
      }
      return true
    },
    openAttendanceDialog(item) {
      if (this.isValid(item)) {
        this.attendanceDialogState = !this.attendanceDialogState
        this.selectedSlot = item.slot
      }
    }
  },
  filters: {
    getIcon(data) {
      if (data.status === 'attendance' || data.status === 'late') {
        return 'mdi-check'
      }
      if (data.status === 'absent' || data.status === 'approved-absent') {
        return 'mdi-close'
      }
      if (!data.status) return ''
      else return 'mdi-close'
    },
    getTooltips(slot) {
      if (slot.status === 'attendance') return 'Có mặt'
      if (slot.status === 'absent') return 'Nghỉ'
      if (slot.status === 'approved-absent') return 'Vắng có phép'
      if (slot.status === 'late') return 'Đi Muộn'
      else return 'Nghỉ'
    }
  }
}
</script>
