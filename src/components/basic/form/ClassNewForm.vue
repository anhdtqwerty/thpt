<template>
  <v-form ref="form" flat class="pa-6">
    <v-text-field
      ref="title"
      v-model="title"
      label="Tên lớp"
      placeholder="Nhập tên lớp"
      outlined
      required
      dense
    />
    <div class="d-flex">
      <autocomplete-grade
        class="mr-2"
        v-model="grade"
        item-text="title"
        item-value="id"
        label="Khối"
        return-object
        required
        dense
        outlined
      ></autocomplete-grade>
      <autocomplete-division
        v-model="division"
        item-text="title"
        item-value="id"
        label="Ban"
        return-object
        required
        dense
        outlined
      />
    </div>
    <autocomplete-teacher
      v-model="teachers"
      item-text="name"
      item-value="id"
      label="Giáo viên chủ nhiệm"
      deletable-chips
      chips
      small-chips
      multiple
      dense
      outlined
    ></autocomplete-teacher>
    <v-textarea
      ref="description"
      v-model="description"
      label="Mô Tả"
      outlined
    ></v-textarea>
  </v-form>
</template>
<script>
import { get } from 'lodash'
import AutocompleteTeacher from '@/components/basic/input/AutocompleteTeacher'
import AutocompleteGrade from '@/components/basic/input/AutocompleteGrade'
import AutocompleteDivision from '@/components/basic/input/AutocompleteDivision'
import { mapActions, mapGetters } from 'vuex'
export default {
  components: {
    AutocompleteTeacher,
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
    description: '',
    teachers: [],
    staff: {}
  }),
  computed: {
    getCourseItems() {
      return this.grade ? this.grade.courses : []
    }
  },
  methods: {
    getCourseFilter() {
      return { grade: get(this.grade, 'id', null) }
    },
    resetDefault() {
      if (this.classData) {
        this.teachers = this.classData.teachers
        this.code = this.classData.code
        this.title = this.classData.title
        this.course = this.courseData || this.classData.course
        this.grade = this.gradeData || this.classData.grade
        this.description = this.classData.description
        this.staff = get(this.classData, 'staff.id', null)
      } else {
        this.teachers = []
        this.code = ''
        this.title = ''
        this.course = null
        this.grade = null
        this.description = ''
        this.staff = ''
      }
    },
    getData() {
      if (this.$refs.form.validate()) {
        return {
          teachers: this.teachers,
          description: this.description,
          code: this.code,
          title: this.title
        }
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
