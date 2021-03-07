<template>
  <v-data-table
    :loading="loading"
    :headers="originHeaders"
    :items="violations"
    item-key="id"
    v-model="selected"
    mobile-breakpoint="0"
    :footer-props="{
      'items-per-page-text': 'Học sinh mỗi trang',
      'items-per-page-all-text': 'Tất cả',
    }"
  >
    <template v-slot:[`item.action`]="{ item }">
      <violation-actions :selected="item"> </violation-actions>
    </template>
    <template v-slot:[`item.createdAt`]="{ item }">
      {{ formatDate(item) }}
    </template>
    <template v-slot:[`item.type`]="{ item }">
      <v-chip :color="getColor(item.type)" dark
        ><span v-if="item.type">
          {{
            item.type === 'violation'
              ? 'Kỷ luật'
              : item.type === 'commendation'
              ? 'Khen thưởng'
              : ''
          }}
        </span>
      </v-chip>
    </template>
    <template v-slot:top="{ pagination, options, updateOptions }">
      <v-data-footer
        :pagination="pagination"
        :options="options"
        @update:options="updateOptions"
        items-per-page-text="Học sinh mỗi trang"
        items-per-page-all-text="Tất cả"
      />
    </template>
  </v-data-table>
</template>

<script>
import ViolationActions from '@/modules/violation/ViolationListActions.vue'
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
    text: 'Lớp',
    value: 'class.title',
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
    text: '',
    value: 'action',
    align: 'left',
    sortable: false,
    show: true,
  },
]

export default {
  data() {
    return {
      headers: [],
      originHeaders: originHeaders,
      selected: [],
      loading: false,
    }
  },
  components: {
    ViolationActions,
  },
  props: {
    violations: Array,
  },
  methods: {
    formatDate(item) {
      return get(item, 'createdAt', '')
        ? moment(item.createdAt).format('DD/MM/YYYY')
        : ''
    },
    getColor(s) {
      if (s === 'violation') return 'orange'
      else return 'green'
    },
  },
}
</script>

<style>
</style>
