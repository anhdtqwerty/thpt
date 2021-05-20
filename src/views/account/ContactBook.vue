<template>
  <div class="pa-4">
    <ConfigContactDialog
      :state="configDialog"
      :student="selectedStudent"
      @close="configDialog = false"
    />
    <ConfigPasswordDialog
      :state="configPasswordDialog"
      :student="selectedStudent"
      @close="configPasswordDialog = false"
    />
    <div class="d-flex justify-space-between align-center">
      <div>
        <Breadcrumbs
          headline="Danh sách sổ liên lạc"
          :link="[{ text: 'Sổ liên lạc', href: '../contact-book' }]"
        />
      </div>
      <!-- <div class="flex-center">
        <v-btn v-if="$vuetify.breakpoint.mdAndUp" outlined color="success">
          <v-icon left>mdi-file-excel</v-icon> Xuất Excel
        </v-btn>
      </div> -->
    </div>

    <v-card class="card-border elevation-0 pa-5 mt-4">
      <student-filter @onFilterChanged="onFilterChanged"></student-filter>
    </v-card>

    <v-card class="elevation-1 mt-6">
      <v-data-table
        item-key="id"
        :options.sync="studentTableOptions"
        :server-items-length="totalItems"
        :headers="headers"
        :items="filteredStudents"
        :loading="loading"
        :items-per-page="10"
        :footer-props="{
          itemsPerPageOptions: [5, 10, 15, 20, 30],
        }"
      >
        <template v-slot:[`item.name`]="{ item }">
          <card-student-name :student="item" link />
        </template>
        <template v-slot:[`item.action`]="{ item }">
          <v-menu left offset-x>
            <template v-slot:activator="{ on }">
              <v-btn text v-on="on" icon>
                <v-icon color="primary">mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="configContact(item)">
                <v-list-item-title>Cài đặt sổ</v-list-item-title>
              </v-list-item>
              <v-list-item disabled>
                <v-list-item-title>Xem chi tiết tin đã gửi</v-list-item-title>
              </v-list-item>
              <v-list-item
                @click="unlockContact(item)"
                v-if="item.contact && item.contact.isLocked"
              >
                <v-list-item-title>Gỡ khoá</v-list-item-title>
              </v-list-item>
              <v-list-item @click="lockContact(item)" v-else>
                <v-list-item-title>Khoá sổ</v-list-item-title>
              </v-list-item>
              <v-list-item @click="configPassword(item)">
                <v-list-item-title>Đặt mật khẩu APP</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
        <template v-slot:[`item.senderMethod`]="{ item }">
          <span>{{ item | getSenderMethod }}</span>
        </template>
        <template v-slot:[`item.phone`]="{ item }">
          <span>{{ item | getPhone }}</span>
        </template>
        <template v-slot:[`item.status`]="{ item }">
          <v-chip
            color="error"
            style="width: 105px"
            class="d-flex justify-center"
            v-if="item.contact && item.contact.isLocked"
            >Đã khoá</v-chip
          >
          <v-chip
            color="cancel"
            style="width: 105px"
            v-else-if="
              !item.contact ||
              !item.contact.phones ||
              !item.contact.phones.length === 0
            "
            ><span class="white--text">Chưa cài đặt</span></v-chip
          >
          <v-chip
            color="success"
            style="width: 105px"
            class="d-flex justify-center"
            v-else
            >Hoạt động</v-chip
          >
        </template>
        <template v-slot:[`item.classes`]="{ item }">
          <v-btn
            style="letter-spacing: 0.2px !important"
            class="d-flex justify-start px-0"
            color="primary"
            plain
            >{{ item.classes | getClasses }}</v-btn
          >
        </template>
        <template v-slot:[`item.dob`]="{ item }">
          <span>{{ item | getStudentDob }}</span>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import CardStudentName from '@/components/basic/card/CardStudentName.vue'
import ConfigContactDialog from './ConfigContactDialog.vue'
import ConfigPasswordDialog from './ConfigPasswordDialog.vue'
import StudentFilter from '@/modules/contactBook/ContactBookFilter.vue'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import moment from 'moment'
const originHeaders = [
  {
    text: 'Học sinh',
    value: 'name',
    align: 'left',
    sortable: false,
    show: true,
  },
  {
    text: 'Ngày sinh',
    value: 'dob',
    align: 'left',
    sortable: false,
    show: true,
  },
  { text: 'Lớp', value: 'classes', align: 'left', sortable: false, show: true },
  {
    text: 'Hình thức sử dụng',
    value: 'senderMethod',
    align: 'left',
    sortable: false,
    show: true,
  },
  {
    text: 'SĐT đăng ký',
    value: 'phone',
    align: 'left',
    sortable: false,
    show: true,
  },
  {
    text: 'Trạng thái',
    value: 'status',
    align: 'left',
    sortable: false,
    show: true,
  },
  {
    text: '',
    value: 'action',
    align: 'center',
    sortable: false,
    show: true,
  },
]
export default {
  components: {
    CardStudentName,
    StudentFilter,
    Breadcrumbs,
    ConfigContactDialog,
    ConfigPasswordDialog,
  },
  props: {
    role: String,
  },
  data() {
    return {
      headers: originHeaders,
      originHeaders: originHeaders,
      selectedStudent: {},
      search: '',
      loading: false,
      configDialog: false,
      configPasswordDialog: false,
      studentTableOptions: {},
      filteredStudents: [],
    }
  },
  async created() {
    await this.refresh({})
    this.filteredStudents = this.students
  },
  computed: {
    ...mapState('app', ['department']),
    ...mapState('students', ['totalItems', 'students']),
  },
  methods: {
    ...mapActions('students', [
      'requestPageSettings',
      'searchStudents',
      'updateStudent',
      'removeStudents',
      'fetchStudents',
    ]),
    configContact(item) {
      this.configDialog = true
      this.selectedStudent = item
    },
    configPassword(item) {
      this.configPasswordDialog = true
      this.selectedStudent = item
    },
    async lockContact(item) {
      this.$loading.active = true
      await this.updateStudent({
        id: item.id,
        contact: { ...item.contact, isLocked: true },
      })
      await this.refresh({})
      this.$loading.active = false
    },
    async unlockContact(item) {
      this.$loading.active = true
      await this.updateStudent({
        id: item.id,
        contact: { ...item.contact, isLocked: false },
      })
      await this.refresh({})
      this.$loading.active = false
    },
    async refresh(query) {
      this.loading = true
      await this.searchStudents({ department: this.department.id, ...query })
      this.loading = false
    },
    async onFilterChanged(data) {
      this.$loading.active = true
      await this.refresh({
        grade: data.grade,
        currentClass: data.classes[0].id,
      })
      this.filteredStudents = this.students
      // this.filteredStudents = this.students.filter((student) => {
      //   let isAvailable = true
      //   if (data.studentNameOrCode) {
      //     if (
      //       !student.name.includes(data.studentNameOrCode) &&
      //       !student.code.includes(data.studentNameOrCode)
      //     )
      //       isAvailable = false
      //   } else if (data.status) {
      //     if (data.status === 'inactive' && student.contact) isAvailable = false
      //     else if (
      //       data.status === 'locked' &&
      //       (!student.contact || !student.contact.isLocked)
      //     )
      //       isAvailable = false
      //     else if (
      //       data.status === 'active' &&
      //       (!student.contact || student.contact.phones.length === 0)
      //     )
      //       isAvailable = false
      //   }
      // })
      this.$loading.active = false
    },
  },
  watch: {
    studentTableOptions: {
      handler(newOptions, oldOptions) {
        const itemPerPageChanged =
          newOptions.itemsPerPage !== oldOptions.itemsPerPage
        const pageChanged = newOptions.page !== oldOptions.page
        if (pageChanged || itemPerPageChanged) {
          this.requestPageSettings({
            page: newOptions.page,
            itemsPerPage: newOptions.itemsPerPage,
          })
        }
      },
      deep: true,
    },
    students(students) {
      this.filteredStudents = students
    },
  },
  filters: {
    getClasses(classes) {
      if (classes && classes.length > 0) {
        return classes.map((c) => c.title).join(' ,')
      } else return ''
    },
    getStudentDob(item) {
      if (item.dob) return moment.utc(item.dob).format('DD/MM/YYYY')
      return ''
    },
    getSenderMethod(item) {
      if (!item.contact) return ''
      else if (item.contact && item.contact.isSms && item.contact.isApp)
        return 'APP và SMS'
      return 'SMS'
    },
    getPhone(item) {
      if (!item.contact || !item.contact.phones) return ''
      else if (typeof item.contact.phones === 'string')
        return item.contact.phones
      else return item.contact.phones.join(', ')
    },
  },
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
