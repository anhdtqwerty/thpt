<template>
  <div>
    <div class="pa-2 d-none d-md-block">
      <Breadcrumbs
          headline="Giáo viên"
          :link="[
            { text: 'Giáo viên', href: '../teachers' },
            ]"
        />
    </div>

    <teacher-profile :teacher="teacherInfo"></teacher-profile>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import TeacherProfile from '@/modules/teacher/profile/TeacherProfile'
import Breadcrumbs from '@/components/layout/Breadcrumbs.vue'
export default {
  components: {
    TeacherProfile,
    Breadcrumbs,
  },
  computed: {
    ...mapGetters('teacher', ['teacher']),
    teacherInfo() {
      return this.teacher(this.$route.params.id) || {}
    },
  },
  data() {
    return {
      tab: null,
      avatar: {},
    }
  },
  async created() {
    await this.fetchTeacher(this.$route.params.id)
  },
  methods: {
    ...mapActions('teacher', [
      'updateTeacher',
      'fetchTeacher',
      'removeTeacher',
    ]),
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
    cancel() {
      this.state = false
    },
  },
}
</script>
