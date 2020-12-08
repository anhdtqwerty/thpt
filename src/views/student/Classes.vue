<template>
  <v-layout>
     <student-course-list style="width: 100%"/>
  </v-layout>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'
import StudentCourseList from '@/modules/student/class/Courses'
import moment from 'moment'
export default {
  components: {
    StudentCourseList
  },
  computed: {
    ...mapGetters('student', ['student']),
    ...mapGetters('auth', ['profile']),
    studentInfo () {
      return {
        ...this.student,
        data: this.student.data || {}
      }
    }
  },
  data () {
    return {
      tab: null
    }
  },
  async created () {
    await this.fetchStudent(this.profile.id)
  },
  methods: {
    ...mapActions('student', ['updateStudent', 'fetchStudent']),
    reset () {
      this.$refs.form.reset()
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    },
    save (data) {
      data.handledDate = moment().toISOString()
      this.updateStudent({ ...this.student, ...data })
    },
    cancel () {
      this.state = false
    }
  }
}
</script>

<style>
</style>
