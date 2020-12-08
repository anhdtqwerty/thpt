<template>
  <v-card flat>
    <v-card-text class="pa-6">
      <v-row no-gutters>
        <v-col cols="12" md="6" class="{'pr-5': $vuetify.breakpoint.mdAndUp}">
          <date-selector
            :date="date"
            label="Ngày"
            full-width
            @change="onDateChange"
          ></date-selector>
        </v-col>
      </v-row>
      <v-row class="mb-2" no-gutters>
        <v-col cols="12" md="6" class="{'pr-10': $vuetify.breakpoint.mdAndUp}">
          <time-selector
            class="pr-6"
            label="Giờ bắt đầu"
            :input="startTime"
            @change="onStartTimeChange"
          ></time-selector>
        </v-col>
        <v-col cols="12" md="6">
          <time-selector
            label="Giờ kết thúc"
            :input="endTime"
            @change="onEndTimeChange"
          ></time-selector>
        </v-col>
      </v-row>
      <v-select
        v-model="slotData.room"
        :items="rooms"
        item-text="title"
        item-value="id"
        label="Phòng Học"
        height="40"
        outlined
        dense
      ></v-select>
      <autocomplete-teacher
        v-model="teachers"
        :defaultTeachers="teachers"
        item-text="name"
        item-value="id"
        label="Giáo viên"
        outlined
        dense
        deletable-chips
        chips
        small-chips
        multiple
      ></autocomplete-teacher>
      <autocomplete-teacher
        v-model="mentors"
        item-text="name"
        item-value="id"
        label="Trợ Giảng"
        chips
        outlined
        dense
        small-chips
        deletable-chips
        multiple
      ></autocomplete-teacher>
      <v-select
        :items="slotTypes"
        v-model="type"
        item-text="title"
        label="Phân Loại"
        item-value="status"
        dense
        outlined
        chips
        small-chips
      ></v-select>
      <v-select
        :items="slotStatus"
        v-model="status"
        item-text="title"
        label="Trạng Thái"
        item-value="status"
        disabled
        outlined
        dense
        chips
        small-chips
      ></v-select>
      <v-textarea
        ref="notes"
        label="Ghi Chú"
        v-model="notes"
        outlined
      ></v-textarea>
    </v-card-text>
    <v-card-actions class="mt-n10 pr-6 pb-5">
      <v-spacer></v-spacer>
      <v-btn class="px-6" color="primary" @click="save">Lưu</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import DateSelector from '@/components/basic/DateSelector'
import TimeSelector from '@/components/basic/TimeSelector'
import moment from 'moment'
import { mapActions, mapState, mapGetters } from 'vuex'
import AutocompleteTeacher from '@/components/basic/input/AutocompleteTeacher'

export default {
  props: {
    slotData: {
      type: [Object],
      required: true,
      default: () => {}
    }
  },
  components: {
    DateSelector,
    TimeSelector,
    AutocompleteTeacher
  },
  data: () => ({
    valid: true,
    name: '',
    room: '',
    email: '',
    date: '2019-10-10',
    startTime: '09:00',
    endTime: '11:00',
    notes: '',
    type: '',
    status: '',
    address: '',
    parentName: '',
    teachers: [],
    mentors: []
  }),
  async created() {
    this.reset()
  },
  computed: {
    ...mapGetters('rooms', ['rooms']),
    ...mapState('app', ['staffs']),
    ...mapState('constant', ['slotStatus', 'slotTypes'])
  },
  methods: {
    ...mapActions('rooms', ['fetchRooms']),
    save() {
      this.$emit('save', {
        title: this.title,
        code: this.code,
        type: this.type,
        room: this.room,
        status: this.status,
        teachers: this.teachers,
        mentors: this.mentors,
        address: this.address,
        startTime: moment(
          this.date + ' ' + this.startTime,
          'YYYY-MM-DD HH:mm'
        ).toISOString(),
        endTime: moment(
          this.date + ' ' + this.endTime,
          'YYYY-MM-DD HH:mm'
        ).toISOString(),
        description: this.notes
      })
    },
    reset() {
      this.title = this.slotData.title
      this.code = this.slotData.code
      this.type = this.slotData.type
      this.room = this.slotData.room
      this.status = this.slotData.status
      this.notes = this.slotData.description
      this.teachers = this.slotData.teachers.map((teacher) => teacher.id)
      this.mentors = this.slotData.mentors.map((teacher) => teacher.id)
      this.date = moment(this.slotData.startTime).format('YYYY-MM-DD')
      this.startTime = moment(
        this.slotData.startTime || '2019-10-10 09:00'
      ).format('HH:mm')
      this.endTime = moment(this.slotData.endTime || '2019-10-10 11:00').format(
        'HH:mm'
      )
      this.fetchRooms({ department: this.slotData.department.id })
    },
    onDateChange(date) {
      this.date = date
    },
    onStartTimeChange(startTime) {
      this.startTime = startTime
    },
    onEndTimeChange(endTime) {
      this.endTime = endTime
    }
  },
  watch: {
    slotData() {
      this.reset()
    }
  }
}
</script>

<style scoped>
</style>
