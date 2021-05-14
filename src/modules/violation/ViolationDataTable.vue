<template>
  <v-data-table
    :hide-default-footer="hideFooter"
    :loading="loading"
    :headers="headers ? headers : originHeaders"
    :items="violations"
    item-key="id"
    v-model="selected"
    mobile-breakpoint="0"
    :footer-props="{
      'items-per-page-text': 'Khen thưởng kỷ luật mỗi trang',
      'items-per-page-all-text': 'Tất cả'
    }"
  >
    <template v-slot:[`item.action`]="{ item }">
      <violation-actions :selected="item"> </violation-actions>
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
    <template v-if="!hideFooter" v-slot:top="{ pagination, options, updateOptions }">
      <v-data-footer
        :pagination="pagination"
        :options="options"
        @update:options="updateOptions"
        items-per-page-text=""
        items-per-page-all-text="Tất cả"
      />
    </template>
  </v-data-table>
</template>

<script>
import ViolationActions from '@/modules/violation/ViolationListActions.vue'
import CardStudentName from '@/components/basic/card/CardStudentName.vue'

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
      loading: false
    }
  },
  components: {
    ViolationActions,
    CardStudentName
  },
  props: {
    headers: { type: Array, default: () => null },
    violations: Array,
    hideFooter: { type: Boolean, default: () => false }
  },
  methods: {
    getColor(s) {
      if (s === 'violation') return 'orange'
      else return '#46BE8A'
    }
  }
}
</script>

<style></style>
