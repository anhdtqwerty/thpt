<template>
  <div>
    <div class="pa-2 d-none d-md-block">
      <Breadcrumbs
        :headline="student ? student.name : 'Học Sinh'"
        :link="[{ text: 'Học sinh', href: '../students' }]"
      />
    </div>

    <student-profile v-if="student.id" :student="student" />
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import moment from 'moment'
import StudentProfile from '@/modules/student/profile/StudentProfile'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
export default {
  components: {
    StudentProfile,
    Breadcrumbs
  },
  computed: {
    ...mapGetters('student', ['student'])
  },
  data() {
    return {
      tab: null
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
  }
}
</script>
