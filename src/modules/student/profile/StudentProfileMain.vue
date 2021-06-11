<template>
  <div>
    <v-row>
      <v-col cols="12">
        <v-card outlined>
          <v-card-title>
            <v-icon color="primary">mdi-clipboard-text</v-icon>
            <span class="ml-2 text-subtitle-2">Học tập</span>
            <v-spacer></v-spacer>
            <v-btn color="primary" text>Xem chi tiết</v-btn>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="pa-0">
            <StudentProfileMarks :student="student" />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card outlined>
          <v-card-title>
            <v-icon color="primary">mdi-calendar-account</v-icon>
            <span class="ml-2 text-subtitle-2">Chuyên cần</span>
            <v-spacer></v-spacer>
            <v-btn color="primary" text>Xem chi tiết</v-btn>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="pa-0">
            <v-row class="py-6">
              <v-col class="text-center" cols="4">
                <span class="col-1">{{ commendCount }}</span>
                <br />
                <span class="text-subtitle">Số ngày nghỉ</span>
              </v-col>
              <v-divider class="my-2" vertical></v-divider>
              <v-col class="text-center" cols="4">
                <span class="col-2">{{ violationCount }}</span> <br />
                <span class="text-subtitle">Số ngày nghỉ không phép</span>
              </v-col>
            </v-row>
            <AttendanceStudentDataTable :hide-footer="true" :headers="attendanceHeaders" />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card outlined>
          <v-card-title>
            <v-icon color="primary">mdi-star</v-icon>
            <span class="ml-2 text-subtitle-2">Khen thưởng kỷ luật</span>
            <v-spacer></v-spacer>
            <v-btn color="primary" text to="/complimented">Xem chi tiết</v-btn>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="pa-0">
            <v-row class="py-6">
              <v-col class="text-center" cols="4">
                <span class="col-1">{{ commendCount }}</span>
                <br />
                <span class="text-subtitle">Khen thưởng</span>
              </v-col>
              <v-divider class="my-2" vertical></v-divider>
              <v-col class="text-center" cols="4">
                <span class="col-2">{{ violationCount }}</span> <br />
                <span class="text-subtitle">Kỷ luật</span>
              </v-col>
            </v-row>
            <violation-data-table :hideFooter="true" :headers="violationHeader" :violations="violations" />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card outlined>
          <v-card-title>
            <v-icon color="primary">mdi-bell-ring</v-icon>
            <span class="ml-2 text-subtitle-2">Tin nhắn, thông báo gần đây</span>
            <v-spacer></v-spacer>
            <v-btn color="primary" text to="/post-history">Xem thêm</v-btn>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="pa-0">
            <StudentProfileNotifications :student="student" />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card outlined>
          <v-card-title>
            <v-icon color="primary">mdi-laptop</v-icon>
            <span class="ml-2 text-subtitle-2">Học tập online</span>
            <v-spacer></v-spacer>
            <v-btn color="primary" text>Xem chi tiết</v-btn>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ViolationDataTable from '@/modules/violation/ViolationDataTable'
import AttendanceStudentDataTable from '@/modules/attendance/AttendanceStudentDataTable'
import StudentProfileMarks from '@/modules/student/profile/StudentProfileMarks.vue'
import StudentProfileNotifications from '@/modules/student/profile/StudentProfileNotifications.vue'
import { mapActions, mapState, mapGetters } from 'vuex'

export default {
  data() {
    return {
      tab: null,
      violationHeader: [
        {
          text: 'Ngày',
          value: 'date',
          sortable: false
        },
        {
          text: 'Mục',
          value: 'type',
          sortable: false
        },
        {
          text: 'Nội dung',
          value: 'description',
          sortable: false
        }
      ],
      attendanceHeaders: [
        {
          text: 'Ngày',
          value: 'date',
          sortable: false
        },
        {
          text: 'Giờ đến / Giờ về',
          value: 'time',
          sortable: false
        },
        {
          text: 'Trạng thái',
          value: 'type',
          sortable: false
        }
      ]
    }
  },
  components: {
    StudentProfileMarks,
    ViolationDataTable,
    AttendanceStudentDataTable,
    StudentProfileNotifications
  },
  props: {
    student: Object
  },
  computed: {
    ...mapState('violation', ['violations']),
    ...mapGetters('attendance', ['attendances']),
    commendCount() {
      let count = 0
      for (let item of this.violations) {
        if (item.type === 'commendation') {
          count++
        }
      }
      return count
    },
    violationCount() {
      let count = 0
      for (let item of this.violations) {
        if (item.type === 'violation') {
          count++
        }
      }
      return count
    }
  },
  async created() {
    await this.fetchViolation({ student: this.student.id })
    await this.fetchAttendances({ student: this.student.id })
  },
  methods: {
    ...mapActions('violation', ['fetchViolation']),
    ...mapActions('attendance', ['fetchAttendances'])
  }
}
</script>

<style scoped>
.col-1 {
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
  color: #46be8a;
}
.col-2 {
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
  color: #ffab40;
}
</style>
