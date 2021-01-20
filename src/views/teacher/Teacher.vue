<template>
  <div>
    <div class="pa-4 d-flex justify-space-between align-center">
      <Breadcrumbs
        :headline="teacherInfo.name"
        :link="[{ text: 'Giáo viên', href: '../teachers' }]"
      />
      <div>
        <v-btn dark class="mr-2" color="red" @click="remove">Xóa</v-btn>
        <v-btn color="primary" @click="save">Lưu</v-btn>
      </div>
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
    ...mapActions('teacher', ['fetchTeacher', 'removeTeacher']),
    remove() {
      this.$dialog.confirm({
        title: 'Xóa Giáo Viên',
        text: `Bạn Có chắc muốn xóa giáo viên này.?`,
        okText: 'Có',
        cancelText: 'Không',
        done: async () => {
          await this.removeTeacher(this.teacherInfo)
          this.$router.push(`/teachers/`)
        },
      })
    },
  },
}
</script>
