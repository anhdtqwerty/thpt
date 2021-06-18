<template>
  <v-form v-bind="this.$attrs">
    <v-row class="py-3">
      <v-col cols="10">
        <v-row>
          <v-col cols="4" class="pb-0">
            <AutocompleteGrade return-object label="Khối" dense outlined @change="gradeChanged" hide-details />
          </v-col>
          <v-col cols="4" class="pb-0">
            <AutocompleteClass v-model="classData" label="Lớp" outlined dense :filter="classFilter" hide-details />
          </v-col>
          <v-col cols="4" class="pb-0">
            <AutocompleteTeacherCard
              prepend-inner-icon="mdi-magnify"
              v-model="teacher"
              item-text="name"
              clear-icon="mdi-close"
              label="Giáo viên"
              outlined
              dense
              deletable-chips
            />
          </v-col>

          <v-col cols="4" class="pt-0">
            <AutocompleteSubject
              v-model="subject"
              clear-icon="mdi-close"
              label="Môn học"
              outlined
              dense
              :filter="subjectFilter"
              hide-details
            />
          </v-col>
          <v-col cols="4" class="pt-0">
            <AutocompleteSubjectGroup
              clear-icon="mdi-close"
              label="Bộ môn"
              class="col-md-6 mr-4"
              deletable-chips
              dense
              hide-details
              outlined
              @change="subjectGroupChanged"
              :filter="subjectGroupFilter"
            />
          </v-col>
        </v-row>
      </v-col>
      <v-col class="d-flex justify-end align-end pt-0" cols="2">
        <v-btn height="40" color="#0D47A1" @click="onFilterChanged" outlined>
          Tìm kiếm
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import AutocompleteGrade from '@/components/basic/input/AutocompleteGrade'
import AutocompleteSubject from '@/components/basic/input/AutocompleteSubject'
import AutocompleteClass from '@/components/basic/input/AutocompleteClass'
import AutocompleteTeacherCard from '@/components/basic/input/AutocompleteTeacherCard'
import AutocompleteSubjectGroup from '@/components/basic/input/AutocompleteSubjectGroup'
import { get } from 'lodash'
import { mapState } from 'vuex'
export default {
  components: {
    AutocompleteGrade,
    AutocompleteTeacherCard,
    AutocompleteSubject,
    AutocompleteClass,
    AutocompleteSubjectGroup
  },
  data: () => ({
    subject: '',
    classData: null,
    grade: null,
    teacher: null,
    subjectGroup: ''
  }),
  methods: {
    onFilterChanged() {
      this.$emit('onFilterChanged', {
        teacher: get(this.teacher, 'id'),
        grade: get(this.grade, 'id'),
        class: get(this.classData, 'id'),
        subject: this.subject,
        subjectGroup: this.subjectGroup
      })
    },
    gradeChanged(grade) {
      if (grade && get(this.grade, 'academicLevel') !== get(grade, 'academicLevel')) {
        this.classData = null
        this.subjectGroup = ''
        this.subject = ''
      }
      this.grade = grade
    },
    subjectGroupChanged(subjectGroup) {
      if (subjectGroup && subjectGroup !== this.subjectGroup) {
        this.subject = ''
      }
      this.subjectGroup = subjectGroup
    }
  },
  computed: {
    ...mapState('subjects', ['subjects']),
    classFilter() {
      return { grade: get(this.grade, 'id') }
    },
    subjectFilter() {
      return { subjectGroup: this.subjectGroup, grade: get(this.grade, 'id') }
    },
    subjectGroupFilter() {
      return {
        academicLevel: get(this.grade, 'academicLevel')
      }
    }
  }
}
</script>
