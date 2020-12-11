<template>
  <v-form ref="form" flat class="px-6">
    <div class="text-subtitle-1 font-weight-medium mt-3 mb-3">
      Thông tin khóa học
    </div>
    <autocomplete-major
      item-value="id"
      item-text="title"
      label="Chuyên Ngành"
      v-model="major"
      :defaultMajors="[]"
      return-object
      required
      dense
      outlined
    ></autocomplete-major>
    <v-autocomplete
      v-model="course"
      item-text="title"
      :items="getCourseItems"
      return-object
      item-value="id"
      label="Môn học"
      required
      dense
      outlined
    ></v-autocomplete>
    <v-text-field
      ref="code"
      v-model="code"
      label="Mã lớp"
      hint="Không sử dụng dấu cách và dấu phẩy"
      required
      persistent-hint
      dense
      outlined
    ></v-text-field>
    <autocomplete-generation
      v-model="generation"
      item-text="name"
      item-value="id"
      label="Khóa"
      required
      outlined
      dense
    ></autocomplete-generation>
    <v-text-field v-model="tags" label="Tên Nhóm" dense outlined></v-text-field>
    <date-picker
      :date.sync="startTime"
      label=" Ngày bắt đầu"
      dense
    ></date-picker>
    <div class="text-subtitle-1 font-weight-medium mb-3">Thông tin lớp học</div>
    <autocomplete-teacher
      v-model="teachers"
      :defaultTeachers="teachers"
      item-text="name"
      item-value="id"
      deletable-chips
      chips
      small-chips
      label="Giáo viên"
      multiple
      dense
      outlined
    ></autocomplete-teacher>
    <autocomplete-teacher
      v-model="mentors"
      item-text="name"
      chips
      small-chips
      deletable-chips
      item-value="id"
      label="Trợ Giảng"
      dense
      multiple
      outlined
    ></autocomplete-teacher>
    <autocomplete-room
      v-model="room"
      item-text="title"
      item-value="id"
      label="Phòng học"
      dense
      outlined
    />
  </v-form>
</template>
<script>
import { get } from 'lodash'
import AutocompleteGeneration from '@/components/basic/input/AutocompleteGeneration'
import DatePicker from '@/components/basic/picker/DateIOSPicker.vue'
import AutocompleteTeacher from '@/components/basic/input/AutocompleteTeacher'
import AutocompleteMajor from '@/components/basic/input/AutocompleteMajor'
import AutocompleteRoom from '@/components/basic/input/AutocompleteRoom'
export default {
  components: {
    DatePicker,
    AutocompleteTeacher,
    AutocompleteRoom,
    AutocompleteMajor,
    AutocompleteGeneration
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
    valid: true,
    course: '',
    major: '',
    startTime: new Date().toISOString(),
    tags: '',
    endTime: '',
    code: '',
    generation: '',
    teachers: [],
    mentors: [],
    staff: {},
    room: ''
  }),
  computed: {
    getCourseItems() {
      return this.major ? this.major.courses : []
    }
  },

  methods: {
    getCourseFilter() {
      return { major: get(this.major, 'id', null) }
    },
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
    getData() {
      if (this.$refs.form.validate()) {
        return {
          teachers: this.teachers,
          code: this.code,
          title: this.course.title,
          room: this.room,
          tags: this.tags,
          course: this.course.id,
          major: this.major.id,
          generation: this.generation,
          startTime: this.startTime,
          status: 'opended',
          endTime: this.endTime,
          mentors: this.mentors,
          metadata: {
            mark: this.course.mark,
            ...this.course.data
          }
        }
      }
    },
    cancel() {
      this.resetDefault()
      this.$emit('cancel')
    },
    resetDefault() {
      if (this.classData) {
        this.teachers = this.classData.teachers
        this.mentors = this.classData.mentors
        this.tags = this.classData.tags
        this.room = this.room
        this.code = this.classData.code
        this.course = this.courseData || this.classData.course
        this.major = this.majorData || this.classData.major
        this.startTime = this.classData.startTime
        this.generation = this.classData.generation
        this.endTime = this.classData.endTime
        this.staff = get(this.classData, 'staff.id', null)
      } else {
        this.teachers = []
        this.mentors = []
        this.room = ''
        this.code = ''
        this.course = null
        this.major = null
        this.tags = ''
        this.startTime = ''
        this.generation = ''
        this.endTime = ''
        this.staff = ''
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
