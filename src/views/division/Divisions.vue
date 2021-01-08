<template>
  <div>
    <div class="pa-4 d-flex justify-space-between align-center">
      <div>
        <Breadcrumbs
          headline="Quản lý phân ban"
          :link="[{ text: 'Quản lý phân ban', href: '../divisions' }]"
        />
      </div>
      <div class="flex-center">
        <v-btn
          @click="createStateDialog = !createStateDialog"
          dark
          color="#0D47A1"
        >
          <v-icon left>add</v-icon>{{ addButtonText }}
        </v-btn>
      </div>
    </div>
    <v-card class="px-md-6 mx-md-4 elevation-1">
      <v-data-table :headers="headers" :items="divisions">
        <div slot="top" class="d-flex mb-2">
          <v-spacer></v-spacer>
          <div>
            <drop-menu
              :default-headers="headers"
              @change="headers = $event"
              v-if="$vuetify.breakpoint.mdAndUp"
            ></drop-menu>
          </div>
        </div>
        <template v-slot:item.subjects="{ item }">
          <p>{{ item | getSubject }}</p>
        </template>
        <template v-slot:item.actions="{ item }">
          <division-actions :selected="item"> </division-actions>
        </template>
      </v-data-table>
    </v-card>

    <new-division-dialog :state="createStateDialog" />
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import NewDivisionDialog from '@/modules/division/NewDivisionDialog.vue'
import DivisionActions from '@/modules/division/DivisionListActions.vue'
import DropMenu from '@/modules/student/menu/Menu.vue'

export default {
  components: {
    NewDivisionDialog,
    Breadcrumbs,
    DivisionActions,
    DropMenu,
  },
  props: {
    role: String,
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
        },
        {
          text: 'Khối',
          value: 'grade.title',
          align: 'left',
          sortable: false,
          show: true,
        },
        {
          text: 'Các môn học',
          value: 'subjects',
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
      createStateDialog: false,
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
