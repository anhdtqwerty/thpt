<template>
  <v-row>
    <v-col :xs="12" :md="6" :lg="4">
      <div class="d-flex mb-5">
        <span class="title">Thông Tin Cơ Bản</span>
        <v-spacer></v-spacer>
        <v-btn color="primary" text class="px-5" @click="cancel">Hủy</v-btn>
        <v-btn color="primary" class="px-5" @click="save">Lưu</v-btn>
      </div>
      <course-basic-form
        ref="courseBasicForm"
        :course="course"
      ></course-basic-form>
      <course-config-form
        ref="courseConfigForm"
        :course="course"
      ></course-config-form>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex'
import CourseBasicForm from '@/modules/course/CourseBasicForm'
import CourseConfigForm from '@/components/basic/form/CourseConfigForm'

export default {
  components: {
    CourseBasicForm,
    CourseConfigForm,
  },
  data() {
    return {}
  },
  props: {
    course: Object,
  },
  methods: {
    ...mapActions('course', ['updateCourse', 'fetchCourse']),
    save() {
      const basic = this.$refs.courseBasicForm.getData()
      const config = this.$refs.courseConfigForm.getData()
      const mark = this.$refs.courseTestBuilder.getData()
      this.updateCourse({
        ...this.course,
        ...basic,
        data: { ...config },
        mark,
      })
    },
    cancel() {},
  },
}
</script>

<style scoped>
.white {
  background-color: white;
}
</style>
