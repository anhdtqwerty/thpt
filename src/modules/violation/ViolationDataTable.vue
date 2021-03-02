<template>
  <v-data-table
    :loading="loading"
    :headers="originHeaders"
    :items="violations"
    item-key="id"
    v-model="selected"
    mobile-breakpoint="0"
    back
    :footer-props="{
      showFirstLastPage: true,}"
  >
    <template v-slot:[`item.action`]="{ item }">
      <violation-actions :selected="item"> </violation-actions>
    </template>
    <template v-slot:[`item.createdAt`]="{ item }">
      {{ formatDate(item) }}
    </template>
    <template v-slot:[`item.type`]="{ item }">
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
</template>

<script>
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
}
</script>

<style>
</style>
