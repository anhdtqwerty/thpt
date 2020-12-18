<template>
  <div>
    <div class="pa-2 d-flex justify-space-between align-center">
      <div>
        <Breadcrumbs
          headline="Quản lý học kỳ"
          :link="[{ text: 'Quản lý nâng cao' }, { text: 'Quản lý học kỳ' }]"
        />
      </div>
      <div class="flex-center">
        <v-btn @click="createState = !createState" dark color="#0D47A1">
          <v-icon left>add</v-icon>Thêm học kỳ
        </v-btn>
      </div>
    </div>

    <v-card class="pa-4 ma-md-2 elevation-1">
      <v-data-table
        :loading="loading"
        :headers="headers"
        :items="semesters"
        item-key="id"
        dense
      >
        <div slot="top" class="d-flex mb-4">
          <div v-if="!$vuetify.breakpoint.mobile">
            <semester-filter @onFilterChanged="refresh"></semester-filter>
          </div>
          <v-spacer></v-spacer>
          <div>
            <v-btn
              v-if="$vuetify.breakpoint.mobile"
              icon
              @click.stop="filterState = !filterState"
            >
              <v-icon right>mdi-filter-outline</v-icon>
            </v-btn>
            <setting-table-header
              :default-headers="originHeaders"
              @change="headers = $event"
            />
            <drop-menu v-if="!$vuetify.breakpoint.mobile"></drop-menu>
          </div>
        </div>
      </v-data-table>
    </v-card>

    <semester-new-dialog :state="createState"></semester-new-dialog>
    <semester-filter-dialog :state="filterState"></semester-filter-dialog>
  </div>
</template>

<script>
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import { mapActions, mapState, mapGetters } from 'vuex'
import DropMenu from '@/modules/student/menu/Menu.vue'
import SettingTableHeader from '@/components/basic/table/SettingHeaders'
import SemesterFilter from '@/modules/semester/SemesterFilter'
import SemesterNewDialog from '@/modules/semester/SemesterNewDialog'
import SemesterFilterDialog from '@/modules/semester/SemesterFilterDialog'

const originHeaders = [
  {
    text: 'Học kỳ',
    value: 'title',
    align: 'left',
    sortable: false,
    show: true,
  },
  {
    text: 'Năm học',
    value: 'generation.name',
    align: 'left',
    sortable: false,
    show: true,
  },
  {
    text: 'Ngày bắt đầu',
    value: 'config.startDate',
    align: 'left',
    sortable: false,
    show: true,
  },
  {
    text: 'Ngày kết thúc',
    value: 'config.endDate',
    align: 'left',
    sortable: false,
    show: true,
  },
  {
    text: 'Ghi chú',
    value: 'config.notes',
    align: 'left',
    sortable: false,
    show: true,
  },
  {
    text: 'Hành động',
    value: 'action',
    align: 'left',
    sortable: false,
    show: true,
  },
]

export default {
  components: {
    Breadcrumbs,
    DropMenu,
    SettingTableHeader,
    SemesterFilter,
    SemesterNewDialog,
    SemesterFilterDialog,
  },
  data() {
    return {
      loading: false,
      headers: [],
      originHeaders: originHeaders,
      createState: false,
      filterState: false,
    }
  },
  computed: {
    ...mapState('app', ['currentGeneration']),
    ...mapGetters('semester', ['semesters']),
  },
  created() {
    this.loading = true
    this.fetchSemesters({ generation: this.currentGeneration }).then(() => {
      this.loading = false
    })
  },
  methods: {
    ...mapActions('semester', ['fetchSemesters', 'searchSemesters']),
    refresh(query) {
      this.loading = true
      this.searchSemesters({
        ...query,
        generation: this.currentGeneration,
      }).then(() => {
        this.loading = false
      })
    },
  },
}
</script>
