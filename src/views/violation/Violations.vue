<template>
  <div>
    <div class="pa-4 d-flex justify-space-between align-center">
      <div>
        <Breadcrumbs
          headline="Khen thưởng kỷ luật"
          :link="[
            { text: 'Học sinh', href: '../students' },
            { text: 'KTKL', href: '/complimented' }
          ]"
        />
      </div>
      <div class="flex-center">
        <v-btn v-if="$vuetify.breakpoint.mdAndUp" class="mr-2" outlined color="primary" @click="exportExcel">
          <v-icon left>mdi-file-excel</v-icon> Xuất Excel
        </v-btn>
        <v-btn color="primary" @click="dialog = !dialog"> <v-icon left>add</v-icon> {{ btnTitle }} </v-btn>
      </div>
    </div>
    <v-card class="mx-md-4 my-md-4 elevation-1">
      <ViolationFilter class="pa-4" @onFilterChanged="refresh" />
    </v-card>

    <v-card class="mx-md-4 elevation-1">
      <ViolationDataTable ref="violationDataTable" />
    </v-card>
    <violation-new-dialog :state="dialog"> </violation-new-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import ViolationFilter from '@/modules/violation/ViolationFilter.vue'
import ViolationNewDialog from '@/modules/violation/ViolationNewDialog.vue'
import ViolationDataTable from '@/modules/violation/ViolationDataTable.vue'
import utils from '@/plugins/utils'

export default {
  components: {
    Breadcrumbs,
    ViolationFilter,
    ViolationNewDialog,
    ViolationDataTable
  },
  data() {
    return {
      createState: false,
      filterState: false,
      dialog: false,
      sendState: false
    }
  },
  computed: {
    ...mapState('violation', ['violations']),
    btnTitle() {
      if (this.$vuetify.breakpoint.smAndDown) {
        return 'Thêm'
      } else {
        return 'Thêm KTKL'
      }
    }
  },
  created() {},
  mounted() {
    let param = {}
    if (this.$route.query.student) {
      param.student = this.$route.query.student
    }
    this.refresh(param)
  },
  methods: {
    updateDraw(draw) {
      this.draw = draw
    },
    refresh(query) {
      this.$refs.violationDataTable.refresh(query)
    },
    exportExcel() {
      const excelHeader = this.$refs.violationDataTable.originHeaders.map(({ text, value }) => ({ text, value }))
      utils.exportExcel(this.violations, excelHeader, 'Violation_List')
    }
  }
}
</script>
<style lang="stylus"></style>
