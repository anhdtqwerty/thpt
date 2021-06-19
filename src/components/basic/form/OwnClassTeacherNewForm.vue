<template>
  <v-form ref="form">
    <v-row>
      <v-col cols="6" class="pb-0">
        <autocomplete-grade
          required
          class="required"
          :rules="[$rules.required]"
          dense
          outlined
          label="Khối"
          @change="gradeChanged"
        />
      </v-col>
      <v-col cols="6" class="pb-0">
        <autocomplete-class
          v-model="classData"
          clear-icon="mdi-close"
          label="Lớp"
          outlined
          dense
          :filter="gradeId"
          required
          class="required"
          :rules="[$rules.required]"
        />
      </v-col>
      <v-col cols="6" class="py-0" />
      <v-col cols="6" class="py-0">
        <AutocompleteTeacherCard
          ref="autoCompleteTeacherCard"
          v-model="teacher"
          label="Giáo viên chủ nhiệm"
          outlined
          dense
          class="required"
          :rules="[$rules.required, ...rules]"
        />
      </v-col>
    </v-row>
  </v-form>
</template>
<script>
import AutocompleteGrade from '@/components/basic/input/AutocompleteGrade'
import AutocompleteClass from '@/components/basic/input/AutocompleteClass'
import AutocompleteTeacherCard from '@/components/basic/input/AutocompleteTeacherCard'
import { map } from 'lodash'

export default {
  components: {
    AutocompleteGrade,
    AutocompleteClass,
    AutocompleteTeacherCard
  },
  props: {
    state: Boolean
  },
  data() {
    return {
      grade: '',
      classData: null,
      teacher: null,
      rules: [
        value => {
          return (
            !this.classData ||
            !value ||
            !map(this.classData.headTeachers, 'id').includes(value.id) ||
            'Giáo viên này đã được phân công chủ nhiệm cho lớp trên'
          )
        }
      ]
    }
  },
  computed: {
    gradeId() {
      return { grade: this.grade }
    }
  },
  methods: {
    getData() {
      if (this.$refs.form.validate()) {
        return { classData: this.classData, teacher: this.teacher }
      }
      return null
    },
    resetData() {
      this.grade = ''
      this.classData = null
      this.teacher = null
    },
    gradeChanged(grade) {
      if (this.classData && grade && this.classData.grade.id !== grade) {
        this.classData = null
      }
      this.grade = grade
    }
  },
  mounted() {
    this.$refs.form.reset()
  },
  watch: {
    state(state) {
      if (!state) {
        this.resetData()
        this.$refs.form.reset()
      }
    }
  }
}
</script>
