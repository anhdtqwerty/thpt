<template>
  <div>
    <div class="pa-4 d-flex justify-space-between align-center">
      <div>
        <Breadcrumbs
          headline="Quản lý khối"
          :link="[{ text: 'Quản lý khối', href: '../grades' }]"
        />
      </div>
      <div class="flex-center">
        <v-btn @click="createGrade = !createGrade" dark color="#0D47A1">
          <v-icon left>add</v-icon>{{ addButtonText }}
        </v-btn>
      </div>
    </div>
    <new-grade-dialog :state="createGrade" />

    <v-card class="px-md-6 mx-md-4 elevation-1">
      <div class="d-flex justify-end">
        <drop-menu
          :default-headers="headers"
          @change="headers = $event"
          v-if="$vuetify.breakpoint.mdAndUp"
        ></drop-menu>
      </div>
      <v-data-table :headers="headers" :items="grades">
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
import DropMenu from '@/modules/student/menu/Menu.vue'

export default {
  components: {
    NewGradeDialog,
    Breadcrumbs,
    GradeListActions,
    DropMenu
  },
  props: {
    role: String,
  },
  data() {
    return {
      headers: [
        {
          text: 'Tên khối',
          value: 'title',
          align: 'left',
          sortable: false,
          show: true,
        },
        {
          text: 'Ghi chú',
          value: 'description',
          align: 'left',
          sortable: false,
          show: true,
        },
        {
          text: 'Hành động',
          value: 'actions',
          align: 'left',
          sortable: false,
          show: true,
        },
      ],
      createGrade: false,
      selected: {},
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
    },
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
      this.fetchGrades()
    },
    onGradeSelected(grade) {
      this.setGrade(grade)
    },
  },
  filters: {},
}
</script>
