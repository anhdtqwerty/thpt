<template>
  <div>
    <v-row no-gutters>
      <v-col cols="12">
        <v-row class="basic-filter">
          <v-col cols="12" md="4">
            <AutocompleteGrade placeholder="Khối" outlined dense hide-details @change="gradeData = $event" />
          </v-col>
          <v-col cols="12" md="4">
            <AutocompleteClass
              placeholder="Lớp"
              outlined
              dense
              hide-details
              :filter="{ grade: gradeData }"
              @change="classData = $event"
            />
          </v-col>
          <v-col cols="12" md="4">
            <AutocompleteStudent
              return-object
              placeholder="Học sinh"
              outlined
              dense
              hide-details
              :filter="{ currentClass: classData.id }"
              @change="student = $event"
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row class="pt-4" justify="space-between" no-gutters>
      <RadioSemester :generation="currentGeneration" @change="onRadioSemesterChange" />
      <v-col cols="12" md="2">
        <v-btn color="primary" style="width: 100%" @click="onFilterChanged">Xem điểm</v-btn>
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

export default {
  components: {
    AutocompleteClass,
    AutocompleteGrade,
    RadioSemester,
    AutocompleteStudent
  },
  data: () => ({
    classData: '',
    subjectData: '',
    semesterData: '',
    gradeData: '',
    student: ''
  }),
  computed: {
    ...mapState('app', ['currentGeneration'])
  },
  methods: {
    onRadioSemesterChange(semester) {
      this.semesterData = semester
    },
    onFilterChanged() {
      this.$emit('onFilterChanged', {
        class: this.classData,
        grade: this.gradeData,
        semester: this.semesterData,
        student: this.student
      })
    }
  }
}
</script>
