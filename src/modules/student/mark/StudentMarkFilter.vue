<template>
  <div>
    <v-row no-gutters>
      <v-col cols="12">
        <v-row class="basic-filter">
          <v-col cols="12" md="4">
            <AutocompleteGrade
              return-object
              v-model="grade"
              label="Khối"
              outlined
              dense
              hide-details
              @change="gradeChanged"
            />
          </v-col>
          <v-col cols="12" md="4">
            <AutocompleteClass
              v-model="classData"
              label="Lớp"
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
              label="Học sinh"
              outlined
              dense
              hide-details
              :filter="currentClassId"
              item-text="display"
              item-value="id"
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
import { Student } from '../../../plugins/api'

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
  props: {
    defaultStudentId: { type: String, default: () => '' }
  },
  computed: {
    ...mapState('app', ['currentGeneration']),

    classFilter() {
      return { grade: get(this.grade, 'id') }
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
        semester: this.semesterData,
        student: this.student,
        grade: this.student.grade.id
      })
    },
    gradeChanged(grade) {
      this.grade = grade
      this.classData = null
      this.student = null
    }
  },
  watch: {
    async defaultStudentId(newValue) {
      if (newValue) {
        const student = await Student.fetchOne(newValue)
        this.student = student
        this.classData = student.currentClass
        this.grade = student.grade
        this.$emit('onFilterChanged', {
          class: student.currentClass,
          semester: this.semesterData,
          student: student,
          grade: student.grade.id
        })
      }
    }
  }
}
</script>
