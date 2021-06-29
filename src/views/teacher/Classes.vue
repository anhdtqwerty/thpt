<template>
  <v-layout>
    <v-flex xs12 sm3 md3>
      <class-filter @onFilterChanged="refresh"></class-filter>
    </v-flex>
    <v-flex xs12 sm9 md9>
      <v-data-table item-key="id" v-model="selected" :headers="headers" :items="classes" :search="search" show-select>
        <template v-slot:item.status="{ item }">
          <v-chip small :color="getColor(item.status)" dark>{{ item.status | classStatus }}</v-chip>
        </template>
        <template v-slot:item.code="{ item }">
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <div v-on="on">
                <router-link style="text-decoration: none;" :to="'/class/' + item.id">{{ item.code }}</router-link>
              </div>
            </template>
            <span>Xem Lớp</span>
          </v-tooltip>
        </template>
        <template v-slot:item.course="{ item }">
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <div v-on="on">
                <router-link v-on="on" style="text-decoration: none;" :to="'/course/' + getCourse(item.course).id">{{
                  getCourse(item.course).title
                }}</router-link>
              </div>
            </template>
            <span>Xem Khóa Học</span>
          </v-tooltip>
        </template>
        <template v-slot:item.major="{ item }">
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <div v-on="on">
                <router-link v-if="item.major" style="text-decoration: none;" :to="getMajor(item.major).id">{{
                  getMajor(item.major).title
                }}</router-link>
              </div>
            </template>
            <span>Xem Chuyên Ngành</span>
          </v-tooltip>
        </template>
        <template v-slot:[`item.students`]="{ item }">
          <p style="margin:0">{{ item.students | studentCounter }}</p>
        </template>
        <template v-slot:[`item.teachers`]="{ item }">
          <p style="margin:0">{{ item | getTeacherNames }}</p>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon @click="onClassSelected(item)" class="ma-2" dense>mdi-pencil</v-icon>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import ClassFilter from '@/modules/class/ClassFilter'

export default {
  components: {
    ClassFilter
  },
  props: {
    role: String
  },
  data() {
    return {
      headers: [
        { text: 'Mã Lớp', value: 'code', align: 'left', sortable: false },
        { text: 'Khóa Học', value: 'course', align: 'left', sortable: false },
        {
          text: 'Chuyên Ngành',
          value: 'major',
          align: 'left',
          sortable: false
        },
        { text: 'Giáo Viên', value: 'teachers', align: 'left', sortable: true },
        { text: 'Sĩ Số', value: 'students', align: 'left', sortable: true },
        { text: 'Trạng Thái', value: 'status', align: 'left', sortable: false }
      ],
      selected: [],
      draw: false,
      search: '',
      status: null,
      statuses: [
        { text: 'Active', value: 'false' },
        { text: 'Blocked', value: 'true' }
      ],
      range: { from: null, to: null },
      previewUserId: null,
      ready: false,
      editClassId: ''
    }
  },
  async created() {
    this.refresh()
  },
  computed: {
    ...mapState('class', ['count', 'classData']),
    ...mapState('app', ['department']),
    ...mapState('auth', ['profile', 'user']),
    ...mapGetters('class', ['classes'])
  },
  methods: {
    ...mapActions('class', ['fetchClasses', 'countClasses', 'setClass', 'setClasses']),
    updateDraw(draw) {
      this.draw = draw
    },
    onClassSelected(classData) {
      this.setClass(classData)
      this.editClassId = classData.id
      this.draw = true
    },
    getColor(status) {
      if (status === 'opened') return 'green'
      if (status === 'running') return 'primary'
      else if (status === 'pending' || status === 'rejected') return 'red'
      else if (status === 'done') return 'gray'
      else return 'red'
    },
    getMajor: major => {
      return major || {}
    },
    getCourse: course => {
      return course || {}
    },
    async refresh(query) {
      this.setClasses([])
      await this.countClasses()
      this.fetchClasses({
        department: this.department.id,
        teachers: this.profile.id,
        ...query
      })
    }
  },
  filters: {
    studentCounter: students => {
      if (!students) {
        return 0
      }
      return students.length
    },
    classStatus: status => {
      if (status === 'opened') return 'Đang chờ'
      else if (status === 'running') return 'Đang Chạy'
      else if (status === 'rejected') return 'Bị Từ Chối'
      else if (status === 'canceled') return 'Đã Hủy'
      else if (status === 'done') return 'Kết Thúc'
      else return 'Không rõ'
    },
    getTeacherNames: classData => {
      return classData.teachers.map(teacher => teacher.name).join(',')
    }
  }
}
</script>
