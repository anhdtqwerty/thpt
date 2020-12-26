<template>
  <div>
    <div class="pa-2 d-none d-md-block">
      <h2>Giáo viên</h2>
      <Breadcrumbs
          headline="Danh sách"
          :link="[
            { text: 'Giáo viên', href: '../teachers' },
          ]"
        />
    </div>

    <v-card flat class="mx-2 pa-4">
      <teacher-profile :teacher="teacherInfo"></teacher-profile>
    </v-card>
  </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'
import TeacherProfile from '@/modules/teacher/profile/TeacherProfile'
import Breadcrumbs from '@/components/layout/Breadcrumbs.vue'
import moment from 'moment'
export default {
  components: {
    TeacherProfile,
    Breadcrumbs,
  },
  computed: {
    ...mapGetters('teacher', ['teacher']),
    teacherInfo () {
      return this.teacher(this.$route.params.id) || {}
    }
  },
  data () {
    return {
      tab: null,
      avatar: {},
    }
  },
  async created () {
    await this.fetchTeacher(this.$route.params.id)
  },
  methods: {
    ...mapActions('teacher', ['updateTeacher', 'fetchTeacher', 'removeTeacher']),
    reset () {
      this.$refs.form.reset()
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    },
    cancel () {
      this.state = false
    },
  }
}
</script>
