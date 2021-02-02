<template>
  <div>
    <div class="pa-4 d-flex justify-space-between align-center">
      <Breadcrumbs
        :headline="teacherInfo.name + ' - ' + teacherInfo.code"
        :link="[{ text: 'Giáo viên', href: '../teachers' }]"
      />
      <div>
        <v-btn @click="cancel" v-if="edit" class="mr-2" color="primary" outlined
          >Hủy</v-btn
        >
        <v-btn @click="save" v-if="edit" depressed color="primary">Lưu</v-btn>
      </div>
    </div>

    <teacher-profile
      ref="teacherProfile"
      :edit="edit"
      @onEdit="edit = !edit"
      :teacher="teacherInfo"
    ></teacher-profile>
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
      edit: false,
    }
  },
  async created() {
    await this.fetchTeacher(this.$route.params.id)
  },
  methods: {
    ...mapActions('teacher', ['fetchTeacher']),
    cancel() {
      this.edit = !this.edit
    },
    save() {
      this.$refs.teacherProfile.save()
    }
  },
}
</script>
