<template>
  <v-dialog :fullscreen="$vuetify.breakpoint.smAndDown" v-model="dialog" width="600" scrollable>
    <v-card>
      <v-card-title class="primary white--text text-uppercase">
        Thêm điểm danh đến
        <v-spacer></v-spacer>
        <v-btn dark icon>
          <v-icon @click="cancel">close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider />
      <v-card-text>
        <v-form ref="form" class="py-4">
          <p>Ngày {{ getCurrentDate }}</p>
          <v-row>
            <v-col cols="6">
              <AutocompleteGrade
                v-model="grade"
                label="Khối"
                outlined
                class="required"
                dense
                :rules="[$rules.required]"
                @change="gradeChanged"
              />
            </v-col>
            <v-col cols="6">
              <AutocompleteClass
                v-model="classData"
                label="Lớp"
                outlined
                class="required"
                dense
                :rules="[$rules.required]"
                :filter="gradeId"
              />
            </v-col>
            <v-col class="pt-0" cols="6">
              <AutocompleteStudent
                :syncedValue.sync="student"
                label="Học sinh"
                outlined
                class="required"
                dense
                :rules="[$rules.required]"
                :filter="classId"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <TimeSelector
                @change="timeChange"
                v-model="time"
                label="Giờ đến lớp"
                outlined
                class="required"
                dense
                :rules="[$rules.required]"
              />
            </v-col>
            <!-- <v-col cols="6">
              <v-checkbox class="my-0" label="Đi học muộn" v-model="late"></v-checkbox>
            </v-col> -->
          </v-row>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn class="ma-2" outlined light depressed @click="cancel">Hủy</v-btn>
        <v-spacer></v-spacer>
        <v-btn class="ma-2" dark depressed color="#0D47A1" @click="save">Lưu</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import AutocompleteGrade from '@/components/basic/input/AutocompleteGrade'
import AutocompleteClass from '@/components/basic/input/AutocompleteClass'
import AutocompleteStudent from '@/components/basic/input/AutocompleteStudent'
import TimeSelector from '@/components/basic/TimeSelector'
import moment from 'moment'
import { get } from 'lodash'

export default {
  components: {
    AutocompleteGrade,
    AutocompleteClass,
    AutocompleteStudent,
    TimeSelector
  },
  data() {
    return {
      grade: '',
      classData: '',
      student: null,
      time: '',
      late: false,
      dialog: false
    }
  },
  props: {
    state: Boolean
  },
  computed: {
    ...mapState('app', ['department']),
    ...mapState('auth', ['user', 'jwt']),
    getCurrentDate() {
      return moment().format('DD/MM/YYYY')
    },
    gradeId() {
      return { grade: this.grade }
    },
    classId() {
      return { currentClass: get(this.classData, 'id') }
    }
  },
  methods: {
    ...mapActions('attendance', ['checkinAttendance']),
    gradeChanged(grade) {
      this.grade = grade
      this.classData = null
      this.student = null

      this.$refs.form.resetValidation()
    },
    timeChange(data) {
      this.time = moment(data, 'hh:mm')
        // .add(7, 'hours')
        .toISOString()
    },
    async save() {
      if (this.$refs.form.validate()) {
        try {
          this.$loading.active = true
          await this.checkinAttendance({
            student: this.student,
            // class: this.student.currentClass.,
            time: this.time,
            // status: this.late ? 'late' : 'onTime'
            status: 'attendance'
          })
          this.$alert.addSuccess()
          this.$emit('attendanceAdded')
          this.reset()
          this.dialog = false
        } catch (error) {
          console.error(error)
          this.$alert.addError()
        } finally {
          this.$loading.active = false
        }
      }
    },
    reset() {
      this.student = null
      this.classData = null
      this.grade = null
      this.$refs.form.resetValidation()
    },
    cancel() {
      this.dialog = false
    }
  },
  watch: {
    state(state) {
      this.dialog = true
    }
  }
}
</script>
