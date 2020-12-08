<template>
  <form>
    <v-list v-if="!classData.students">
      <v-skeleton-loader class="mx-auto" type="list-item-avatar-two-line"></v-skeleton-loader>
      <v-skeleton-loader class="mx-auto" type="list-item-avatar-two-line"></v-skeleton-loader>
      <v-skeleton-loader class="mx-auto" type="list-item-avatar-two-line"></v-skeleton-loader>
      <v-skeleton-loader class="mx-auto" type="list-item-avatar-two-line"></v-skeleton-loader>
    </v-list>

    <div v-else class="px-2">
      <v-row style="border-bottom: 1px solid #eeeeee" class="align-center" v-for="(item, index) in data" :key="index">
        <v-col cols="4" md="4">
          <card-student-name :student="item.student"></card-student-name>
        </v-col>
        <v-col cols="8" md="8">
          <v-radio-group v-model="item.attendance">
            <div class="d-flex align-top justify-space-around" style="flex-wrap: wrap">
              <v-radio class="mr-3 mb-5" color="red" label="Vắng" value="absent"></v-radio>
              <v-radio class="mr-3 mb-5" color="orange" label="Vắng (Có Phép)" value="approved-absent"></v-radio>
              <v-radio class="mr-3 mb-5" color="yellow" label="Đi Muộn" value="late"></v-radio>
              <v-radio class="mr-3 mb-5" color="green" label="Có Mặt" value="attendance"></v-radio>
            </div>
          </v-radio-group>
        </v-col>
      </v-row>
    </div>
  </form>
</template>

<script>
import CardStudentName from '@/components/basic/card/CardStudentImage.vue'
import { mapActions, mapState } from 'vuex'
import _ from 'lodash'
import moment from 'moment'
export default {
  components: {
    CardStudentName
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
    },
    attendances: {
      type: [Object],
      required: true,
      default: () => {}
    }
  },
  data: () => ({
    data: [
      {
        student: {},
        slot: {},
        attendance: ''
      }
    ]
  }),
  created () {
    this.refresh()
  },
  computed: {
    ...mapState('app', ['department'])
  },
  methods: {
    ...mapActions('classDetail', ['createAttendance']),
    refresh () {
      this.data = [
        ...this.slotData.teachers.map(student => {
          return {
            student,
            type: 'teacher-attendance',
            slot: this.slotData,
            attendance: _.get(
              this.attendances,
              `${this.slotData.id + student.id}.status`,
              ''
            )
          }
        }),
        ...this.slotData.mentors.map(student => {
          return {
            student,
            type: 'mentor-attendance',
            slot: this.slotData,
            attendance: _.get(
              this.attendances,
              `${this.slotData.id + student.id}.status`,
              ''
            )
          }
        }),
        ...this.classData.students.map(student => {
          return {
            student,
            type: 'student-attendance',
            slot: this.slotData,
            attendance: _.get(
              this.attendances,
              `${this.slotData.id + student.id}.status`,
              ''
            )
          }
        })
      ]
    },
    getData () {
      return this.data.map(att => ({
        slot: this.slotData.id,
        slotType: this.slotData.type,
        date: this.slotData.startTime,
        duration: moment
          .duration(moment(this.slotData.endTime).diff(this.slotData.startTime))
          .asHours(),
        student: att.type === 'student-attendance' ? att.student.id : null,
        teacher: att.type === 'teacher-attendance' ? att.student.id : null,
        mentor: att.type === 'mentor-attendance' ? att.student.id : null,
        userId: att.student.id,
        class: this.classData.id,
        course: _.get(this.classData, 'course.id'),
        department: _.get(this.classData, 'department.id,'),
        status: att.attendance,
        type: att.type
      }))
    }
  },
  watch: {
    async slotData (slotData) {
      this.refresh()
    }
  }
}
</script>

<style scoped>
</style>
