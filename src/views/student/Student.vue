<template>
  <div>
    <div class="pa-2 d-none d-md-block">
      <h2>Học viên</h2>
      <breadcrumbs />
    </div>

    <student-profile v-if="student.id" :student="student" />
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
    }
  },
}
</script>
