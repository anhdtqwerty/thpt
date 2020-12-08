<template>
  <v-form ref="form" flat class="pa-6">
    <autocomplete-major
      v-model="major"
      :defaultMajors="[major]"
      item-text="title"
      item-value="id"
      label="Chuyên Ngành"
      return-object
      required
      dense
      outlined
      disabled
    ></autocomplete-major>
    <v-text-field
      v-model="classData.course.title"
      label="Môn học"
      required
      outlined
      dense
      disabled
    ></v-text-field>
    <v-text-field
      v-model="tags"
      label="Nhóm"
      placeholder="Nhập tên nhóm "
      required
      outlined
      dense
      disabled
    ></v-text-field>
    <text-field-code
      patern="XXXX-XX"
      ref="code"
      v-model="code"
      label="Mã lớp"
      placeholder="Nhập mã lớp"
      required
      dense
      outlined
      disabled
    ></text-field-code>
    <v-select
      v-model="room"
      item-text="title"
      item-value="id"
      :items="rooms"
      label="Phòng Học"
      placeholder="Chọn một phòng học"
      height="42"
      dense
      outlined
    ></v-select>
    <autocomplete-teacher
      v-model="teachers"
      :defaultTeachers="teachers"
      item-text="name"
      item-value="id"
      label="Giáo viên"
      deletable-chips
      chips
      small-chips
      multiple
      dense
      outlined
    ></autocomplete-teacher>
    <autocomplete-teacher
      v-model="mentors"
      item-text="name"
      item-value="id"
      label="Trợ Giảng"
      chips
      small-chips
      deletable-chips
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
import AutocompleteMajor from '@/components/basic/input/AutocompleteMajor'
import TextFieldCode from '@/components/basic/input/TextFieldCode'
import { mapActions, mapGetters } from 'vuex'
export default {
  components: {
    AutocompleteTeacher,
    AutocompleteMajor,
    TextFieldCode
  },
  props: {
    classData: {
      type: [Object],
      required: true,
      default: () => {}
    },
    majorData: Object,
    courseData: Object
  },
  data: () => ({
    room: '',
    valid: true,
    course: '',
    major: '',
    startTime: '',
    endTime: '',
    code: '',
    tags: '',
    description: '',
    teachers: [],
    mentors: [],
    staff: {}
  }),
  computed: {
    ...mapGetters('rooms', ['rooms']),
    getCourseItems () {
      return this.major ? this.major.courses : []
    }
  },
  methods: {
    ...mapActions('rooms', ['fetchRooms']),
    getCourseFilter () {
      return { major: get(this.major, 'id', null) }
    },
    resetDefault () {
      if (this.classData) {
        this.teachers = this.classData.teachers
        this.mentors = this.classData.mentors
        this.code = this.classData.code
        this.room = this.classData.room
        this.tags = this.classData.tags
        this.course = this.courseData || this.classData.course
        this.major = this.majorData || this.classData.major
        this.startTime = this.classData.startTime
        this.description = this.classData.description
        this.endTime = this.classData.endTime
        this.staff = get(this.classData, 'staff.id', null)
      } else {
        this.teachers = []
        this.mentors = []
        this.code = ''
        this.room = ''
        this.tags = ''
        this.course = null
        this.major = null
        this.startTime = ''
        this.description = ''
        this.endTime = ''
        this.staff = ''
      }
    },
    getData () {
      if (this.$refs.form.validate()) {
        return {
          teachers: this.teachers,
          description: this.description,
          code: this.code,
          room: this.room,
          tags: this.tags,
          mentors: this.mentors
        }
      }
    }
  },
  created () {
    this.resetDefault()
    this.fetchRooms({ department: this.classData.department.id })
  },
  watch: {
    classData () {
      this.resetDefault()
    }
  }
}
</script>

<style scoped>
</style>
