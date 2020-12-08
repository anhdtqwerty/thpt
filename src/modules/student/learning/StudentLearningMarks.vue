<template>
  <div v-if="majors.length">
    <div v-for="major in majors" :key="major.id">
      <h2 class="headline" style="color:gray">{{major.title}}</h2>
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
import StudentCourses from '@/modules/student/learning/StudentLearningCourses.vue'
import _ from 'lodash'
export default {
  props: {
    studentId: String
  },
  components: {
    StudentCourses
  },
  computed: {
    ...mapState('app', ['department']),
    ...mapState('transcript', ['transcripts']),
    ...mapGetters('student', ['student', 'marks', 'majors', 'classes']),
    ...mapGetters('auth', ['user'])
  },
  async created () {
    this.refresh()
  },
  data: () => ({
    selected: {},
    dialog: false,
    loading: false
  }),
  methods: {
    ...mapActions('transcript', ['fetchTranscript']),
    updateDraw (draw) {
      this.draw = draw
    },
    onSelected (mark) {
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
      return _.get(clazz, 'course.cover.src', '/cover-default.jpg')
    },

    getCourse: clazz => {
      return clazz ? clazz.course : {}
    },
    async refresh (query) {
      this.loading = true
      await this.fetchTranscript({ student: this.studentId })
      this.loading = false
    }
  }
}
</script>

<style>
</style>
