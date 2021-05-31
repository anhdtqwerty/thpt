<template>
  <div>
    <v-row no-gutters>
      <v-col cols="12">
        <v-row class="basic-filter">
          <v-col cols="12" md="4">
            <AutocompleteGrade placeholder="Khối" outlined dense hide-details @change="gradeChanged" />
          </v-col>
          <v-col cols="12" md="4">
            <AutocompleteClass
              v-model="classData"
              placeholder="Lớp"
              outlined
              dense
              hide-details
              :filter="classFilter"
              @change="student = null"
            />
          </v-col>
          <v-col cols="12" md="4">
            <AutocompleteStudent
              :syncedValue.sync="student"
              return-object
              placeholder="Học sinh"
              outlined
              dense
              hide-details
              :filter="currentClassId"
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row class="pt-4" justify="space-between" no-gutters>
      <RadioSemester :generation="currentGeneration" @change="onRadioSemesterChange" />
      <v-col cols="12" md="2">
        <v-btn :disabled="!grade || !classData || !student" color="primary" style="width: 100%" @click="onFilterChanged"
          >Xem điểm</v-btn
        >
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import AutocompleteClass from '@/components/basic/input/AutocompleteClass'
import AutocompleteGrade from '@/components/basic/input/AutocompleteGrade'
import RadioSemester from '@/components/basic/input/RadioSemester'
import AutocompleteStudent from '@/components/basic/input/AutocompleteStudent'
import { get } from 'lodash'

export default {
  components: {
    AutocompleteClass,
    AutocompleteGrade,
    RadioSemester,
    AutocompleteStudent
  },
  data: () => ({
    classData: {},
    subjectData: '',
    semesterData: '',
    grade: '',
    student: {}
  }),
  computed: {
    ...mapState('app', ['currentGeneration']),

    classFilter() {
      return this.grade ? { grade: this.grade } : {}
    },
    currentClassId() {
      return { currentClass: get(this.classData, 'id') }
    }
  },
  methods: {
    onRadioSemesterChange(semester) {
      this.semesterData = semester
    },
    onFilterChanged() {
      this.$emit('onFilterChanged', {
        class: this.classData,
        grade: this.grade,
        semester: this.semesterData,
        student: this.student
      })
    },
    gradeChanged(grade) {
      this.grade = grade
      this.classData = null
      this.student = null
    }
  }
}
</script>
