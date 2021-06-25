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
                <span>{{ item.class && item.class.title }}</span>
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
            <v-col cols="4">
              <v-checkbox class="my-0" label="Đi học muộn" v-model="late"></v-checkbox>
            </v-col>
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
import { mapActions, mapState, mapGetters } from 'vuex'
import CardStudentName from '@/components/basic/card/CardStudentName'
import TimeSelector from '@/components/basic/TimeSelector'
import { get } from 'lodash'
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
    item: Object
  },
  created() {
    if (this.item) {
      this.late = this.item.status === 'late'
      this.checkIn = this.item.checkin[0]
      this.checkOut = this.item.checkin[1] || ''
    }
  },
  computed: {
    checkInTime() {
      return this.checkIn ? moment(this.checkIn).format('HH:mm') : null
    },
    checkOutTime() {
      return this.checkOut ? moment(this.checkOut).format('HH:mm') : null
    }
  },
  methods: {
    ...mapActions('attendance', ['updateAttendance']),
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
        await this.updateAttendance({
          id: this.item.id,
          status: this.late ? 'late' : 'onTime',
          checkin: [this.checkIn, this.checkOut],
          time: this.checkOut ? this.checkOut : this.checkIn
        })
        this.$alert.updateSuccess()
      } catch (error) {
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