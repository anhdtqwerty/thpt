<template>
  <v-layout>
    <v-flex xs12 sm4 md3>
      <attendance-filter @onFilterChanged="refresh" />
    </v-flex>
    <v-flex xs12 sm8 md9>
      <v-data-table
        item-key="id"
        v-model="selected"
        :headers="headers"
        :items="attendances"
        :loading="isLoading"
        loading-text="Đang Tải"
        :search="search"
        show-select
      >
        <template v-slot:[`item.class.code`]="{ item }">
          <router-link v-if="item.class" :to="'/class/' + item.class.id">{{ item.class.code }}</router-link>
        </template>
        <template v-slot:[`item.teacher`]="{ item }">
          <user-item v-if="item.teacher" :teacher="item.teacher" link></user-item>
          <user-item v-if="item.mentor" :teacher="item.mentor" link></user-item>
        </template>
        <template v-slot:[`item.validator`]="{ item }">
          <user-item v-if="item.validator" :teacher="item.validator" link></user-item>
          <div v-else>Chưa chấm công</div>
        </template>
        <template v-slot:[`item.slot.type`]="{ item }">
          <v-chip v-if="item.slot" small>{{ allSlotTypes[item.slot.type] }}</v-chip>
        </template>
        <template v-slot:[`item.state`]="{ item }">
          <v-chip small :color="getStateColor(item)">{{ allAttendanceStates[item.state || ''] }}</v-chip>
        </template>
        <template v-slot:[`item.duration`]="{ item }"> {{ item.duration }}h </template>
        <template v-slot:[`item.date`]="{ item }">
          <div v-if="item.date">{{ item.date | getDate() }}</div>
        </template>
        <template v-slot:[`item.status`]="{ item }">
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-icon v-on="on" :color="getColor(item)">{{ item | getIcon(item) }} </v-icon>
            </template>
            <span>{{ item | getTooltips(item) }}</span>
          </v-tooltip>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>
<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import UserItem from '@/components/basic/card/CardTeacherName'
import AttendanceFilter from '@/modules/attendance/AttendanceFilter'
import moment from 'moment'

export default {
  components: {
    UserItem,
    AttendanceFilter
  },
  props: {},
  data() {
    return {
      headers: [
        { text: 'Tên', value: 'teacher', align: 'left', sortable: false },
        { text: 'Ngày Dạy', value: 'date', align: 'left', sortable: false },
        { text: 'Lớp Học', value: 'class.code', align: 'left', sortable: false },
        { text: 'Loại Buổi Học', value: 'slot.type', align: 'left', sortable: false },
        { text: 'Thời Lượng', value: 'duration', align: 'left', sortable: false },
        { text: 'Xác Nhận', value: 'state', align: 'left', sortable: false }
      ],
      selected: [],
      draw: false,
      search: '',
      isLoading: false,
      status: null
    }
  },
  async created() {
    this.refresh()
  },
  computed: {
    ...mapGetters('attendance', ['attendances', 'count']),
    ...mapState('constant', ['slotTypes', 'attendanceStates']),
    ...mapState('app', ['department']),
    ...mapState('auth', ['profile']),
    ...mapGetters('auth', ['profile']),
    members() {
      return this.attendances
    },
    allSlotTypes() {
      return this.slotTypes.reduce(
        (acc, cur) => ({
          ...acc,
          [cur.status]: cur.title
        }),
        {}
      )
    },
    allAttendanceStates() {
      return this.attendanceStates.reduce(
        (acc, cur) => ({
          ...acc,
          [cur.status]: cur.title
        }),
        {}
      )
    }
  },
  methods: {
    ...mapActions('attendance', ['fetchAttendances', 'countAttendances', 'updateAttendances', 'removeAttendances']),
    async refresh(query) {
      this.isLoading = true
      query = {
        ...query,
        department: this.department.id,
        status: ['attendance', 'late'],
        teacher: this.profile.id,
        type: ['teacher-attendance', 'mentor-attendance']
      }
      await this.fetchAttendances(query)
      this.countAttendances(query)
      this.isLoading = false
    },
    getColor(slot) {
      if (slot.status === 'attendance') return 'green'
      if (slot.status === 'absent') return 'red'
      if (slot.status === 'late') return 'orange'
      else return 'red'
    },
    getStateColor(slot) {
      if (slot.state === 'confirmed') return 'success'
      if (slot.state === 'rejected') return 'error'
      if (slot.state === 'paid') return 'gray'
      if (slot.state === 'wait' || !slot.state) return 'primary'
      else return 'red'
    },
    onRemove(selected) {
      this.removeAttendances(selected)
    },
    onUpdate(selected) {
      this.updateAttendances(
        selected.map(attendance => ({ ...attendance, slot: attendance.slot.id, validator: this.profile.id }))
      )
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
    },
    getDate(date) {
      return moment(date).format('DD/MM')
    }
  }
}
</script>
