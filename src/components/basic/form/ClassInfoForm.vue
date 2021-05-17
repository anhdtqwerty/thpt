<template>
  <v-form ref="form" flat class="pa-6">
    <div class="d-flex">
      <AutocompleteGrade
        return-object
        v-model="grade"
        item-text="title"
        item-value="id"
        label="Khối"
        required
        dense
        outlined
        class="required mr-2"
        :rules="[$rules.required]"
        @change="grade = $event"
      />

      <AutocompleteDivision
        :div.sync="division"
        item-text="title"
        item-value="id"
        label="Ban"
        return-object
        required
        dense
        outlined
        class="required"
        :rules="[$rules.required]"
        :filter="gradeId"
      />
    </div>
    <v-text-field
      ref="title"
      v-model="className"
      label="Tên lớp"
      placeholder="Nhập tên lớp"
      outlined
      class="required"
      :rules="[$rules.required]"
      dense
    >
      <span slot="prepend-inner" class="mt-1">{{ gradeText }}</span>
    </v-text-field>

    <v-textarea ref="description" v-model="description" label="Ghi chú" outlined></v-textarea>
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
    startTime: '',
    endTime: '',
    title: '',
    description: '',
    teachers: [],
    mentors: [],
    staff: {},
    className: ''
  }),
  computed: {
    getCourseItems() {
      return this.grade ? this.grade.courses : []
    },
    gradeId() {
      return { grade: this.grade.id }
    },
    gradeText() {
      return textHelpers.getNumber(get(this.grade, 'title', ''))
    }
  },
  methods: {
    getCourseFilter() {
      return { grade: get(this.grade, 'id', null) }
    },
    validate() {
      return this.$refs.form.validate()
    },
    resetDefault() {
      if (this.classData) {
        this.teachers = this.classData.teachers
        this.mentors = this.classData.mentors
        this.code = this.classData.code
        this.title = this.classData.title
        this.grade = this.classData.grade
        this.className = this.title.replace(this.gradeText, '')
        this.course = this.courseData || this.classData.course
        this.division = this.classData.division
        this.startTime = this.classData.startTime
        this.description = this.classData.description
        this.endTime = this.classData.endTime
        this.staff = get(this.classData, 'staff.id', null)
      } else {
        this.teachers = []
        this.mentors = []
        this.code = ''
        this.title = ''
        this.course = null
        this.grade = null
        this.division = null
        this.startTime = ''
        this.description = ''
        this.endTime = ''
        this.staff = ''
      }
    },
    getData() {
      return {
        teachers: this.teachers,
        description: this.description,
        grade: get(this.grade, 'id'),
        division: get(this.division, 'id'),
        code: this.code,
        title: this.gradeText + this.className.trim(),
        mentors: this.mentors
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
