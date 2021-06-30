<template>
  <div>
    <div class="pa-4 d-flex justify-space-between align-center">
      <div>
        <Breadcrumbs
          headline="Quản lý khối"
          :link="[
            { text: 'Nâng cao', href: '../divisions' },
            { text: 'QL Khối', href: '../grades' }
          ]"
        />
      </div>
      <div class="flex-center">
        <v-btn v-if="$vuetify.breakpoint.mdAndUp" class="mr-2" outlined color="success" @click="exportExcel">
          <v-icon left>mdi-file-excel</v-icon> Xuất Excel
        </v-btn>
        <v-btn @click="createGrade = !createGrade" dark color="#0D47A1">
          <v-icon left>add</v-icon>{{ addButtonText }}
        </v-btn>
      </div>
    </div>
    <new-grade-dialog :state="createGrade" />

    <v-card class="px-md-6 mx-md-4 elevation-1">
      <v-data-table :headers="headers" :items="grades">
        <div slot="top" class="py-md-3"></div>
        <template v-slot:item.actions="{ item }">
          <grade-list-actions :selected="item"> </grade-list-actions>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import NewGradeDialog from '@/modules/grade/NewGradeDialog.vue'
import GradeListActions from '@/modules/grade/GradeListActions.vue'

import utils from '@/plugins/utils'

export default {
  components: {
    NewGradeDialog,
    Breadcrumbs,
    GradeListActions
  },
  props: {
    role: String
  },
  data() {
    return {
      headers: [
        {
          text: 'Tên khối',
          value: 'title',
          align: 'left',
          sortable: false,
          show: true
        },
        {
          text: 'Ghi chú',
          value: 'description',
          align: 'left',
          sortable: false,
          show: true
        },
        {
          text: 'Hành động',
          value: 'actions',
          align: 'center',
          sortable: false,
          show: true
        }
      ],
      createGrade: false,
      selected: {}
    }
  },

  computed: {
    ...mapState('app', ['department']),
    ...mapState('grade', ['grades']),
    addButtonText() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
        case 'sm':
          return 'Thêm'
        default:
          return 'Thêm khối'
      }
    }
  },
  async created() {
    await this.refresh({})
  },
  methods: {
    ...mapActions('grade', ['fetchGrades']),
    updateDraw(draw) {
      this.draw = draw
    },
    refresh() {
      this.fetchGrades({ _sort: 'createdAt:desc' })
    },
    onGradeSelected(grade) {
      this.setGrade(grade)
    },
    exportExcel() {
      const excelHeader = this.headers.map(({ text, value }) => ({ text, value }))
      utils.exportExcel(this.grades, excelHeader, 'Grade_List')
    }
  },
  filters: {}
}
</script>
