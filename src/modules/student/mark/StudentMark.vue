<template>
  <v-card flat>
    <v-card-title color="#0D47A1">
      <h1 class="display-1 font-weight-bold" style="color: white">
        {{ mark.student.name }}
      </h1>
    </v-card-title>
    <v-card-text :class="{ 'mt-4': $vuetify.breakpoint.smAndDown }">
      <p class="font-weight-regular">
        Mã Học sinh: {{ mark.student.code }}.
        <br />
        Mã Lớp: {{ mark.class.code }}
        <br />
        Khóa Học: {{ mark.course.title }}
      </p>
      <h2>Tình Trạng điểm danh</h2>
      <br />
      <v-simple-table dense style="max-width:400px">
        <template v-slot:default>
          <tbody>
            <tr>
              <td>Đi học đúng giờ</td>
              <td>
                {{ attendance.attendant }}/{{ attendance.total }} ({{
                  (attendance.attendant / attendance.total) * 100
                }}%)
              </td>
            </tr>
            <tr>
              <td>Đi học muộn</td>
              <td>
                {{ attendance.late }}/{{ attendance.total }} ({{
                  (attendance.late / attendance.total) * 100
                }}%)
              </td>
            </tr>
            <tr>
              <td>Nghỉ học</td>
              <td>
                {{
                  attendance.total - attendance.late - attendance.attendant
                }}/{{ attendance.total }} ({{
                  ((attendance.total - attendance.late - attendance.attendant) /
                    attendance.total) *
                    100
                }}%)
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <br />
      <h2>Bảng Điểm</h2>
      <br />
      <v-simple-table dense>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left" v-for="item in mark.data" :key="item.code">
                {{ item.title }} (hệ số {{ item.multiplier }})
              </th>
              <th>Trung Bình</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th class="text-left" v-for="item in mark.data" :key="item.code">
                {{ item.value }}
              </th>
              <th>{{ mark.value }}</th>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <br />
      <h2>Tổng kết</h2>
      <br />
      <p class="subtitle-1">
        Trạng thái:
        <b style="color: green">{{ isPassed(mark) }}</b>
      </p>
    </v-card-text>
  </v-card>
</template>

<script>
import { Attendance } from '@/plugins/api'
import _ from 'lodash'
export default {
  props: {
    mark: Object
  },
  data() {
    return {
      attendance: {
        late: 0,
        attendant: 0,
        total: 0,
        absent: 0
      }
    }
  },
  created() {
    this.fetchAttendance()
  },
  methods: {
    isPassed: mark => {
      return mark.value > 5 ? 'Passed' : 'Failed'
    },
    async fetchAttendance() {
      const attendances = await Attendance.fetch({
        class: this.mark.class.id,
        student: this.mark.student.id
      })

      this.attendance = attendances.reduce(
        (acc, cur) => ({
          ...acc,
          late: (acc.late += cur.status === 'late' ? 1 : 0),
          attendant: (acc.attendant += cur.status === 'attendance' ? 1 : 0)
        }),
        {
          late: 0,
          attendant: 0,
          absent: 0,
          total: _.get(this.mark, 'course.data.count', 0)
        }
      )
    }
  }
}
</script>

<style scoped>
tr,
td,
th {
  border: solid 1px gray;
}
</style>
