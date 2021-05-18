<template>
  <v-data-table
    flat
    dense
    item-key="id"
    disableSort
    v-model="selected"
    :items-per-page="-1"
    :headers="headers"
    :items="students"
    hide-default-footer
    class="mt-3"
  >
    <template v-slot:[`item.index`]="{ item }">
      {{ students.indexOf(item) + 1 }}
    </template>
    <template v-slot:[`item.status`]="{ item }">
      <v-chip :color="getColor(item.status)" dark>{{ item.status }}</v-chip>
    </template>
    <template v-slot:[`item.name`]="{ item }">
      <user-item :student="item" link></user-item>
    </template>
    <template v-slot:[`item.dob`]="{ item }">{{ item.dob | ddmmyyyy }}</template>
  </v-data-table>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import UserItem from '@/components/basic/card/CardStudentName.vue'
const defaultHeaders = [
  { text: 'STT', value: 'index', align: 'center', sortable: false },
  { text: 'Học sinh', value: 'name', align: 'left', sortable: false },
  { text: 'Ngày sinh', value: 'dob', align: 'left', sortable: false },
  {
    text: 'Họ tên bố (người giám hộ)',
    value: 'data.dadName',
    align: 'left',
    sortable: false
  },
  { text: 'SĐT bố', value: 'data.dadPhone', align: 'left', sortable: false },
  { text: 'Email bố', value: 'data.dadEmail', align: 'left', sortable: false },
  {
    text: 'Họ tên mẹ (người giám hộ)',
    value: 'data.momName',
    align: 'left',
    sortable: false
  },
  { text: 'SĐT mẹ', value: 'data.momPhone', align: 'left', sortable: false },
  { text: 'Email mẹ', value: 'data.momEmail', align: 'left', sortable: false }
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
  created() {},
  methods: {
    ...mapActions('classDetail', ['fetchClass', 'updateClass', 'createAttendance', 'initClass']),

    getColor(status) {
      if (status === 'active') return 'green'
      else return 'red'
    }
  }
}
</script>
