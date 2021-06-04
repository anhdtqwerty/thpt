<template>
  <v-form ref="form">
    <v-row>
      <v-col cols="12" md="10">
        <v-row>
          <v-col cols="12" md="4">
            <AutocompleteGrade
              return-object
              item-text="title"
              clearable
              clear-icon="mdi-close"
              outlined
              placeholder="Khối"
              item-value="id"
              dense
              deletable-chips
              hide-details
              @change="gradeChanged"
            />
          </v-col>
          <v-col cols="12" md="4">
            <AutocompleteDivision
              v-model="division"
              item-text="name"
              item-value="title"
              clear-icon="mdi-close"
              clearable
              placeholder="Phân ban"
              outlined
              dense
              deletable-chips
              hide-details
              @change="divisionChaged"
              :filter="divisionFilter"
            />
          </v-col>
          <v-col cols="12" md="4">
            <AutocompleteSubject
              return-object
              v-model="subject"
              item-text="title"
              clearable
              clear-icon="mdi-close"
              outlined
              placeholder="Môn học"
              item-value="id"
              dense
              deletable-chips
              hide-details
              :filter="subjectTitleFilter"
            />
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12" md="2">
        <v-btn height="40" dark @click="onFilterChanged" color="primary" outlined>
          <v-icon left dark>mdi-filter-outline</v-icon>Lọc
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { mapState } from 'vuex'
import AutocompleteSubject from '@/components/basic/input/AutocompleteSubject.vue'
import AutocompleteDivision from '@/components/basic/input/AutocompleteDivision.vue'
import AutocompleteGrade from '@/components/basic/input/AutocompleteGrade.vue'
import { get, isEmpty } from 'lodash'

export default {
  components: {
    AutocompleteSubject,
    AutocompleteDivision,
    AutocompleteGrade
  },
  data: () => ({
    subject: null,
    query: '',
    division: '',
    grade: null,
    dialog: true
  }),
  computed: {
    ...mapState('constant', ['subjectsStatus']),

    divisionFilter() {
      return { academicLevel: get(this.grade, 'academicLevel') }
    },
    subjectTitleFilter() {
      return {
        grade: get(this.grade, 'id'),
        division: this.division,
      }
    }
  },
  methods: {
    onFilterChanged() {
      this.$emit('onFilterChanged', {
        grade: get(this.grade, 'id'),
        division: this.division,
        id: get(this.subject, 'id')
      })
    },
    divisionChaged(division) {
      if (this.subject && !isEmpty(division) && this.subject.division.id !== division) {
        this.subject = null
      }
    },
    gradeChanged(grade) {
      if (grade && this.grade && get(this.grade, 'academicLevel') !== get(grade, 'academicLevel')) {
        this.division = ''
      }
      if (grade && this.subject && get(grade, 'id') !== this.subject.grade.id) {
        this.subject = null
      }
      this.grade = grade
    },
    reset() {
      this.query = ''
      this.grade = null
      this.division = ''
      this.subject = null
    }
  }
}
</script>

<style scoped></style>
