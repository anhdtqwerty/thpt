<template>
  <div>
    <div class="d-flex justify-end align-center pa-4">
      <v-btn color="primary" outlined class="text-uppercase" @click="exportExcel"
        ><v-icon left>mdi-file-excel</v-icon>Xuất Excel</v-btn
      >
    </div>
    <v-card class="ma-4 mt-0" outlined>
      <DiligenceFilter @onFilterChanged="refresh" />
    </v-card>
    <v-card class="ma-4" outlined>
      <DiligenceDataTable :attendances="attendances" ref="diligenceDataTable" />
    </v-card>
  </div>
</template>

<script>
import DiligenceFilter from '@/modules/diligence/DiligenceFilter.vue'
import DiligenceDataTable from '@/modules/diligence/DiligenceDataTable.vue'
import utils from '@/plugins/utils'

export default {
  data() {
    return {}
  },
  components: {
    DiligenceFilter,
    DiligenceDataTable
  },
  props: {
    attendances: Array
  },
  computed: {},
  methods: {
    refresh() {
      this.$refs.diligenceDataTable.refresh()
    },
    exportExcel() {
      const excelHeader = this.$refs.diligenceDataTable.headers.map(({ text, value }) => ({ text, value }))
      utils.exportExcel(this.attendances, excelHeader, 'diligence_List')
    }
  }
}
</script>

<style></style>
