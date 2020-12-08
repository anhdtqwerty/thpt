<template>
  <div>
    <new-course-dialog style="margin: 0 20px"></new-course-dialog>
    <v-btn
      v-show="selected.length"
      small
      color="error"
      class="mx-2"
      @click="onRemove"
    >
      <v-icon left>delete</v-icon>Delete
    </v-btn>
    <v-btn
      v-show="selected.length"
      small
      class="mr-2"
      outlined
      @click="disableCourse"
    >
      <v-icon left>lock</v-icon>Khóa
    </v-btn>
    <v-btn
      v-show="selected.length"
      small
      class="mr-2"
      outlined
      @click="enableCourse"
    >
      <v-icon left>lock_open</v-icon>Mở
    </v-btn>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import NewCourseDialog from '@/modules/course/NewCourseDialog'
export default {
  components: {
    NewCourseDialog
  },
  props: {
    disabled: Boolean,
    selected: { type: Array, default: () => [] }
  },
  data() {
    return {
      sending: null
    }
  },
  computed: {
    ...mapState('course', ['courses']),
    sendingName() {
      const { name } = this.courses.find(
        course => course.phone === this.sending
      )
      return name
    }
  },
  methods: {
    ...mapActions('course', ['removeCourses', 'updateCourses']),
    ...mapActions('noti', ['sendEmails', 'sendSMS']),
    disableCourse() {
      this.updateCourses(
        this.selected.map(item => {
          return { ...item, status: 'private' }
        })
      )
    },
    enableCourse() {
      this.updateCourses(
        this.selected.map(item => {
          return { ...item, status: 'public' }
        })
      )
    },
    onRemove() {
      this.$dialog.confirm({
        title: 'Xóa môn học',
        text: 'Xóa môn học, và các liên kết sử dụng môn học này',
        okText: 'Yes',
        cancelText: 'No',
        done: async () => {
          await this.removeCourses(this.selected)
          for (let i = this.selected.length - 1; i > -1; i--) {
            if (!this.courses.includes(this.selected[i])) {
              this.selected.splice(i, 1)
            }
          }
        }
      })
    }
  }
}
</script>
