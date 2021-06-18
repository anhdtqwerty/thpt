<template>
  <v-form ref="form" v-bind="this.$attrs">
    <v-row>
      <v-col cols="12" md="10">
        <v-row>
          <v-col cols="12" md="4">
            <DateRangeIOSPicker :date-range.sync="dateRange" placeholder="Ngày" outlined hide-details />
          </v-col>
          <v-col cols="12" md="4">
            <AutocompleteClass
              v-model="classData"
              clear-icon="mdi-close"
              clearable
              placeholder="Lớp"
              outlined
              dense
              large
              deletable-chips
              hide-details
              @change="student = null"
            />
          </v-col>
          <v-col cols="12" md="4">
            <AutocompleteStudent
              :syncedValue.sync="student"
              clearable
              clear-icon="mdi-close"
              outlined
              placeholder="Học sinh"
              dense
              deletable-chips
              :filter="currentClassId"
              hide-details
              item-text="display"
              item-value="id"
            />
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12" md="2">
        <v-btn height="40" dark @click="onFilterChanged" color="primary" outlined>
          Tìm kiếm
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'
import AutocompleteStudent from '@/components/basic/input/AutocompleteStudent.vue'
import AutocompleteClass from '@/components/basic/input/AutocompleteClass.vue'
import DateRangeIOSPicker from '@/components/basic/picker/DateRangeIOSPicker.vue'
import { get } from 'lodash'
import { Student } from '../../plugins/api'

export default {
  components: {
    AutocompleteClass,
    AutocompleteStudent,
    DateRangeIOSPicker
  },
  data: () => ({
    student: {},
    classData: '',
    tags: '',
    query: '',
    time: null,
    dateData_gte: '',
    dateData_lte: '',
    dateRange: []
  }),
  props: {
    defaultStudentId: {
      type: String,
      default: () => ''
    }
  },
  computed: {
    ...mapState('constant', ['classStatus']),
    currentClassId() {
      return { currentClass: get(this.classData, 'id') }
    }
  },
  methods: {
    onFilterChanged() {
      this.dateData_gte = ''
      this.dateData_lte = ''
      if (this.dateRange.length > 1) {
        this.dateData_gte = moment(this.dateRange[0], 'DD/MM/YYYY').toISOString()
        this.dateData_lte = moment(this.dateRange[1], 'DD/MM/YYYY').toISOString()
      } else if (this.dateRange.length > 0) {
        this.dateData_gte = moment(this.dateRange[0], 'DD/MM/YYYY').toISOString()
        this.dateData_lte = moment(this.dateRange[0], 'DD/MM/YYYY').toISOString()
      }
      this.$emit('onFilterChanged', {
        class: get(this.classData, 'id'),
        student: get(this.student, 'id'),
        date_gte: this.dateData_gte,
        date_lte: this.dateData_lte,
        _sort: 'createdAt:desc'
      })
    },
    reset() {
      this.classData = ''
      this.student = ''
      this.dateRange = []
    }
  },
  watch: {
    async defaultStudentId(newValue) {
      if (newValue) {
        const student = await Student.fetchOne(newValue)
        this.student = student
        this.classData = student.currentClass
      }
    }
  }
}
</script>

<style scoped></style>
