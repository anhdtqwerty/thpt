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
        { text: 'Sổ Điểm' }
      ]"
    />
    <v-card class="mt-7">
      <v-skeleton-loader v-if="!slots" class="mx-auto" max-width="300" type="table-heading"></v-skeleton-loader>
      <marks v-else :classData="classData" />
    </v-card>
  </div>
</template>

<script>
import moment from 'moment'
import { mapActions, mapState, mapGetters } from 'vuex'
import { get } from 'lodash'
import Breadcrumbs from '@/components/layout/Breadcrumbs.vue'
import Marks from '@/modules/class/marks/Marks.vue'
export default {
  components: {
    Breadcrumbs,
    Marks
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
            mergedId: `${student.id}{slot.id}`,
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
          requestId: `teacherttendance{data.mergedId}`
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
