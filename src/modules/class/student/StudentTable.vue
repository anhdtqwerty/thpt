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
      {{ item | ordinalNumber(students) }}
    </template>
    <template v-slot:[`item.status`]="{ item }">
      <v-chip :color="item.status | statusColor" dark>{{ item.status | status }}</v-chip>
    </template>
    <template v-slot:[`item.dob`]="{ item }">{{ item.dob | ddmmyyyy }}</template>
    <template v-slot:[`item.name`]="{ item }">
      <CardStudentName :student="item" link />
    </template>
    <template v-slot:[`item.gender`]="{ item }">{{ item.gender | gender }}</template>
    <template v-slot:[`item.notes`]="{ item }">
      <v-tooltip max-width="250px" bottom>
        <template v-slot:activator="{ on, attrs }">
          <p v-bind="attrs" v-on="on" class="nowrap ma-0">{{ item.notes }}</p>
        </template>
        <span>{{ item.notes }}</span>
      </v-tooltip>
    </template>
  </v-data-table>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import CardStudentName from '@/components/basic/card/CardStudentName.vue'
const defaultHeaders = [
  { text: 'STT', value: 'index', align: 'center', sortable: false },
  { text: 'Học sinh', value: 'name', align: 'left', sortable: false },
  { text: 'Ngày sinh', value: 'dob', align: 'left', sortable: false },
  { text: 'Giới tính', value: 'gender', align: 'left', sortable: false },
  {
    text: 'Trạng thái',
    value: 'status',
    align: 'left',
    sortable: false
  },
  {
    text: 'Ghi chú',
    value: 'notes',
    align: 'left',
    sortable: false,
    show: true
  }
]
export default {
  components: {
    CardStudentName
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
    ...mapActions('classDetail', ['fetchClass', 'updateClass', 'createAttendance', 'initClass'])
  }
}
</script>
