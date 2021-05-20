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
              :filter="divisionFilter"
            />
          </v-col>
          <v-col cols="12" md="4">
            <AutocompleteSubject
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
import { get } from 'lodash'

export default {
  components: {
    AutocompleteSubject,
    AutocompleteDivision,
    AutocompleteGrade
  },
  data: () => ({
    subject: '',
    query: '',
    division: '',
    grade: {},
    dialog: true
  }),
  computed: {
    ...mapState('constant', ['subjectsStatus']),

    divisionFilter() {
      return { academicLevel: get(this.grade, 'academicLevel') }
    }
  },
  methods: {
    onFilterChanged() {
      this.$emit('onFilterChanged', {
        grade: get(this.grade, 'id'),
        division: this.division
      })
    },
    gradeChanged(grade) {
      if (get(this.grade, 'academicLevel') !== get(grade, 'academicLevel')) {
        this.division = null
      }
      this.grade = grade
    },
    reset() {
      this.query = ''
      this.grade = ''
      this.division = ''
      this.subject = ''
    }
  }
}
</script>

<style scoped></style>
