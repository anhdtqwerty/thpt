<template>
  <v-dialog :fullscreen="$vuetify.breakpoint.smAndDown" v-model="dialog" width="581" scrollable>
    <v-card>
      <v-card-title class="primary white--text text-uppercase">
        Sửa điểm danh
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
              <CardStudentName :student="item.student" />
            </v-col>
            <v-col class="d-flex justify-space-between align-center" cols="6">
              <div>
                <p class="text-caption my-0">Ngày sinh</p>
                <span>{{ item.student.dob | ddmmyyyy }}</span>
              </div>
              <div>
                <p class="text-caption my-0">Mã số</p>
                <span>{{ item.student.code | getStudentCode }}</span>
              </div>
              <div>
                <p class="text-caption my-0">Lớp</p>
                <span>{{ item.student | _get('currentClass.title') }}</span>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4">
              <div>
                <TimeSelector
                  @change="checkInChange"
                  v-model="checkIn"
                  label="Giờ đến"
                  outlined
                  class="required"
                  dense
                  :rules="[$rules.required]"
                  :input="checkInTime"
                  :defaultTime="null"
                />
              </div>
            </v-col>
            <v-col cols="4" class="d-flex justify-center align-center">
              <div>
                <TimeSelector
                  @change="checkOutChange"
                  v-model="checkOut"
                  label="Giờ về"
                  outlined
                  dense
                  :input="checkOutTime"
                  :defaultTime="null"
                />
              </div>
            </v-col>
            <!-- <v-col cols="4">
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
import { mapActions } from 'vuex'
import CardStudentName from '@/components/basic/card/CardStudentName'
import TimeSelector from '@/components/basic/TimeSelector'
import moment from 'moment'

export default {
  components: {
    CardStudentName,
    TimeSelector
  },
  data() {
    return {
      dialog: false,
      currentClass: null,
      checkIn: '',
      checkOut: '',
      late: false
    }
  },
  props: {
    state: Boolean,
    item: Object,
    checkinIndex: Number
  },
  created() {
    if (this.item.attendance) {
      this.late = this.item.status === 'late'
      this.checkIn = this.item.attendance.checkin[this.checkinIndex] || ''
      this.checkOut = this.item.attendance.checkin[this.checkinIndex + 1] || ''
    }
  },
  computed: {
    getCurrentDate() {
      return moment().format('DD/MM/YYYY')
    },
    checkInTime() {
      return this.checkIn ? moment(this.checkIn).format('HH:mm') : null
    },
    checkOutTime() {
      return this.checkOut ? moment(this.checkOut).format('HH:mm') : null
    }
  },
  methods: {
    ...mapActions('attendance', ['updateAttendance', 'createAttendance']),
    checkInChange(data) {
      this.checkIn = moment(data, 'hh:mm').toISOString()
    },
    checkOutChange(data) {
      this.checkOut = moment(data, 'hh:mm').toISOString()
    },
    async save() {
      if (!this.$refs.form.validate()) return

      try {
        this.$loading.active = true
        if (!this.item.attendance) {
          await this.createAttendance({
            status: this.late ? 'late' : 'onTime',
            checkin: [this.checkIn, this.checkOut],
            time: this.checkOut ? this.checkOut : this.checkIn,
            student: this.item.student.id,
            class: this.item.student.currentClass.id
          })
        } else {
          const checkin = [...this.item.attendance.checkin]
          if (this.checkIn) checkin[this.checkinIndex] = this.checkIn
          if (this.checkOut) checkin[this.checkinIndex + 1] = this.checkOut

          await this.updateAttendance({
            id: this.item.attendance.id,
            status: this.late ? 'late' : 'onTime',
            checkin,
            time: this.checkOut ? this.checkOut : this.checkIn
          })
        }

        this.$alert.updateSuccess()
        this.$emit('attendanceUpdated')
      } catch (error) {
        console.error(error)
        this.$alert.updateError()
      } finally {
        this.$loading.active = false
      }

      this.dialog = false
    },
    reset() {
      this.$refs.form.reset()
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
