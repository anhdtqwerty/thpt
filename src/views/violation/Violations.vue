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
          :link="[{ text: 'Khen thưởng kỷ luật', href: '' }]"
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
        :items="violation"
        item-key="id"
        dense
      >
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import { mapActions, mapState, mapGetters } from 'vuex'
import DropMenu from '@/modules/student/menu/Menu.vue'
import SettingTableHeader from '@/components/basic/table/SettingHeaders'

const originHeaders = [
  {
    text: 'Ngày',
    value: 'title',
    align: 'left',
    sortable: false,
    show: true,
  },
  {
    text: 'Họ tên',
    value: 'generation.name',
    align: 'left',
    sortable: false,
    show: true,
  },
  {
    text: 'Lớp',
    value: 'config.startDate',
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
}
</script>
