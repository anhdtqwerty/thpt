<template>
  <v-form v-model="valid" ref="form">
    <autocomplete-student
      v-if="!teacher && !staff"
      v-model="student"
      item-text="name"
      clearable
      label="Người mượn là học viên"
      dense
      return-object
    />
    <autocomplete-teacher
      v-if="!student && !staff"
      v-model="teacher"
      item-text="name"
      label="Giáo viên"
      clearable
      placeholder="Người mượn là Giáo Viên"
      dense
      return-object
    />
    <autocomplete-staff
      v-if="!student && !teacher"
      v-model="staff"
      item-text="name"
      label="Nhân viên"
      clearable
      placeholder="Người mượn là Giáo Viên"
      dense
      return-object
    />

    <v-select
      ref="status"
      dense
      v-model="status"
      item-text="title"
      item-value="status"
      :items="facilityStatus"
      disabled
      outlined
      label="Tình Trạng"
    ></v-select>
    <date-selector label="Hạn Trả" :date="deadlineValue" @change="onDeadlineChange"></date-selector>
    <v-text-field ref="date" dense :value="displaydate" label="Ngày Mượn" disabled></v-text-field>
  </v-form>
</template>

<script>
import { mapState } from 'vuex'
import AutocompleteStudent from '@/components/basic/input/AutocompleteStudent.vue'
import AutocompleteTeacher from '@/components/basic/input/AutocompleteTeacher'
import AutocompleteStaff from '@/components/basic/input/AutocompleteStaff'
import DateSelector from '@/components/basic/DateSelector.vue'
import { get } from 'lodash'
import moment from 'moment'
export default {
  components: {
    AutocompleteStudent,
    AutocompleteTeacher,
    DateSelector,
    AutocompleteStaff
  },
  props: { facility: Object },
  data: () => ({
    valid: true,
    student: null,
    staff: null,
    status: 'using',
    teacher: null,
    deadline: '',
    date: ''
  }),
  created() {
    this.reset()
  },
  computed: {
    ...mapState('constant', ['facilityStatus', 'facilityTypes']),
    displaydate() {
      return moment(this.date).format('DD/MM/YYYY')
    },
    deadlineValue() {
      return moment(this.deadline).format('YYYY-MM-DD')
    },
    facilityDuration() {
      return [
        {
          title: 'Trong Ngày',
          value: moment()
            .endOf('date')
            .toISOString()
        },
        {
          title: '1 Ngày',
          value: moment()
            .add(1, 'days')
            .toISOString()
        },
        {
          title: '1 Tuần',
          value: moment()
            .add(1, 'week')
            .toISOString()
        },
        {
          title: '1 Tháng',
          value: moment()
            .add(1, 'months')
            .toISOString()
        },
        {
          title: 'Vô Thời Hạn',
          value: null
        }
      ]
    }
  },
  methods: {
    validate() {
      this.$refs.form.validate()
    },
    onDeadlineChange(value) {
      this.deadline = moment(value, 'YYYY-MM-DD').toISOString()
    },
    reset() {
      if (!this.facility) {
        this.student = null
        this.teacher = null
        this.staff = null
        this.deadline = moment()
          .endOf('date')
          .toISOString()
        this.date = moment().toISOString()
      } else {
        this.student = this.facility.student
        this.teacher = this.facility.teacher
        this.staff = this.facility.staff
        this.deadline = this.facility.deadline
        this.date = this.facility.date
      }
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
    getData() {
      console.log({
        teacher: get(this.teacher, 'id', null),
        student: get(this.student, 'id', null),
        staff: get(this.staff, 'id', null),
        status: this.status,
        deadline: this.deadline,
        date: this.date
      })
      return {
        teacher: get(this.teacher, 'id', null),
        student: get(this.student, 'id', null),
        staff: get(this.staff, 'id', null),
        status: this.status,
        deadline: this.deadline,
        date: this.date
      }
    }
  },
  watch: {
    facility() {
      this.reset()
    }
  }
}
</script>

<style scoped></style>
