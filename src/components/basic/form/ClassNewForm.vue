<template>
  <v-form ref="form" flat class="pa-6">
    <div class="d-flex">
      <autocomplete-grade
        return-object
        class="required mr-2"
        item-text="title"
        item-value="id"
        label="Khối"
        required
        dense
        outlined
        auto-select-first
        :rules="[$rules.required]"
        @change="grade = $event"
      />
      <autocomplete-division
        class="required mr-2"
        v-model="division"
        item-text="title"
        item-value="id"
        label="Ban"
        required
        dense
        outlined
        auto-select-first
        :rules="[$rules.required]"
        :filter="gradeId"
      />
    </div>
    <v-text-field
      ref="title"
      v-model="title"
      label="Tên lớp"
      placeholder="Nhập tên lớp"
      outlined
      required
      dense
      class="required"
      :rules="[$rules.required]"
    >
      <span slot="prepend-inner" class="mt-1">{{ gradeText }}</span>
    </v-text-field>
    <v-textarea ref="description" v-model="description" label="Mô Tả" hide-details outlined />
  </v-form>
</template>
<script>
import { get } from 'lodash'
import AutocompleteGrade from '@/components/basic/input/AutocompleteGrade'
import AutocompleteDivision from '@/components/basic/input/AutocompleteDivision'
import { textHelpers } from '@/helpers/TextHelper.js'

export default {
  components: {
    AutocompleteGrade,
    AutocompleteDivision
  },
  props: {
    classData: {
      type: [Object],
      required: true,
      default: () => {}
    },
    gradeData: Object,
    courseData: Object
  },
  data: () => ({
    valid: true,
    course: '',
    grade: '',
    division: '',
    title: '',
    description: ''
  }),
  computed: {
    getCourseItems() {
      return this.grade ? this.grade.courses : []
    },
    gradeId() {
      return { grade: get(this.grade, 'id') }
    },
    gradeText() {
      return textHelpers.getNumber(get(this.grade, 'title', ''))
    }
  },
  methods: {
    getCourseFilter() {
      return { grade: get(this.grade, 'id', null) }
    },
    reset() {
      this.$refs.form.reset()
    },
    validate() {
      return this.$refs.form.validate()
    },
    resetDefault() {
      if (this.classData) {
        this.code = this.classData.code
        this.title = this.classData.title
        this.course = this.courseData || this.classData.course
        this.grade = this.gradeData || this.classData.grade
        this.description = this.classData.description
      } else {
        this.code = ''
        this.title = ''
        this.course = null
        this.grade = null
        this.description = ''
      }
    },
    getData() {
      return {
        description: this.description,
        division: this.division,
        grade: this.grade,
        code: this.code,
        title: this.gradeText + this.title.trim()
      }
    }
  },
  created() {
    this.resetDefault()
  },
  watch: {
    classData() {
      this.resetDefault()
    }
  }
}
</script>

<style scoped></style>
