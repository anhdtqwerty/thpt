<template>
  <div>
    <mark-create-dialog :student="student" :course="courseSelected" :state="createMarkDialog"></mark-create-dialog>
    <v-data-table :headers="headers" :items="coursesList" :items-per-page="5" dense class="nowrap">
      <template v-slot:[`item.status`]="{ item }">
        <v-chip label small :color="getColor(item.status)" dark>{{ item.status }}</v-chip>
      </template>
      <template v-slot:[`item.course`]="{ item }">
        <router-link style="text-decoration:none;" :to="'/course/' + item.id" dark>{{ item.title }}</router-link>
      </template>
      <template v-slot:[`item.classCode`]="{ item }">
        <router-link v-if="item.class" :to="'/class/' + item.class.id">{{ getClass(item) }}</router-link>
      </template>
      <template v-slot:[`item.mark`]="{ item }">
        <div>{{ getMark(item.mark) }}</div>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click.stop="openCreateMarkDialog(item)">edit</v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import MarkCreateDialog from '@/modules/student/class/MarkCreateDialog.vue'
import { get } from 'lodash'
export default {
  props: {
    major: Object
  },
  data: () => ({
    courseSelected: {},
    dialog: false,
    createMarkDialog: false,
    headers: [
      {
        text: 'Môn Học',
        align: 'left',
        sortable: false,
        value: 'course'
      },
      { text: 'Mã Môn', value: 'code' },
      { text: 'Mã Lớp', value: 'classCode' },
      { text: 'Điểm', value: 'mark' },
      { text: 'Trạng Thái', value: 'status' },
      { text: 'Chấm điểm', value: 'actions', width: '5px', align: 'center' }
    ]
  }),
  components: {
    MarkCreateDialog
  },
  computed: {
    ...mapState('app', ['department']),
    ...mapState('student', ['marks', 'classes']),
    ...mapGetters('student', ['student']),
    coursesList() {
      return this.major.courses.map(c => {
        const mark = get(this.marks, `${c.id}`, null)
        const clazz = get(this.classes, `${c.id}`, null)
        return {
          ...c,
          mark,
          class: clazz,
          status: this.getStatus(clazz, mark)
        }
      })
    }
  },
  methods: {
    ...mapActions('student', ['fetchMarks']),
    openCreateMarkDialog(course) {
      this.createMarkDialog = !this.createMarkDialog
      this.courseSelected = course
    },
    getStatus: (clazz, mark) => {
      if (!mark || !mark.status) {
        if (clazz) {
          if (clazz.status === 'done') {
            return get(mark, 'value', 0) < 5 ? 'failed' : 'passed'
          } else {
            return 'learning'
          }
        } else {
          return ''
        }
      } else {
        return mark.status
      }
    },
    getMark: mark => {
      return mark ? mark.value : ''
    },
    getClass: course => {
      return get(course, 'class.code', '')
    },
    getColor: status => {
      if (status === 'learning') {
        return 'green'
      } else if (status === 'passed') {
        return 'primary'
      } else if (status === 'failed') {
        return 'red'
      } else return 'transparent'
    }
  }
}
</script>
