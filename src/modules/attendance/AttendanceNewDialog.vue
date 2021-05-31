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
                label="Khối"
                outlined
                class="required"
                dense
                :rules="[rules.required]"
                @change="grade = $event"
              />
            </v-col>
            <v-col cols="6">
              <AutocompleteClass
                v-model="classData"
                label="Lớp"
                outlined
                class="required"
                dense
                :rules="[rules.required]"
                :filter="gradeId"
              />
            </v-col>
            <v-col cols="6">
              <AutocompleteStudent
                :syncedValue.sync="student"
                label="Học sinh"
                outlined
                class="required"
                dense
                :rules="[rules.required]"
                :filter="classId"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <time-selector
                @change="timeChange"
                v-model="time"
                label="Giờ đến lớp"
                outlined
                class="required"
                dense
                :rules="[rules.required]"
              />
            </v-col>
            <v-col cols="6">
              <v-checkbox class="my-0" label="Đi học muộn" v-model="late"></v-checkbox>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="ma-2" dark depressed color="#0D47A1" @click="save()">Lưu</v-btn>
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
      student: '',
      time: '',
      late: false,
      dialog: false,
      rules: {
        required: value => !!value || 'Trường này không được để trống',
        min: v => v.length >= 6 || 'Ít nhất 6 ký tự',
        email: v => /.+@.+/.test(v) || 'Email chưa đúng định dạng'
      }
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
      return { currentClass: this.classData.id }
    }
  },
  methods: {
    ...mapActions('attendance', ['checkinAttendance']),
    timeChange(data) {
      this.time = moment(data, 'hh:mm')
        .add(7, 'hours')
        .toISOString()
    },
    async save() {
      if (this.$refs.form.validate()) {
        await this.checkinAttendance({
          student: this.student.id,
          time: this.time
        })
        this.dialog = false
      }
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
