<template>
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
        :attendances="attendances"
        :classData="classData"
      ></class-attendance-dialog>
      <tbody>
        <tr>
          <th v-for="item in headers" :key="item.text">
            <v-tooltip top :disabled="item.isFuture">
              <template v-slot:activator="{ on }">
                <span
                  v-if="item.slot"
                  v-on="on"
                  style="color: gray;  pointer-events: none;"
                  @click="openAttendanceDialog(item.slot)"
                  >{{ item.text }}</span
                >
                <p v-else class="subtitle-1" style="color: gray; margin: 0">{{ item.text }}</p>
              </template>
              <span>Điểm Danh</span>
            </v-tooltip>
          </th>
        </tr>
        <tr v-for="item in items" :key="item.code">
          <td>
            <user-item :data="item.user" :to="'../users/' + item.user.id">{{ item.user.status }}</user-item>
          </td>
          <td v-for="data in item.slots" :key="data.mergedId">
            <v-btn v-if="requesting(`teacher_attendance_${data.mergedId}`)" loading small icon></v-btn>
            <v-tooltip top v-else>
              <template v-slot:activator="{ on }">
                <v-icon
                  :disabled="data.isFuture"
                  v-on="on"
                  @click="takeAttendance(item.user, data)"
                  :color="getColor(data)"
                  >{{ data | getIcon(data) }}</v-icon
                >
              </template>
              <span>{{ data | getTooltips(data) }}</span>
            </v-tooltip>
          </td>
        </tr>
      </tbody>
    </template>
  </v-data-table>
</template>

<script>
import moment from 'moment'
import { mapActions, mapState, mapGetters } from 'vuex'
import { get } from 'lodash'
import UserItem from '@/modules/user/UserItem'
import ClassAttendanceDialog from '@/modules/class/attendance/ClassAttendanceDialog'

export default {
  components: {
    UserItem,
    ClassAttendanceDialog
  },
  props: {
    classData: Object,
    slots: Array
  },
  data() {
    return {
      attendanceDialogState: false,
      selectedSlot: {}
    }
  },
  computed: {
    ...mapState('app', ['department']),
    ...mapGetters('rest', ['requesting']),
    ...mapGetters('classDetail', ['attendances']),
    headers() {
      return [
        { text: 'Trợ Giảng', value: 'user', align: 'left', sortable: false },
        ...this.slots.map(slot => {
          return {
            text: moment(slot.startTime).format('DD/MM'),
            value: slot.code,
            align: 'left',
            sortable: false,
            isFuture: moment(slot.startTime).isAfter(moment().format('YYYY-MM-DD'), 'date'),
            slot
          }
        })
      ]
    },
    items() {
      const teachers = get(this.classData, `mentors`, [])
      return teachers.map(teacher => ({
        user: teacher,
        slots: this.slots.map(slot => {
          const attendance = get(this.attendances, `${slot.id + teacher.id}`, {})
          return {
            ...attendance,
            ...slot,
            mergedId: `${teacher.id}_${slot.id}`,
            isFuture: moment(slot.startTime).isAfter(moment().format('YYYY-MM-DD'), 'date'),
            status: attendance.status || 'not-yet',
            dataType: 'mentor-attendance'
          }
        })
      }))
    }
  },
  methods: {
    ...mapActions('classDetail', ['fetchClass', 'updateClass', 'createAttendance']),
    getColor(slot) {
      if (slot.isFuture) return 'gray'
      if (slot.status === 'attendance') return 'green'
      if (slot.status === 'absent') return 'red'
      if (slot.status === 'late') return 'orange'
      else return 'red'
    },

    takeAttendance(student, data) {
      // this.createAttendance({
      //   data: {
      //     slot: data.id,
      //     slotType: data.type,
      //     date: data.startTime,
      //     duration: moment
      //       .duration(moment(data.endTime).diff(data.startTime))
      //       .asHours(),
      //     mentor: student.id,
      //     userId: student.id,
      //     class: this.classData.id,
      //     course: get(this.classData, 'course.id'),
      //     department: this.department.id,
      //     status: data.status === 'attendance' ? 'absent' : 'attendance',
      //     type: 'mentor-attendance'
      //   },
      //   option: {
      //     requestId: `teacher_attendance_${data.mergedId}`
      //   }
      // })
    },
    openAttendanceDialog(slot) {
      // this.attendanceDialogState = !this.attendanceDialogState
      // this.selectedSlot = slot
    }
  },
  filters: {
    getIcon(data) {
      if (data.status === 'attendance') return 'mdi-check'
      if (data.status === 'absent') return 'mdi-close'
      if (data.status === 'late') return 'mdi-exclamation'
      else return 'mdi-close'
    },
    getTooltips(slot) {
      if (slot.status === 'attendance') return 'Có mặt'
      if (slot.status === 'absent') return 'Nghỉ'
      if (slot.status === 'late') return 'Đi Muộn'
      else return 'Không rõ'
    }
  }
}
</script>
