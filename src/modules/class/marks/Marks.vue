<template>
  <v-layout v-if="classData">
    <v-flex md12 xs12 sm12>
      <marks-table :classData="classData" />
    </v-flex>
  </v-layout>

  <v-skeleton-loader class="mx-auto" type="caƒrd" v-else></v-skeleton-loader>
</template>

<script>
import moment from 'moment'
import MarksTable from '@/modules/class/marks/MarksTable'

export default {
  components: {
    MarksTable
  },
  props: {
    classData: Object
  },
  created () {
    this.students = this.classData.students
  },
  data () {
    return {
      students: [],
      selected: [],
      search: '',
      dialog: false
    }
  },
  computed: {
    tests () {
      return this.students
        .map(student => [
          {
            ...student,
            type: 'Progress Test 1',
            mark: Math.floor(Math.random() * 10),
            content: 'Tự động',
            id: student.id + Math.floor(Math.random() * 100)
          },
          {
            ...student,
            type: 'Progress Test 2',
            mark: Math.floor(Math.random() * 10),
            content: 'Tự động',
            id: student.id + Math.floor(Math.random() * 100)
          },
          {
            ...student,
            type: 'Thi cuối kỳ',
            mark: Math.floor(Math.random() * 10),
            content: 'Chấm tay',
            id: student.id + Math.floor(Math.random() * 100)
          }
        ])
        .flat()
    }
  },
  methods: {
    viewTest () {}
  },
  filters: {
    familiarizeDate: time => {
      if (!time) {
        return 'None'
      }
      return moment(time).format('HH:mm Ngày DD/MM')
    },
    SimplizedDate: time => {
      if (!time) {
        return 'None'
      }
      return moment(time).format('DD/MM')
    }
  }
}
</script>

<style scoped>
tr,
td,
th {
  border: solid 1px gray;
}
</style>
