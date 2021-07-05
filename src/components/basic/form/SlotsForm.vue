<template>
  <v-form v-model="valid" ref="form" class="pa-2">
    <v-date-picker
      v-model="dates"
      color="#0D47A1"
      hide-default-header
      full-width
      multiple
      no-title
      locale="vi"
      class="elevation-0 mx-n2"
    ></v-date-picker>
    <div class="mb-2 justify-space-around" :class="{ 'd-flex': $vuetify.breakpoint.mdAndUp }">
      <div>
        <time-selector ref="start" v-model="startTime" label="Chọn giờ bắt đầu" input="09:00"></time-selector>
      </div>
      <div>
        <time-selector ref="end" v-model="endTime" label="Chọn giờ kết thúc" input="11:00"></time-selector>
      </div>
    </div>
    <autocomplete-teacher
      v-model="teachers"
      label="Giáo viên"
      outlined
      flat
      dense
      deletable-chips
      chips
      small-chips
      required
      regular
      multiple
    ></autocomplete-teacher>
    <autocomplete-teacher
      v-model="mentors"
      label="Trợ Giảng"
      outlined
      dense
      flat
      deletable-chips
      required
      chips
      small-chips
      multiple
    ></autocomplete-teacher>
    <v-select
      v-model="room"
      item-text="title"
      item-value="id"
      :items="rooms"
      label="Phòng Học"
      outlined
      flat
      dense
    ></v-select>
    <v-text-field :value="profile.name" label="Người Tạo" disabled dense outlined></v-text-field>
  </v-form>
</template>

<script>
import TimeSelector from '@/components/basic/TimeSelector'
import AutocompleteTeacher from '@/components/basic/input/AutocompleteTeacher'
import { mapGetters, mapActions } from 'vuex'
import moment from 'moment'
import { get } from 'lodash'

export default {
  components: {
    TimeSelector,
    AutocompleteTeacher
  },
  props: {
    classData: Object
  },
  computed: {
    ...mapGetters('rooms', ['rooms']),
    ...mapGetters('auth', ['profile'])
  },
  data: () => ({
    valid: true,
    dates: [],
    room: '',
    teachers: [],
    mentors: [],
    startTime: '',
    endTime: ''
  }),
  created() {
    this.reset()
    this.fetchRooms({ department: this.classData.department.id })
  },
  methods: {
    ...mapActions('rooms', ['fetchRooms']),
    validate() {
      return this.$refs.form.validate()
    },
    reset() {
      this.dates = []
      this.teachers = []
      this.mentors = []
      this.startTime = ''
      this.endTime = ''
      this.room = this.classData.room
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
    getData() {
      this.startTime = this.$refs.start.getData()
      this.endTime = this.$refs.end.getData()
      return this.dates.map(date => ({
        code: `${this.classData.code}-${date}-${this.startTime}`,
        startTime: moment(date + ' ' + this.startTime, 'YYYY-MM-DD HH:mm').toISOString(),
        endTime: moment(date + ' ' + this.endTime, 'YYYY-MM-DD HH:mm').toISOString(),
        teachers: this.teachers,
        mentors: this.mentors,
        staff: this.profile.id,
        room: this.room,
        type: 'class-slot',
        status: 'opened',
        department: this.classData.department.id,
        class: this.classData.id,
        tags: this.classData.tags,
        generation: get(this.classData, 'generation.id'),
        rootMajor: get(this.classData, 'rootMajor.id'),
        major: get(this.classData, 'major.id')
      }))
    }
  },
  watch: {
    classData() {}
  }
}
</script>

<style scoped></style>
