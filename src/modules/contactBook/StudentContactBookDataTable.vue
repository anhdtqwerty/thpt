<template>
  <v-card class="elevation-1 mt-6">
    <v-data-table
      item-key="id"
      :options.sync="tableOptions"
      :server-items-length="totalItems"
      :headers="headers"
      :items="historiesData"
      :loading="loading"
      :items-per-page="10"
      :footer-props="footerTable"
    >
      <template v-slot:[`item.time`]="{ item }">
        <span>{{ item.createdAt | ddmmyyyy }}</span>
      </template>
      <template v-slot:[`item.senderMethod`]="{ item }">
        <span>{{ item.senderMethod.toUpperCase() }}</span>
      </template>
      <template v-slot:[`item.postType`]="{ item }">
        <span>{{ item.postType | getPostType }}</span>
      </template>
      <template v-slot:[`item.content`]="{ item }">
        <span>{{ item.content }}</span>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { mapActions, mapState } from 'vuex'

const originHeaders = [
  {
    text: 'Ngày',
    value: 'time',
    align: 'left',
    sortable: false,
    show: true
  },
  {
    text: 'Hình thức gửi tin',
    value: 'senderMethod',
    align: 'left',
    sortable: false,
    show: true
  },
  {
    text: 'Dạng tin',
    value: 'postType',
    align: 'left',
    sortable: false,
    show: true
  },
  {
    text: 'Nội dung',
    value: 'content',
    align: 'left',
    sortable: false,
    show: true
  }
]
export default {
  components: {},
  props: {
    loading: Boolean
  },
  data() {
    return {
      headers: originHeaders,
      originHeaders: originHeaders,
      tableOptions: {}
    }
  },
  async created() {
    await this.refresh({})
  },
  computed: {
    ...mapState('app', ['department']),
    ...mapState('StudentPostHistory', ['totalItems', 'pageText', 'historiesData']),

    footerTable() {
      let footer = {
        'items-per-page-text': 'Hiển thị mỗi trang',
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
    ...mapActions('StudentPostHistory', ['requestPageSettings', 'searchHistories']),

    async refresh(query) {
      await this.searchHistories({ ...query })
    }
  },
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
  },
  filters: {}
}
</script>
<style scoped>
td {
  white-space: nowrap !important   ;
}
.card-border {
  border: 1px solid rgba(224, 224, 224, 1);
}
</style>
