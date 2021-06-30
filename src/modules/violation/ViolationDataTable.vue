<template>
  <v-data-table
    :server-items-length="totalItems"
    :hide-default-footer="hideFooter"
    :loading="loading"
    :headers="headers ? headers : originHeaders"
    :options.sync="tableOptions"
    :items="violations"
    item-key="id"
    v-model="selected"
    mobile-breakpoint="0"
    :footer-props="footerTable"
  >
    <template v-slot:[`footer.page-text`]="items">
      {{ items.pageStart }} - {{ items.pageStop }} trên tổng
      {{ items.itemsLength }}
    </template>
    <template v-slot:[`item.action`]="{ item }">
      <violation-actions :selected="item" :currentPage="currentPage"> </violation-actions>
    </template>
    <template v-slot:[`item.date`]="{ item }">
      {{ item.date | ddmmyyyy }}
    </template>
    <template v-slot:[`item.class`]="{ item }">
      <router-link style="text-decoration: none" :to="'/class/' + (item.class && item.class.id)">
        <span v-if="item.class">{{ item.class && item.class.title }}</span>
      </router-link>
    </template>
    <template v-slot:[`item.student`]="{ item }">
      <CardStudentName :student="item.student" link />
    </template>
    <template v-slot:[`item.type`]="{ item }">
      <v-chip small label :color="getColor(item.type)" dark
        ><span v-if="item.type">
          {{ item.type === 'violation' ? 'Kỷ luật' : item.type === 'commendation' ? 'Khen thưởng' : '' }}
        </span>
      </v-chip>
    </template>
  </v-data-table>
</template>

<script>
import ViolationActions from '@/modules/violation/ViolationListActions.vue'
import CardStudentName from '@/components/basic/card/CardStudentName.vue'
import { mapActions, mapState } from 'vuex'

const originHeaders = [
  {
    text: 'Ngày',
    value: 'date',
    align: 'left',
    sortable: false,
    show: true
  },
  {
    text: 'Lớp',
    value: 'class',
    align: 'left',
    sortable: false,
    show: true
  },
  {
    text: 'Họ tên',
    value: 'student',
    align: 'left',
    sortable: false,
    show: true
  },
  {
    text: 'Mục',
    value: 'type',
    align: 'left',
    sortable: false,
    show: true
  },
  {
    text: 'Nội dung',
    value: 'description',
    align: 'left',
    sortable: false,
    show: true
  },
  {
    text: '',
    value: 'action',
    align: 'left',
    sortable: false,
    show: true
  }
]

export default {
  data() {
    return {
      originHeaders: originHeaders,
      selected: [],
      loading: false,
      tableOptions: {},
      currentPage: 0
    }
  },
  components: {
    ViolationActions,
    CardStudentName
  },
  props: {
    headers: { type: Array, default: () => null },
    hideFooter: { type: Boolean, default: () => false }
  },
  computed: {
    ...mapState('violation', ['violations', 'totalItems', 'pageText']),

    footerTable() {
      let footer = {
        'items-per-page-text': 'Khen thưởng kỷ luật mỗi trang',
        'items-per-page-all-text': 'Tất cả',
        'items-per-page': 10,
        'page-text': this.pageText
      }
      if (this.totalItems > 100) {
        footer['items-per-page-options'] = [5, 10, 15]
      }
      return footer
    }
  },
  methods: {
    ...mapActions('violation', ['searchViolations', 'requestPageSettings']),

    getColor(s) {
      if (s === 'violation') return 'orange'
      else return '#46BE8A'
    },
    refresh(query) {
      this.searchViolations(query)
    }
  },
  watch: {
    tableOptions: {
      handler(newOptions, oldOptions) {
        const itemPerPageChanged = newOptions.itemsPerPage !== oldOptions.itemsPerPage
        const pageChanged = newOptions.page !== oldOptions.page
        if (pageChanged || itemPerPageChanged) {
          this.currentPage = newOptions.page
          this.requestPageSettings({
            page: newOptions.page,
            itemsPerPage: newOptions.itemsPerPage
          })
        }
      },
      deep: true
    }
  }
}
</script>

<style></style>
