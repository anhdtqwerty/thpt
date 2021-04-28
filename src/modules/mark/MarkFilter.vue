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
            <AutocompleteSubject
              return-object
              placeholder="Môn học"
              outlined
              dense
              hide-details
              :filter="{ grade: gradeData }"
              @change="subjectData = $event"
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
import AutocompleteSubject from '@/components/basic/input/AutocompleteSubject'
import AutocompleteGrade from '@/components/basic/input/AutocompleteGrade'
import RadioSemester from '@/components/basic/input/RadioSemester'

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
    gradeData: ''
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
        subject: this.subjectData.id
      })
    }
  }
}
</script>
