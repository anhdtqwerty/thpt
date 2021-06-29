<template>
  <v-data-table
    flat
    dense
    item-key="id"
    show-select
    v-model="selected"
    :items-per-page="-1"
    :headers="headers"
    :items="students"
    @click:row="onSelected"
    class="mt-3"
  >
    <v-layout slot="top">
      <v-flex xs12 sm8 md8 class="px-6">
        <student-list-actions :selected="selected" />
        <student-mark-dialog :mark="mark" :state="dialog"></student-mark-dialog>
      </v-flex>
      <v-spacer />
      <v-flex xs2 sm2 md2 class="d-flex flex-row-reverse">
        <drop-menu></drop-menu>
      </v-flex>
    </v-layout>
    <template v-slot:[`item.status`]="{ item }">
      <v-chip :color="getColor(item.status)" dark>{{ item.status }}</v-chip>
    </template>
    <template v-slot:[`item.name`]="{ item }">
      <user-item :student="item" link></user-item>
    </template>
    <template v-slot:[`item.gender`]="{ item }">{{
      item.gender === 'male' ? 'Nam' : item.gender === 'female' ? 'Nữ' : 'Khác'
    }}</template>
    <template v-slot:[`item.action`]="{ item }">
      <v-btn text icon @click="onStudentSelected(item)">
        <v-icon dense>mdi-pencil</v-icon>
      </v-btn>
    </template>
  </v-data-table>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import StudentListActions from '@/modules/class/student/StudentListActions'
import UserItem from '@/components/basic/card/CardStudentName.vue'
import StudentMarkDialog from '@/modules/student/mark/StudentMarkDialog.vue'
import DropMenu from '@/modules/class/student/Menu.vue'

export default {
  components: {
    UserItem,
    StudentListActions,
    StudentMarkDialog,
    DropMenu
  },
  props: {
    role: String
  },
  data() {
    return {
      headers: [
        { text: 'Tên', value: 'name', align: 'left', sortable: false },
        { text: 'Mã', value: 'code', align: 'left', sortable: false },
        { text: 'Email', value: 'email', align: 'left', sortable: false },
        {
          text: 'Số Điện Thoại',
          value: 'phone',
          align: 'left',
          sortable: false
        },
        { text: 'Giới tính', value: 'gender', align: 'left', sortable: false }
      ],
      selected: [],
      mark: {},
      dialog: false,
      search: '',
      status: null,
      statuses: [
        { text: 'Active', value: 'false' },
        { text: 'Blocked', value: 'true' }
      ],
      range: { from: null, to: null },
      previewUserId: null,
      ready: false,
      studentTableOptions: {}
    }
  },
  async created() {},
  computed: {
    ...mapState('app', ['department']),
    ...mapState('classDetail', ['marks']),
    ...mapGetters('classDetail', ['students'])
  },
  methods: {
    onSelected(student) {
      this.mark = this.marks[student.id]
      if (!this.mark) return
      this.dialog = !this.dialog
    },
    getColor(status) {
      if (status === 'active') return 'green'
      else return 'red'
    }
  }
}
</script>
