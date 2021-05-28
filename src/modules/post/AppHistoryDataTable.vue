<template>
  <v-data-table
    mobile-breakpoint="0"
    item-key="id"
    :options.sync="postTableOptions"
    :server-items-length="totalItems"
    :headers="headers"
    :items="historiesData"
    sort-by="name"
    @input="$emit('update:selected', $event)"
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
    <template v-slot:[`item.notes`]="{ item }">
      <v-tooltip max-width="250px" bottom>
        <template v-slot:activator="{ on, attrs }">
          <p v-bind="attrs" v-on="on" class="nowrap ma-0">{{ item.notes }}</p>
        </template>
        <span>{{ item.notes }}</span>
      </v-tooltip>
    </template>
  </v-data-table>
</template>

<script>
import CardStudentName from '@/components/basic/card/CardStudentName.vue'
import HistoryListActions from '@/modules/post/HistoryListActions.vue'
import { mapState, mapActions, mapGetters } from 'vuex'

const originHeaders = [
  {
    text: 'Ngày',
    value: 'time',
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
    text: 'Loại gửi tin',
    value: 'config',
    align: 'left',
    sortable: false,
    show: true
  },
  {
    text: 'Người nhận',
    value: 'receiver',
    align: 'left',
    sortable: false,
    show: true,
    width: '100'
  },
  {
    text: 'Lớp',
    value: 'currentClass',
    align: 'left',
    sortable: false,
    show: true,
    width: '100'
  },
  {
    text: 'Nội dung',
    value: 'content',
    align: 'left',
    sortable: false,
    show: true
  },
  {
    text: 'Trạng thái',
    value: 'status',
    align: 'left',
    sortable: false,
    show: true,
    width: '100'
  },

  {
    value: 'action',
    align: 'center',
    sortable: false,
    show: true,
    width: '100'
  }
]
export default {
  data() {
    return {
      headers: originHeaders,
      originHeaders: originHeaders,
      postTableOptions: {},
      selected: [],
      status: null
    }
  },
  components: {
    CardStudentName,
    HistoryListActions
  },
  computed: {
    ...mapState('AppHistory', ['historiesData', 'totalItems', 'pageText', 'searchParams']),
    ...mapGetters('constant', ['postTypes', 'receivers']),

    footerTable() {
      let footer = {
        'items-per-page-text': 'Tin nhắn mỗi trang',
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
    async refresh(query) {
      await this.searchHistories({ ...query, senderMethod: 'app' })
    },
    async resend() {
      await this.refresh(this.searchParams)
    }
  },
  async created() {
    await this.refresh({})
  },
  filters: {},
  watch: {
    postTableOptions: {
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
