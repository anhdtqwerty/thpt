<template>
  <div>
    <div class="pa-4 d-flex justify-space-between align-center">
      <div>
        <Breadcrumbs
          headline="Quản lý khóa"
          :link="[
            { text: 'Nâng cao' },
            { text: 'Quản lý khóa', href: '/generations' }
          ]"
        />
      </div>
      <div class="flex-center">
        <v-btn
          @click="createGeneration = !createGeneration"
          dark
          color="#0D47A1"
        >
          <v-icon left>add</v-icon>Thêm khóa
        </v-btn>
      </div>
    </div>
    <v-card class="px-md-6 mx-md-4 elevation-1">
      <v-data-table item-key="id" :headers="headers" :items="generations">
        <div slot="top" class="d-flex mb-2">
          <v-spacer></v-spacer>
          <div>
            <drop-menu
              :default-headers="originHeaders"
              @change="headers = $event"
              v-if="$vuetify.breakpoint.mdAndUp"
            ></drop-menu>
          </div>
        </div>
        <template v-slot:[`item.actions`]="{ item }">
          <generation-list-actions
            :selected="item"
            @onEdit="onEditGeneration"
          />
        </template>
        <template v-slot:[`item.data.startDate`]="{ item }">
          {{ formatStartDate(item) }}
        </template>
        <template v-slot:[`item.data.endDate`]="{ item }">
          {{ formatEndDate(item) }}
        </template>
      </v-data-table>
    </v-card>

    <new-generation-dialog :state="createGeneration"></new-generation-dialog>
    <generation-update-dialog
      :state="editGeneration"
      :generation="selected"
    ></generation-update-dialog>
  </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import GenerationListActions from '@/modules/generation/GenerationListActions'
import NewGenerationDialog from '@/modules/generation/NewGenerationDialog'
import GenerationUpdateDialog from '@/modules/generation/GenerationUpdateDialog'
import DropMenu from '@/modules/student/menu/Menu.vue'
import SettingTableHeader from '@/components/basic/table/SettingHeaders'
import moment from 'moment'
import { get } from 'lodash'

const originHeaders = [
  { text: 'Tên', value: 'name', align: 'left', sortable: false, show: true },
  {
    text: 'Mã Khóa',
    value: 'code',
    align: 'left',
    sortable: false,
    show: true
  },
  {
    text: 'Ngày khai giảng',
    value: 'data.startDate',
    align: 'left',
    sortable: false,
    show: true
  },
  {
    text: 'Ngày kết thúc',
    value: 'data.endDate',
    align: 'left',
    sortable: false,
    show: true
  },
  {
    text: 'Ghi chú',
    value: 'data.notes',
    align: 'left',
    sortable: false,
    show: true
  },
  {
    text: 'Hành động',
    value: 'actions',
    align: 'left',
    sortable: false,
    show: true
  }
]

export default {
  components: {
    GenerationListActions,
    NewGenerationDialog,
    GenerationUpdateDialog,
    Breadcrumbs,
    DropMenu,
    SettingTableHeader
  },
  props: {
    role: String
  },
  data() {
    return {
      headers: originHeaders,
      originHeaders: originHeaders,
      selected: {},
      draw: false,
      editGeneration: false,
      createGeneration: false
    }
  },
  async created() {
    this.fetchGenerations({ department: this.department.id })
  },
  computed: {
    ...mapState('app', ['department']),
    ...mapGetters('generation', ['generations']),
    addButtonText() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
        case 'sm':
          return 'Thêm'
        default:
          return 'Thêm niên khóa'
      }
    }
  },
  methods: {
    ...mapActions('generation', ['fetchGenerations']),
    onEditGeneration(selected) {
      this.selected = selected
      console.log(selected)
      this.editGeneration = !this.editGeneration
    },
    formatStartDate(item) {
      return get(item, 'data.startDate', '')
        ? moment(item.data.startDate).format('D/MM/YYYY')
        : ''
    },
    formatEndDate(item) {
      return get(item, 'data.endDate', '')
        ? moment(item.data.endDate).format('D/MM/YYYY')
        : ''
    }
  }
}
</script>
