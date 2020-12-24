<template>
  <div>
    <div class="pa-4 pa-md-2 d-flex justify-space-between align-center">
      <div>
        <Breadcrumbs
          headline="Quản lý phân ban"
          :link="[{ text: 'Quản lý phân ban', href: '../divisions' }]"
        />
      </div>
      <div class="flex-center">
        <v-btn @click="createState = !createState" dark color="#0D47A1">
          <v-icon left>add</v-icon>{{ addButtonText }}
        </v-btn>
      </div>
    </div>
    <new-division-dialog :state="createDivision" />
    <v-card class="pa-2 pa-md-4 ma-md-2 elevation-1">
      <p class="text-uppercase text-h6" style="color: #0d47a1">
        Danh sách các ban chuyên
      </p>
      <v-data-table :headers="headers" :items="divisions">
        <template v-slot:item.subjects="{ item }">
          <p>{{ item | getSubject }}</p>
        </template>
        <template v-slot:item.actions="{ item }">
          <division-actions :selected="item"> </division-actions>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import NewDivisionDialog from '@/modules/division/NewDivisionDialog.vue'
import DivisionActions from '@/modules/division/DivisionListActions.vue'

export default {
  components: {
    NewDivisionDialog,
    Breadcrumbs,
    DivisionActions,
  },
  props: {
    role: String,
  },
  data() {
    return {
      headers: [
        { text: 'Phân ban', value: 'title', align: 'left', sortable: false },
        { text: 'Khối', value: 'grade.title', align: 'left', sortable: false },
        {
          text: 'Các môn học',
          value: 'subjects',
          align: 'left',
          sortable: false,
        },
        { text: 'Hành động', value: 'actions', align: 'left', sortable: false },
      ],
      createDivision: false,
      selected: {},
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
    },
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
      this.fetchDivision()
    },
    onDivisionSelected(division) {
      this.setDivision(division)
    },
  },
  filters: {
    getSubject(division) {
      return division.subjects
        .map((value) => {
          return value.title
        })
        .join(' - ')
    },
  },
}
</script>
