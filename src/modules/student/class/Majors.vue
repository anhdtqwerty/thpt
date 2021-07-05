<template>
  <div v-if="majors.length">
    <div v-for="major in majors" :key="major.id">
      <student-courses :major="major" :student="student" />
    </div>
  </div>
  <div v-else>
    <v-skeleton-loader v-if="loading" class="mx-auto" type="table-row-divider"></v-skeleton-loader>
    <div v-else>
      <h1>Chưa có chuyên ngành</h1>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import StudentCourses from '@/modules/student/class/Courses.vue'
import { get } from 'lodash'
export default {
  props: {
    studentId: String
  },
  components: {
    StudentCourses
  },
  computed: {
    ...mapState('app', ['department']),
    ...mapGetters('student', ['student', 'marks', 'majors', 'classes']),
    ...mapGetters('auth', ['user'])
  },
  async created() {
    await this.fetchStudent(this.studentId)
    this.refresh()
  },
  data: () => ({
    selected: {},
    dialog: false,
    loading: false
  }),
  methods: {
    ...mapActions('student', ['fetchMarks', 'fetchMajors', 'fetchStudent', 'fetchClasses']),
    updateDraw(draw) {
      this.draw = draw
    },
    onSelected(mark) {
      this.dialog = !this.dialog
      this.selected = mark
    },
    getMajor: major => {
      return major || {}
    },
    getStatus: mark => {
      return mark.value < 5 ? 'Faied' : 'Passed'
    },
    getCover: clazz => {
      return get(clazz, 'course.cover.src', '/cover-default.jpg')
    },

    getCourse: clazz => {
      return clazz ? clazz.course : {}
    },
    async refresh(query) {
      this.loading = true
      this.fetchMarks(this.student.id)
      if (this.student.majors.length) {
        await this.fetchMajors({ id_in: this.student.majors.map(i => i.id) })
      }
      await this.fetchClasses({ students: this.student.id })
      this.loading = false
    }
  }
}
</script>

<style></style>
