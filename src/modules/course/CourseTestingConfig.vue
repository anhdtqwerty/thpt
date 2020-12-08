<template>
  <course-test-builder ref="courseTestBuilder" :course="course" @change="save"></course-test-builder>
</template>

<script>
import { mapActions } from 'vuex'
import CourseTestBuilder from '@/modules/course/test/CourseTestBuilder'

export default {
  components: {
    CourseTestBuilder
  },
  data () {
    return {}
  },
  props: {
    course: Object
  },
  methods: {
    ...mapActions('course', ['updateCourse', 'fetchCourse']),
    save () {
      const mark = this.$refs.courseTestBuilder.getData()
      this.updateCourse({
        ...this.course,
        mark
      })
    },
    cancel () {}
  }
}
</script>

<style scoped>
.white {
  background-color: white;
}
</style>
