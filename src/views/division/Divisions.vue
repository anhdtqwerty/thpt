<template>
  <div>
    <div class="pa-4 d-flex justify-space-between align-center">
      <div>
        <Breadcrumbs
          headline="Quản lý phân ban"
          :link="[
            { text: 'Nâng cao', href: '../divisions' },
            { text: 'QL Phân Ban', href: '../divisions' }
          ]"
        />
      </div>
      <div class="flex-center">
        <!-- <v-btn v-if="$vuetify.breakpoint.mdAndUp" class="mr-2" outlined color="success" @click="exportExcel">
          <v-icon left>mdi-file-excel</v-icon> Xuất Excel
        </v-btn> -->
        <v-btn @click="createStateDialog = !createStateDialog" dark color="#0D47A1">
          <v-icon left>add</v-icon>Thêm ban
        </v-btn>
      </div>
    </div>
    <DivisionDataTable :divisions="divisions" />

    <NewDivisionDialog :state="createStateDialog" />
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import NewDivisionDialog from '@/modules/division/NewDivisionDialog.vue'
import utils from '@/plugins/utils'
import DivisionDataTable from '@/modules/division/DivisionDataTable.vue'

export default {
  components: {
    NewDivisionDialog,
    Breadcrumbs,
    DivisionDataTable
  },
  props: {
    role: String
  },
  data() {
    return {
      headers: [
        {
          text: 'Phân ban',
          value: 'title',
          align: 'left',
          sortable: false,
          show: true,
          width: 300
        },
        {
          text: 'Cấp học',
          value: 'academicLevel',
          align: 'center',
          sortable: false,
          show: true
        },
        {
          text: 'Hành động',
          value: 'actions',
          align: 'center',
          sortable: false,
          show: true,
          width: 100
        }
      ],
      createStateDialog: false,
      selected: {}
    }
  },

  computed: {
    ...mapState('app', ['department']),
    ...mapState('division', ['divisions']),
    addButtonText() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
        case 'sm':
          return 'Thêm'
        default:
          return 'Thêm ban'
      }
    }
  },
  async created() {
    await this.refresh({})
  },
  methods: {
    ...mapActions('division', ['fetchDivision']),
    updateDraw(draw) {
      this.draw = draw
    },
    refresh() {
      this.fetchDivision({ _sort: 'createdAt:DESC' })
    },
    onDivisionSelected(division) {
      this.setDivision(division)
    },
    exportExcel() {
      const excelHeader = this.headers.map(({ text, value }) => ({ text, value }))
      utils.exportExcel(this.divisions, excelHeader, 'Divisions_List')
    }
  },
  filters: {
    getSubject(division) {
      return division.subjects
        .map(value => {
          return value.title
        })
        .join(' - ')
    }
  }
}
</script>

<style scoped>
.shortenContent {
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;
  width: 200px;
}
</style>
