<template>
  <div>
    <v-row
      :class="{
        'px-2 mt-2': $vuetify.breakpoint.smAndDown,
      }"
      no-gutters
    >
      <v-col>
        <Breadcrumbs
          headline="Khen thưởng kỷ luật"
          :link="[{ text: 'Học sinh', href: '' },{ text: 'Khen thưởng kỷ luật', href: '/complimented' }]"
        />
      </v-col>
      <v-col class="d-flex justify-end pt-4">
        <v-btn color="primary">
          <v-icon left>add</v-icon>Thêm
        </v-btn>
      </v-col>
    </v-row>

    <v-card class="pa-4 ma-md-2 elevation-1">
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
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import DropMenu from '@/modules/student/menu/Menu.vue'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import SettingTableHeader from '@/components/basic/table/SettingHeaders'
import ViolationActions from '@/modules/violation/ViolationListActions.vue'

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
    value: 'title',
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
    value: 'config.endDate',
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
    ViolationActions
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
    ...mapState('violation', ['violations']),
  },
  async created() {
    await this.refresh({})
    console.log(this.violations)
  },
  methods: {
    ...mapActions('violation', ['fetchViolation']),
    updateDraw(draw) {
      this.draw = draw
    },
    refresh() {
      this.fetchViolation()
    },
  },
}
</script>
