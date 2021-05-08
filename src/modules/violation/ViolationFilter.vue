<template>
  <v-form ref="form" v-bind="this.$attrs">
    <v-row>
      <v-col cols="12" md="10">
        <v-row>
          <v-col cols="12" md="4">
            <DateRangeIOSPicker :date-range.sync="dateRange" placeholder="Ngày" outlined hide-details />
          </v-col>
          <v-col cols="12" md="4">
            <autocomplete-class
              v-model="classData"
              clear-icon="mdi-close"
              clearable
              placeholder="Lớp"
              outlined
              dense
              large
              deletable-chips
              hide-details
            />
          </v-col>
          <v-col cols="12" md="4">
            <autocomplete-student
              v-model="student"
              clearable
              clear-icon="mdi-close"
              outlined
              placeholder="Tên học sinh"
              dense
              deletable-chips
              :filter="currentClassId"
              hide-details
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
  computed: {
    ...mapState('constant', ['classStatus']),
    currentClassId() {
      return { currentClass: get(this.classData, 'id') }
    }
  },
  methods: {
    onFilterChanged() {
      console.log({
        class: this.classData,
        student: this.student,
        dateRange: this.dateRange,
        _sort: 'createdAt:desc'
      })
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
        class: this.classData.id,
        student: this.student.id,
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
  }
}
</script>

<style scoped></style>
