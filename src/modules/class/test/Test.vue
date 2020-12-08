<template>
  <v-layout v-if="classData">
    <v-flex md3 xs12 sm7>
      <test-filter />
    </v-flex>
    <v-flex md9 xs12 sm7>
      <v-data-table
        flat
        class="elevation-1"
        item-key="id"
        v-model="selected"
        :headers="headers"
        :items="tests"
        :search="search"
        show-select
      >
        <v-layout slot="top">
          <v-flex xs12 sm8 md8 class="px-6"></v-flex>
          <v-flex xs12 sm4 md4>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Tìm kiếm nhanh"
              clearable
              dense
              outlined
            />
          </v-flex>
        </v-layout>
        <template v-slot:item.name="{ item }">
          <user-item :data="item" :to="'student/' + item.id"></user-item>
        </template>
        <template v-slot:item.actio>
          <v-icon @click="dialog=!dialog" class="ma-2" dense>mdi-eye</v-icon>
        </template>
        <template v-slot:item.createdAt></template>
        <template v-slot:item.createdAt="{ item }">{{item.createdAt | familiarizeDate}}</template>
      </v-data-table>
    </v-flex>

    <test-viewer-dialog :state="dialog"></test-viewer-dialog>
  </v-layout>

  <v-skeleton-loader class="mx-auto" type="card" v-else></v-skeleton-loader>
</template>

<script>
import moment from 'moment'
import TestFilter from '@/components/basic/filter/TestFilter'
import UserItem from '@/modules/user/UserItem'
import TestViewerDialog from '@/modules/class/test/TestViewerDialog.vue'

export default {
  components: {
    TestFilter,
    TestViewerDialog,
    UserItem
  },
  props: {
    role: String,
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
      dialog: false,
      headers: [
        { text: 'Học Sinh', value: 'name', align: 'left' },
        { text: 'Phân loại', value: 'type', align: 'left' },
        { text: 'Điểm', value: 'mark', align: 'left' },
        { text: 'Hình thức', value: 'content', align: 'left' },
        { text: 'Thời gian nộp', value: 'createdAt', align: 'left' },
        { text: 'Hành động', value: 'action', align: 'left' }
      ]
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
</style>
