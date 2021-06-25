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
      :footer-props="{ 'items-per-page-text': 'Giáo viên một trang' }"
    >
      <template v-slot:[`footer.page-text`]="items">
        {{ items.pageStart }} - {{ items.pageStop }} trên tổng
        {{ items.itemsLength }}
      </template>
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
  { text: 'Hệ số', value: 'multiply', align: 'center' },
  { text: 'Số điểm tối thiểu trên học sinh', value: 'data.minMark', align: 'center' },
  { text: 'Số điểm tối đa trên học sinh', value: 'data.maxMark', align: 'center' },
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
