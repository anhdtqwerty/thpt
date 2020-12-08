<template>
  <v-sheet>
    <Breadcrumbs
      v-if="classData"
      data="classData.title"
      :headline="classData.title"
      :link="[
        { text: 'Danh sách lớp', href: '../../../classes' },
        {
          text: classData.title,
          id: classData.id,
          href: `../../class/${classData.id}`,
        },
        { text: 'Điểm Danh' },
      ]"
    />
    <v-row>
      <v-col sm="12" :lg="draw ? 12 : 9" class="pl-4">
        <v-sheet height="64">
          <v-toolbar flat color="white">
            <v-toolbar-title>Tổng số: {{ slots.length }} buổi</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-title
              >Chọn: {{ temporarySlots.length }} buổi</v-toolbar-title
            >
            <v-spacer></v-spacer>
            <v-btn fab text small @click="$refs.calendar.prev()">
              <v-icon small>mdi-chevron-left</v-icon>
            </v-btn>
            <v-toolbar-title>{{ title }}</v-toolbar-title>
            <v-btn fab text small @click="$refs.calendar.next()">
              <v-icon small>mdi-chevron-right</v-icon>
            </v-btn>
          </v-toolbar>
        </v-sheet>
        <v-sheet height="500">
          <v-calendar
            :events="allSlots"
            event-more
            :event-color="getEventColor"
            ref="calendar"
            v-model="startTime"
            short-weekdays
            type="month"
            @click:event="onEventSelected"
          >
            <template v-slot:header="day">
              <div v-if="day.weekday % 2" class="day-header">
                day-header slot date
              </div>
            </template>
            <template v-slot:day-body="day">
              <div v-if="day.weekday % 3 === 2" class="day-body">
                day-body slot date
              </div>
            </template>
          </v-calendar>
        </v-sheet>
      </v-col>
      <v-col sm="12" lg="3" class="mb-4 controls" v-show="!draw">
        <date-selector
          :date="date"
          label="Chọn ngày"
          @change="onDateChange"
        ></date-selector>
        <time-selector
          label="Chọn giờ bắt đầu"
          input="09:00"
          @change="onStartTimeChange"
        ></time-selector>
        <time-selector
          label="Chọn giờ kết thúc"
          input="11:00"
          @change="onEndTimeChange"
        ></time-selector>
        <v-select
          v-model="interval"
          :items="intervalsOptions"
          item-text:text
          item-value:
          value
        ></v-select>
        <v-text-field
          v-show="!!interval"
          label="Số lần lặp"
          type="number"
          v-model="loop"
          @change="generateTemporarySlots"
        ></v-text-field>
        <v-checkbox
          v-show="!!interval"
          v-model="isSkipHoliday"
          label="Bỏ qua ngày nghỉ lễ"
        ></v-checkbox>
        <v-card-actions>
          <v-btn small color="red">Hủy</v-btn>
          <v-spacer></v-spacer>
          <v-btn small color="green" @click="saveSlots">Thêm lịch</v-btn>
        </v-card-actions>
      </v-col>
      <slot-drawer :draw="draw" @onDrawerStateChange="updateDraw"></slot-drawer>
    </v-row>
  </v-sheet>
</template>
<script>
import DateSelector from '@/components/basic/DateSelector'
import TimeSelector from '@/components/basic/TimeSelector'
import Breadcrumbs from '@/components/layout/Breadcrumbs.vue'
import SlotDrawer from '@/modules/slot/SlotDrawer'
import { mapActions, mapState, mapGetters } from 'vuex'
import moment from 'moment'

export default {
  components: {
    DateSelector,
    TimeSelector,
    SlotDrawer,
    Breadcrumbs,
  },
  data: () => ({
    draw: false,
    isSkipHoliday: true,
    type: 'month',
    date: moment().format('YYYY-MM-DD'),
    loop: 0,
    startTime: moment('09:00', 'hh:mm').toISOString(),
    endTime: moment('11:00', 'hh:mm').toISOString(),
    interval: null,
    intervalsOptions: [
      { text: 'Không Lặp lại', value: null },
      { text: 'Lặp lại theo tuần', value: 'weekly' },
    ],
    temporarySlots: [],
  }),

  computed: {
    ...mapState('app', ['roles', 'department', 'user']),
    ...mapState('auth', ['user']),
    ...mapGetters('classDetail', [
      'classData',
      'slots',
      'classList',
      'attendances',
    ]),
    title() {
      const date = moment(this.date, 'YYYY-MM-DD')
      return 'Tháng ' + date.format('MM YYYY')
    },
    allSlots() {
      return this.temporarySlots.concat(this.slots).map((slot) => slot.metadata)
    },
  },
  methods: {
    ...mapActions('slot', ['createSlots', 'fetchSlots', 'setSlot']),
    updateDraw(draw) {
      this.draw = draw
    },
    onEventSelected(data) {
      const i = this.slots.findIndex((slot) => slot.code === data.event.name)
      if (i > -1) {
        this.setSlot(this.slots[i])
        this.draw = true
      }
    },
    onDateChange(date) {
      this.date = date
      this.generateTemporarySlots()
    },
    onStartTimeChange(startTime) {
      this.startTime = startTime
      this.generateTemporarySlots()
    },
    onEndTimeChange(endTime) {
      this.endTime = endTime
      this.generateTemporarySlots()
    },
    generateTemporarySlots() {
      if (!this.interval) {
        this.temporarySlots = [this.generateTemporarySlot(this.date)]
      } else if (this.interval === 'weekly') {
        this.temporarySlots = []
        for (let i = 0; i < this.loop; i++) {
          let date = moment(this.date, 'YYYY-MM-DD')
            .add(i, 'weeks')
            .format('YYYY-MM-DD')
          this.temporarySlots.push(this.generateTemporarySlot(date))
        }
      }
    },
    saveSlots() {
      this.generateTemporarySlots()
      this.createSlots(
        this.temporarySlots.map((slot) => {
          return {
            ...slot,
            metadata: {
              ...slot.metadata,
              color: 'blue',
            },
          }
        })
      )
      this.temporarySlots = []
    },
    getEventColor(event) {
      return event.color
    },
    generateTemporarySlot(date) {
      return {
        title: this.classData.title,
        code: this.classData.code + '-' + date,
        startTime: moment(
          date + ' ' + this.startTime,
          'YYYY-MM-DD HH:mm'
        ).toISOString(),
        endTime: moment(
          date + ' ' + this.endTime,
          'YYYY-MM-DD HH:mm'
        ).toISOString(),
        type: 'class-slot',
        status: 'opened',
        department: this.department.id,
        staff: [this.user.id],
        class: this.classData.id,
        teachers: Array.isArray(this.classData.teachers)
          ? this.classData.teachers.map((teacher) => teacher.id)
          : [],
        mentors: Array.isArray(this.classData.mentors)
          ? this.classData.mentors.map((mentor) => mentor.id)
          : [],
        metadata: {
          name:
            this.classData.code + '-' + date ||
            this.classData.title ||
            'Default Title',
          details: this.classData.code,
          start: date,
          end: date,
          color: 'red',
        },
      }
    },
  },
}
</script>

<style scoped>
.controls {
  position: relative;
}
</style>
