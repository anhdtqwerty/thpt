<template>
  <v-data-table
    mobile-breakpoint="0"
    item-key="id"
    :options.sync="tableOptions"
    :headers="headers"
    :footer-props="footerTable"
    v-bind="this.$attrs"
  >
    <template v-slot:[`item.time`]="{ item }">
      {{ item.createdAt | ddmmyyyy }}
    </template>
    <template v-slot:[`item.postType`]="{ item }">
      {{ item.postType | getPostType }}
    </template>
    <template v-slot:[`item.config`]="{ item }">
      {{ item.config | getConfig }}
    </template>
    <template v-slot:[`item.receiver`]="{ item }">
      <card-student-name :student="item.student" link />
    </template>
    <template v-slot:[`item.status`]="{ item }">
      <v-chip small class="white--text" v-if="item.status" :color="item.status | getSendNotiStatusColor" label>
        {{ item.status | getSendNotiStatus }}
      </v-chip>
    </template>
    <template v-slot:[`item.currentClass`]="{ item }">
      <router-link style="text-decoration: none" :to="'/class/' + (item.class && item.class.id)">
        <span v-if="item.class">{{ item.class && item.class.title }}</span>
      </router-link>
    </template>
    <template v-slot:[`item.action`]="{ item }">
      <HistoryListActions :item="item" @resend="resend" />
    </template>
    <template v-slot:[`item.content`]="{ item }">
      <v-tooltip max-width="250px" bottom>
        <template v-slot:activator="{ on, attrs }">
          <p v-bind="attrs" v-on="on" class="nowrap ma-0">{{ item.content }}</p>
        </template>
        <span>{{ item.content }}</span>
      </v-tooltip>
    </template>
  </v-data-table>
</template>

<script>
import CardStudentName from '@/components/basic/card/CardStudentName.vue'
import { mapState, mapActions, mapGetters } from 'vuex'

const originHeaders = [
  {
    text: 'Học sinh',
    value: 'student.name',
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
    value: 'class',
    align: 'center',
    sortable: false,
    show: true
  },
  {
    text: 'Có phép',
    value: '',
    align: 'center',
    sortable: false,
    show: true
  },
  {
    text: 'Không phép',
    value: '',
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
    ...mapActions('AppHistory', ['requestPageSettings', 'searchHistories']),
    async refresh(query) {}
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
