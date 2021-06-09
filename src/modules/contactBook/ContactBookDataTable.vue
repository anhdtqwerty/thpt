<template>
  <v-card class="elevation-1 mt-6">
    <v-data-table
      v-bind="this.$attrs"
      item-key="id"
      :options.sync="studentTableOptions"
      :server-items-length="totalItems"
      :headers="headers"
      :items="students"
      :items-per-page="10"
      @input="$emit('update:selected', $event)"
      :footer-props="footerTable"
    >
      <template v-slot:[`item.name`]="{ item }">
        <CardStudentName :student="item" link />
      </template>
      <template v-slot:[`item.action`]="{ item }">
        <ContactBookListActions :item="item" />
      </template>
      <template v-slot:[`item.senderMethod`]="{ item }">
        <span>{{ item | getNotificationMethod }}</span>
      </template>
      <template v-slot:[`item.phone`]="{ item }">
        <v-tooltip max-width="250px" bottom>
          <template v-slot:activator="{ on, attrs }">
            <div v-bind="attrs" v-on="on" class="d-inline-block text-truncate" style="max-width: 150px;">
              {{ item | getContactBookPhones }}
            </div>
          </template>
          <span>{{ item | getContactBookPhones }}</span>
        </v-tooltip>
      </template>
      <template v-slot:[`item.status`]="{ item }">
        <v-chip :color="item | getContactBookStatusColor" small class="white--text">{{
          item | getContactBookStatus
        }}</v-chip>
      </template>
      <template v-slot:[`item.classes`]="{ item }">
        <router-link style="text-decoration: none" :to="'/class/' + (item.currentClass && item.currentClass.id)">
          <span v-if="item.currentClass">{{ item.currentClass && item.currentClass.title }}</span>
        </router-link>
      </template>
      <template v-slot:[`item.dob`]="{ item }">
        <span>{{ item.dob | ddmmyyyy }}</span>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import CardStudentName from '@/components/basic/card/CardStudentName.vue'
import ContactBookListActions from '@/modules/contactBook/ContactBookListActions.vue'

const originHeaders = [
  {
    text: 'Học sinh',
    value: 'name',
    align: 'left',
    sortable: false,
    show: true
  },
  {
    text: 'Ngày sinh',
    value: 'dob',
    align: 'left',
    sortable: false,
    show: true
  },
  { text: 'Lớp', value: 'classes', align: 'left', sortable: false, show: true },
  {
    text: 'Hình thức sử dụng',
    value: 'senderMethod',
    align: 'left',
    sortable: false,
    show: true
  },
  {
    text: 'SĐT đăng ký',
    value: 'phone',
    align: 'left',
    sortable: false,
    show: true
  },
  {
    text: 'Trạng thái',
    value: 'status',
    align: 'left',
    sortable: false,
    show: true
  },
  {
    text: '',
    value: 'action',
    align: 'center',
    sortable: false,
    show: true
  }
]
export default {
  components: {
    CardStudentName,
    ContactBookListActions
  },
  props: {
    propHeaders: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      headers: this.propHeaders.length ? this.propHeaders : originHeaders,
      selectedStudent: {},
      search: '',
      configDialog: false,
      configPasswordDialog: false,
      studentTableOptions: {},
      selected: []
    }
  },
  async created() {
    await this.refresh({ _sort: 'contactBook.createdAt:desc' })
  },
  computed: {
    ...mapState('app', ['department']),
    ...mapState('students', ['students', 'totalItems', 'pageText']),

    footerTable() {
      let footer = {
        'items-per-page-text': 'Học sinh mỗi trang',
        'items-per-page-all-text': 'Tất cả',
        'items-per-page': 10,
        'page-text': this.pageText
      }
      if (this.totalItems > 100) {
        footer['items-per-page-options'] = [5, 10, 15, 30]
      }
      return footer
    }
  },
  methods: {
    ...mapActions('students', [
      'requestPageSettings',
      'searchStudents',
      'updateStudent',
      'removeStudents',
      'fetchStudents'
    ]),

    async refresh(query) {
      await this.searchStudents({ department: this.department.id, ...query })
    }
  },
  watch: {
    studentTableOptions: {
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
  filters: {
    getContactBookStatus(item) {
      if (!item.contactBook || !item.contactBook.status) return 'Chưa cài đặt'
      if (item.contactBook.status === 'active') return 'Hoạt động'
      if (item.contactBook.status === 'locked') return 'Đã khóa'
      return 'Chưa cài đặt'
    },
    getContactBookStatusColor(item) {
      if (!item.contactBook || !item.contactBook.status) return 'cancel'
      if (item.contactBook.status === 'active') return 'success'
      if (item.contactBook.status === 'locked') return 'error'
      return 'cancel'
    }
  }
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
