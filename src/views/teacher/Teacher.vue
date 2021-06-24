<template>
  <div>
    <div v-if="teacher" class="pa-4 d-flex justify-space-between align-center">
      <Breadcrumbs :headline="teacher.name" :link="[{ text: 'Giáo viên', href: '../teachers' }]" />
    </div>
    <teacher-profile v-if="teacher" />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import TeacherProfile from '@/modules/teacher/profile/TeacherProfile'
import Breadcrumbs from '@/components/layout/Breadcrumbs.vue'
export default {
  components: {
    TeacherProfile,
    Breadcrumbs
  },
  computed: {
    ...mapState('teacher', ['teacher'])
  },
  async created() {
    await this.fetchTeacher(this.$route.params.id)
  },
  methods: {
    ...mapActions('teacher', ['fetchTeacher'])
  }
}
</script>
