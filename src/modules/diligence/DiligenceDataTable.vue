<template>
  <v-data-table
    mobile-breakpoint="0"
    item-key="id"
    :options.sync="tableOptions"
    :server-items-length="totalItems"
    :headers="headers"
    :items="studentDiligences"
    :footer-props="footerTable"
    :items-per-page="10"
    v-bind="this.$attrs"
  >
    <template v-slot:[`item.student`]="{ item }">
      <CardStudentName :student="item.student" link />
    </template>
    <template v-slot:[`item.dob`]="{ item }">
      {{ item.student.dob | ddmmyyyy }}
    </template>
    <template v-slot:[`item.class`]="{ item }">
      {{ item.student | _get('currentClass.title') }}
    </template>
    <template v-slot:[`item.absentNo`]="{ item }">
      {{ item.diligences.length }}
    </template>
    <template v-slot:[`item.valid`]="{ item }">
      {{ item.diligences.filter(d => d.type === 'valid').length }}
    </template>
    <template v-slot:[`item.invalid`]="{ item }">
      {{ item.diligences.filter(d => d.type === 'invalid').length }}
    </template>
    <template v-slot:[`item.action`]="{ item }">
      <v-btn class="elevation-0" icon>
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import CardStudentName from '@/components/basic/card/CardStudentName.vue'
import { mapActions } from 'vuex'

const originHeaders = [
  {
    text: 'Học sinh',
    value: 'student',
    align: 'left',
    sortable: true,
    show: true
  },
  {
    text: 'Ngày sinh',
    value: 'dob',
    align: 'left',
    sortable: true,
    show: true
  },
  {
    text: 'Lớp',
    value: 'class',
    align: 'center',
    sortable: false,
    show: true
  },
  {
    text: 'Số ngày nghỉ',
    value: 'absentNo',
    align: 'center',
    sortable: false,
    show: true
  },
  {
    text: 'Có phép',
    value: 'valid',
    align: 'center',
    sortable: false,
    show: true
  },
  {
    text: 'Không phép',
    value: 'invalid',
    align: 'center',
    sortable: false,
    show: true
  },
  {
    text: 'Thao tác',
    value: 'action',
    align: 'center',
    sortable: false,
    show: true
  }
]

export default {
  data() {
    return {
      headers: originHeaders,
      tableOptions: {},
      status: null
    }
  },
  components: {
    CardStudentName
  },
  computed: {
    footerTable() {
      let footer = {
        'items-per-page-text': 'Học sinh mỗi trang',
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
    ...mapActions('Diligence', ['requestPageSettings', 'searchDiligences']),
    async refresh(query) {
      await this.searchDiligences({ ...query, generation: this.currentGeneration.id })
    }
  },
  async created() {
    await this.refresh({})
  },
  filters: {},
  watch: {
    tableOptions: {
      handler(newOptions, oldOptions) {
        const itemPerPageChanged = newOptions.itemsPerPage !== oldOptions.itemsPerPage
        const pageChanged = newOptions.page !== oldOptions.page
        if (pageChanged || itemPerPageChanged) {
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

<style scoped>
.nowrap {
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;
  width: 230px;
}
</style>
