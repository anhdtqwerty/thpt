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
      <template v-slot:item.semesterType="{ item }">{{
        item.semesterType | getSemester
      }}</template>
      <template v-slot:item.action="{ item }">
        <v-btn text icon @click="updateFactor(item)">
          <v-icon dense small>mdi-pencil</v-icon>
        </v-btn>
        <v-btn text icon @click="onRemove(item.id)">
          <v-icon dense small>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>
    <FactorEditDialog :subject="subject" :factor="factor" :state="dialog" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import FactorEditDialog from '@/modules/factor/FactorEditDialog'
const defaultHeaders = [
  { text: 'Tên đầu điểm', value: 'title' },
  { text: 'Hệ số', value: 'multiply' },
  { text: 'Cột điểm', value: 'quantity' },
  { text: 'Học kỳ', value: 'semesterType' },
  { text: 'Hành động', value: 'action' }
]
export default {
  components: { FactorEditDialog },
  props: { subject: Object },
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
    ...mapState('app', ['department']),
    ...mapState('factor', ['factors'])
  },
  methods: {
    ...mapActions('factor', ['removeFactor']),
    updateFactor(factor) {
      this.factor = factor
      this.dialog = !this.dialog
    },
    onRemove(id) {
      this.$dialog.confirm({
        title: 'Xóa phân ban',
        text: 'Bạn có chắc muốn xóa đầu điểm này?',
        okText: 'Có',
        cancelText: 'Không',
        done: async () => {
          await this.removeFactor(id)
        }
      })
    }
  },
  filters: {
    getSemester(s) {
      if (!s) return s
      if (s === 'semester-1') return 'Học kỳ 1'
      if (s === 'semester-2') return 'Học kỳ 2'
    }
  }
}
</script>
