<template>
  <v-form v-bind="this.$attrs">
    <v-row class="py-3">
      <v-col cols="10">
        <v-row>
          <v-col cols="4" class="pb-0">
            <autocomplete-grade dense outlined label="Khối" hide-details @change="gradeChanged" />
          </v-col>
          <v-col cols="4" class="pb-0">
            <autocomplete-class
              v-model="classData"
              clear-icon="mdi-close"
              placeholder="Lớp"
              outlined
              dense
              large
              deletable-chips
              hide-details
              :filter="gradeId"
            />
          </v-col>
          <v-col cols="4" class="pb-0">
            <AutocompleteTeacherCard
              v-model="teacher"
              clearable
              clear-icon="mdi-close"
              outlined
              placeholder="Giáo viên"
              dense
              deletable-chips
              hide-details
            />
          </v-col>
        </v-row>
      </v-col>
      <v-col class="d-flex justify-end align-end" cols="2">
        <v-btn height="40" color="#0D47A1" @click="onFilterChanged" outlined>
          Tìm kiếm
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import AutocompleteGrade from '@/components/basic/input/AutocompleteGrade'
import AutocompleteClass from '@/components/basic/input/AutocompleteClass'
import AutocompleteTeacherCard from '@/components/basic/input/AutocompleteTeacherCard'
import { get } from 'lodash'
export default {
  components: {
    AutocompleteGrade,
    AutocompleteTeacherCard,
    AutocompleteClass
  },
  data: () => ({
    teacher: null,
    classData: null,
    grade: ''
  }),
  methods: {
    onFilterChanged() {
      this.$emit('onFilterChanged', {
        classId: get(this.classData, 'id'),
        teacher: this.teacher,
        grade: this.grade
      })
    },
    gradeChanged(grade) {
      if (grade && this.classData && grade.id !== this.classData.grade.id) {
        this.classData = null
      }
      this.grade = grade
    }
  },
  computed: {
    gradeId() {
      return { grade: this.grade }
    }
  }
}
</script>
