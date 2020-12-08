<template>
  <div>
    <div class="pa-2 d-none d-md-block">
      <h2>Học viên</h2>
      <breadcrumbs />
    </div>

    <v-toolbar>
      <v-tabs color="#0D47A1" v-model="tab">
        <v-tab href="#tab-1">Hồ sơ</v-tab>
        <v-tab href="#tab-2">Học Phí</v-tab>
        <v-tab href="#tab-3">Học Tập</v-tab>
        <v-tab href="#tab-4">Bảo Lưu</v-tab>
      </v-tabs>
    </v-toolbar>

    <v-card class="mt-2 px-4">
      <v-tabs-items v-model="tab">
        <v-tab-item key="1" value="tab-1">
          <student-profile :student="studentInfo" />
        </v-tab-item>
        <v-tab-item key="2" value="tab-2">
          <tuition-history :student="studentInfo"></tuition-history>
        </v-tab-item>
        <v-tab-item key="3" value="tab-3">
          <student-majors :studentId="student.id" />
        </v-tab-item>
        <v-tab-item key="4" value="tab-4">
          <student-reserved :student="studentInfo" />
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import moment from 'moment'
import StudentMajors from '@/modules/student/class/Majors.vue'
import StudentProfile from '@/modules/student/profile/StudentProfile'
import StudentReserved from '@/modules/student/profile/StudentReserved.vue'
import Breadcrumbs from '@/components/basic/Breadcrumbs'
export default {
  components: {
    StudentProfile,
    StudentMajors,
    StudentReserved,
    Breadcrumbs
  },
  computed: {
    ...mapGetters('student', ['student']),
    studentInfo() {
      return {
        ...this.student,
        data: this.student.data || {}
      }
    }
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
    }
  }
}
</script>
