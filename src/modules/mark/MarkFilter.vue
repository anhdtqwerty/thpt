<template>
  <div>
    <v-row no-gutters>
      <v-col cols="12">
        <v-row class="basic-filter">
          <v-col cols="12" md="4">
            <AutocompleteGrade label="Khối" placeholder="Khối" outlined dense hide-details @change="gradeChanged" />
          </v-col>
          <v-col cols="12" md="4">
            <AutocompleteClass
              v-model="classData"
              label="Lớp"
              placeholder="Lớp"
              outlined
              dense
              hide-details
              :filter="classFilter"
              :disabled="!grade"
              @change="subjectData = null"
            />
          </v-col>
          <v-col cols="12" md="4">
            <AutocompleteSubject
              label="Môn học"
              v-model="subjectData"
              return-object
              placeholder="Môn học"
              outlined
              dense
              hide-details
              :filter="subjectFilter"
              :disabled="!classData"
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row class="pt-4" justify="space-between" no-gutters>
      <RadioSemester :generation="currentGeneration" @change="onRadioSemesterChange" />
      <v-col cols="12" md="2">
        <v-btn
          :disabled="!grade || !classData || !subjectData"
          color="primary"
          style="width: 100%"
          @click="onFilterChanged"
          >Xem điểm</v-btn
        >
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import AutocompleteClass from '@/components/basic/input/AutocompleteClass'
import AutocompleteSubject from '@/components/basic/input/AutocompleteSubject'
import AutocompleteGrade from '@/components/basic/input/AutocompleteGrade'
import RadioSemester from '@/components/basic/input/RadioSemester'
import { get } from 'lodash'

export default {
  components: {
    AutocompleteClass,
    AutocompleteSubject,
    AutocompleteGrade,
    RadioSemester
  },
  data: () => ({
    classData: '',
    subjectData: '',
    semesterData: '',
    grade: ''
  }),
  computed: {
    ...mapState('app', ['currentGeneration']),

    classFilter() {
      return this.grade ? { grade: this.grade } : {}
    },
    subjectFilter() {
      return { division: get(this.classData, 'division.id') }
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
        subject: this.subjectData.id
      })
    },
    gradeChanged(grade) {
      this.grade = grade
      this.classData = null
      this.subjectData = null
    }
  }
}
</script>
