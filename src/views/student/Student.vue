<template>
  <div>
    <div class="pa-4 d-flex justify-space-between align-center">
      <div>
        <Breadcrumbs
          :headline="student ? `${student.name}` : 'Học Sinh'"
          :link="[
            { text: 'Học sinh', href: '../students' },
            { text: 'Dang sách' },
          ]"
        />
      </div>
      <div>
        <v-btn
          @click="edit = !edit"
          v-if="edit"
          class="mr-2"
          color="primary"
          outlined
          >Hủy</v-btn
        >
        <v-btn @click="save" v-if="edit" depressed color="primary">Lưu</v-btn>
      </div>
    </div>

    <student-profile :edit="edit" v-if="student.id" :student="student" />
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
    Breadcrumbs,
  },
  computed: {
    ...mapGetters('student', ['student']),
    formatCode() {
      return this.student.code.substring(this.student.code.length - 5)
    },
  },
  data() {
    return {
      tab: null,
      edit: false,
    }
  },
  async created() {
    this.refresh()
  },
  methods: {
    ...mapActions('student', [
      'updateStudent',
      'fetchStudent',
      'setTuitions',
      'removeStudent',
    ]),
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
    remove() {
      this.$dialog.confirm({
        title: 'Xóa Học Sinh',
        text: `Bạn Có chắc muốn xóa học sinh này.?`,
        okText: 'Có',
        cancelText: 'Không',
        done: async () => {
          await this.removeStudent(this.student)
          this.$router.push(`/students/`)
        },
      })
    },
  },
}
</script>
