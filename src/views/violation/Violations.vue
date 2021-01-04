<template>
  <div class=" pa-2">
    <v-row
      class="pa-4 pa-md-2 d-flex justify-space-between align-center"
      no-gutters
    >
      <v-col>
        <Breadcrumbs
          headline="Khen thưởng kỷ luật"
          :link="[
            { text: 'Học sinh', href: '' },
            { text: 'Khen thưởng kỷ luật', href: '/complimented' },
          ]"
        />
      </v-col>
      <v-col class="d-flex justify-end">
        <v-btn color="primary" @click="dialog = !dialog">
          <v-icon left>add</v-icon> Thêm
        </v-btn>
      </v-col>
    </v-row>

    <v-card class="pa-2 elevation-1">
      <v-row no-gutters class="mx-4">
        <v-col cols="12" md="11">
          <violation-filter
            v-if="$vuetify.breakpoint.mdAndUp"
            @onFilterChanged="refresh"
          />
        </v-col>
        <v-col cols="12" md="1">
          <span v-if="$vuetify.breakpoint.smAndDown">
            <violation-dialog-filter @onFilterChanged="refresh" />
          </span>
          <setting-table-header
            :default-headers="originHeaders"
            @change="headers = $event"
          />
          <span v-if="$vuetify.breakpoint.mdAndUp">
            <kebap-menu>
              <v-list>
                <v-list-item>
                  <export-excel :custom-header="headers" api="/classes/" />
                </v-list-item>
              </v-list>
            </kebap-menu>
          </span>
        </v-col>
      </v-row>
      <v-data-table
        :loading="loading"
        :headers="originHeaders"
        :items="violations"
        item-key="id"
        dense
      >
        <template v-slot:item.action="{ item }">
          <violation-actions :selected="item"> </violation-actions>
        </template>
        <template v-slot:item.createdAt="{ item }">
          {{ formatDate(item) }}
        </template>
        <template v-slot:item.type="{ item }">
          <span v-if="item.type">
            {{
              item.type === 'violation'
                ? 'Kỷ luật'
                : item.type === 'commendation'
                ? 'Khen thưởng'
                : ''
            }}
          </span>
        </template>
      </v-data-table>
    </v-card>
    <violation-new-dialog :state="dialog"> </violation-new-dialog>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import DropMenu from '@/modules/student/menu/Menu.vue'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import SettingTableHeader from '@/components/basic/table/SettingHeaders'
import ViolationActions from '@/modules/violation/ViolationListActions.vue'
import ViolationFilter from '@/modules/violation/ViolationFilter.vue'
import ViolationDialogFilter from '@/modules/violation/ViolationDialogFilter.vue'
import ExportExcel from '@/components/basic/ExportExcel'
import KebapMenu from '@/components/basic/menu/KebapMenu'
import ViolationNewDialog from '@/modules/violation/ViolationNewDialog.vue'
import ViolationUpdateDialog from '@/modules/violation/ViolationUpdateDialog.vue'

import moment from 'moment'
import { get } from 'lodash'

const originHeaders = [
  {
    text: 'Ngày',
    value: 'createdAt',
    align: 'left',
    sortable: false,
    show: true,
  },
  {
    text: 'Họ tên',
    value: 'student.name',
    align: 'left',
    sortable: false,
    show: true,
  },
  {
    text: 'Lớp',
    value: 'class.title',
    align: 'left',
    sortable: false,
    show: true,
  },
  {
    text: 'Mục',
    value: 'type',
    align: 'left',
    sortable: false,
    show: true,
  },
  {
    text: 'Nội dung',
    value: 'description',
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
    ViolationActions,
    ViolationFilter,
    ViolationDialogFilter,
    ExportExcel,
    KebapMenu,
    ViolationNewDialog,
    ViolationUpdateDialog
  },
  data() {
    return {
      loading: false,
      headers: [],
      originHeaders: originHeaders,
      createState: false,
      filterState: false,
      dialog: false,
    }
  },
  computed: {
    ...mapState('violation', ['violations']),
  },
  async created() {
    await this.refresh({})
  },
  methods: {
    ...mapActions('violation', ['fetchViolation']),
    updateDraw(draw) {
      this.draw = draw
    },
    formatDate(item) {
      return get(item, 'createdAt', '')
        ? moment(item.createdAt).format('DD/MM/YYYY')
        : ''
    },
    async refresh(query) {
      this.loading = true
      try {
        await this.fetchViolation({
          ...query,
          _limit: 9999,
          _sort: 'createdAt:desc'
        })
      } catch (err) {
        console.log(err)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
