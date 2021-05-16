<template>
  <v-card>
    <div class="d-flex justify-end align-center pa-4">
      <v-btn color="primary" outlined class="text-uppercase" @click="exportExcel"
        ><v-icon left>mdi-file-excel</v-icon>Xuất Excel</v-btn
      >
    </div>
    <v-divider></v-divider>
    <diligence-filter @onFilterChanged="refresh" class="pa-4" />
    <v-divider></v-divider>
    <diligence-data-table :attendances="attendances" ref="diligenceDataTable" />
  </v-card>
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
      this.$emit('refresh')
    },
    exportExcel() {
      const excelHeader = this.$refs.diligenceDataTable.headers.map(({ text, value }) => ({ text, value }))
      utils.exportExcel(this.attendances, excelHeader, 'diligence_List')
    }
  }
}
</script>

<style></style>
