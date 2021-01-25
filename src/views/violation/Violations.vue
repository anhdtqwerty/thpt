<template>
  <div>
     <div class="pa-4 d-flex justify-space-between align-center">
      <div>
       <Breadcrumbs
          headline="Khen thưởng kỷ luật"
          :link="[
             { text: 'Học sinh', href: '../students' },
             { text: 'KTKL', href: '/complimented' },
          ]"
        />
      </div>
      <div class="flex-center">
        <v-btn
          v-if="$vuetify.breakpoint.mdAndUp"
          class="mr-2"
          outlined
          color="success"
        >
          <v-icon left>mdi-file-excel</v-icon> Xuất Excel
        </v-btn>
        <v-btn color="primary" @click="dialog = !dialog">
          <v-icon left>add</v-icon> {{ btnTitle }}
        </v-btn>
      </div>
    </div>

    <v-card class="px-md-6 mx-md-4 elevation-1">
      <v-data-table
        :loading="loading"
        :headers="originHeaders"
        :items="violations"
        item-key="id"
        v-model="selected"
        mobile-breakpoint="0"
      >
        <div slot="top" class="py-md-6">
            <violation-filter
              @onFilterChanged="refresh"
            />
        </div>
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
import { mapActions, mapState } from 'vuex'
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
    text: 'Họ tên',
    value: 'student.name',
    align: 'left',
    sortable: false,
    show: true,
  },
  {
    text: 'Ngày',
    value: 'createdAt',
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
    text: 'Lớp',
    value: 'class.title',
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
    ViolationUpdateDialog,
  },
  data() {
    return {
      loading: false,
      headers: [],
      originHeaders: originHeaders,
      createState: false,
      filterState: false,
      dialog: false,
      selected: [],
      sendState: false,
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
    },
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
          _sort: 'createdAt:desc',
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
