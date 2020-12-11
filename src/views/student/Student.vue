<template>
  <div>
    <div class="pa-2 d-none d-md-block">
      <h2>Học viên</h2>
      <breadcrumbs />
    </div>

    <v-card class="pa-2 mx-md-2">
      <student-profile :student="studentInfo" />
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import moment from 'moment'
import StudentProfile from '@/modules/student/profile/StudentProfile'
import Breadcrumbs from '@/components/basic/Breadcrumbs'
export default {
  components: {
    StudentProfile,
    Breadcrumbs,
  },
  computed: {
    ...mapGetters('student', ['student']),
    studentInfo() {
      return {
        ...this.student,
        data: this.student.data || {},
      }
    },
  },
  data() {
    return {
      tab: null,
    }
  },
  async created() {
    this.refresh()
  },
  methods: {
    ...mapActions('student', ['updateStudent', 'fetchStudent', 'setTuitions']),
    reset() {
      this.$refs.form.reset()
    },
    async refresh() {
      this.setTuitions([])
      await this.fetchStudent(this.$route.params.id)
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
    save(data) {
      data.handledDate = moment().toISOString()
      this.updateStudent({ ...this.student, ...data })
    },
    cancel() {
      this.state = false
    },
  },
}
</script>
