<template>
  <div>
    <student-mark-dialog :mark="selected" :state="dialog"></student-mark-dialog>
    <v-data-table :headers="headers" :items="coursesList" :items-per-page="20" @click:row="onSelected" dense>
      <template v-slot:[`item.status`]="{ item }">
        <b :style="'color: ' + getColor(item)" dark>{{ getStatus(item) }}</b>
      </template>
      <template v-slot:[`item.course`]="{ item }">
        <router-link :to="'/course/' + item.id" dark>{{ item.title }}</router-link>
      </template>
      <template v-slot:[`item.classCode`]="{ item }">
        <router-link v-if="item.class" :to="'/class/' + item.class.id">{{ getClass(item) }}</router-link>
      </template>
      <template v-slot:[`item.mark`]="{ item }">
        <div>{{ getMark(item.mark) }}</div>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import StudentMarkDialog from '@/modules/student/mark/StudentMarkDialog.vue'
import { get } from 'lodash'
export default {
  props: {
    major: Object
  },
  data: () => ({
    selected: {},
    dialog: false,
    headers: [
      {
        text: 'Môn Học',
        align: 'left',
        sortable: false,
        value: 'course'
      },
      { text: 'Mã Môn', value: 'code' },
      { text: 'Ghi Chú', value: 'description' },
      { text: 'Mã Lớp', value: 'classCode' },
      { text: 'Điểm', value: 'mark' },
      { text: 'Trạng Thái', value: 'status' },
      { text: 'Hành Động', value: 'action' }
    ]
  }),
  components: {
    StudentMarkDialog
  },
  computed: {
    ...mapState('app', ['department']),
    ...mapState('student', ['marks', 'classes']),
    ...mapGetters('student', ['student']),
    coursesList() {
      return this.major.courses.map(c => {
        return {
          ...c
        }
      })
    }
  },
  methods: {
    ...mapActions('student', ['fetchMarks']),
    onSelected(course) {
      if (!course.mark) return
      this.dialog = !this.dialog
      this.selected = course.mark
    },
    getStatus: course => {
      if (course.class) {
        if (course.class.status === 'done') {
          return get(course, 'mark.value', 0) < 5 ? 'Failed' : 'Passed'
        } else {
          return 'Learning'
        }
      } else {
        return ''
      }
    },
    getMark: mark => {
      return mark ? mark.value : ''
    },
    getClass: course => {
      return get(course, 'class.code', '')
    },
    getCover: clazz => {
      return get(clazz, 'avatar.url', '/cover-default.jpg')
    },
    getColor: course => {
      if (course.class) {
        if (course.class.status === 'done') {
          return get(course, 'mark.value', 0) < 5 ? 'red' : 'green'
        } else {
          return '#1976d2'
        }
      } else {
        return 'gray'
      }
    },
    getCourse: clazz => {
      return clazz ? clazz.course : {}
    }
  },
  filters: {
    studentCounter: students => {
      if (!students) {
        return 0
      }
      return students.length
    }
  }
}
</script>

<style></style>
