<template>
  <v-data-table
    flat
    dense
    item-key="id"
    disableSort
    show-select
    v-model="selected"
    :items-per-page="-1"
    :headers="headers"
    :items="students"
    :footer-props="{
      'items-per-page-text': 'Học sinh mỗi trang',
      'items-per-page-all-text': 'Tất cả'
    }"
    class="mt-3"
  >
    <template v-slot:item.status="{ item }">
      <v-chip :color="getColor(item.status)" dark>{{ item.status }}</v-chip>
    </template>
    <template v-slot:item.name="{ item }">
      <user-item :student="item" link></user-item>
    </template>
    <template v-slot:item.gender="{ item }">{{
      item.gender === 'male' ? 'Nam' : item.gender === 'female' ? 'Nữ' : 'Khác'
    }}</template>
    <template v-slot:item.action="{ item }">
      <v-btn text icon @click="onStudentSelected(item)">
        <v-icon dense>mdi-pencil</v-icon>
      </v-btn>
    </template>
  </v-data-table>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import UserItem from '@/components/basic/card/CardStudentName.vue'
const defaultHeaders = [
  { text: 'Tên', value: 'name', align: 'left', sortable: false },
  { text: 'Email', value: 'email', align: 'left', sortable: false },
  {
    text: 'Số Điện Thoại',
    value: 'phone',
    align: 'left',
    sortable: false
  },
  { text: 'Giới tính', value: 'gender', align: 'left', sortable: false }
]
export default {
  components: {
    UserItem
  },
  data() {
    return {
      headers: defaultHeaders,
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
  computed: {
    ...mapState('app', ['department']),
    ...mapState('classDetail', ['marks']),
    ...mapGetters('classDetail', ['classData', 'slots', 'classList', 'students'])
  },
  methods: {
    ...mapActions('classDetail', ['fetchClass', 'updateClass', 'createAttendance', 'initClass']),

    getColor(status) {
      if (status === 'active') return 'green'
      else return 'red'
    }
  }
}
</script>
