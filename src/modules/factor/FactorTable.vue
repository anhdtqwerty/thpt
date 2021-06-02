<template>
  <div>
    <v-data-table
      v-bind="this.$attrs"
      flat
      dense
      item-key="id"
      v-model="selected"
      :items-per-page="-1"
      :headers="headers"
      :items="factors"
      :sort-by="['semesterType', 'index', 'multiply']"
      class="mt-3"
    >
      <template v-slot:item.status="{ item }"> </template>
      <template v-slot:item.semesterType="{ item }">{{ item.semesterType | getSemester }}</template>
      <template v-slot:[`item.action`]="{ item }">
        <FactorListActions :factor="item"></FactorListActions>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import FactorListActions from './FactorListActions'
const defaultHeaders = [
  { text: 'Tên đầu điểm', value: 'title' },
  { text: 'Tên viết tắt', value: 'data.shortName' },
  { text: 'Hệ số', value: 'multiply' },
  { text: 'Số điểm tối thiểu trên học sinh', value: 'data.minMark' },
  { text: 'Số điểm tối đa trên học sinh', value: 'data.maxMark' },
  { text: 'Thao tác', value: 'action' }
]
export default {
  components: { FactorListActions },
  data() {
    return {
      headers: defaultHeaders,
      selected: [],
      mark: {},
      dialog: false,
      search: '',
      status: null,
      range: { from: null, to: null },
      previewUserId: null,
      ready: false,
      factor: {}
    }
  },
  computed: {
    ...mapState('factor', ['factors'])
  },
  methods: {},
  filters: {
    getSemester(s) {
      if (!s) return s
      if (s === 'semester-1') return 'Học kỳ 1'
      if (s === 'semester-2') return 'Học kỳ 2'
    }
  }
}
</script>
