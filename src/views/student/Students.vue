<template>
  <div>
    <div class="pa-4 d-flex justify-space-between align-center">
      <div>
        <Breadcrumbs
          headline="Danh sách"
          :link="[
            { text: 'Học sinh' },
            { text: 'Danh sách', href: '../students' },
          ]"
        />
      </div>
      <div class="flex-center">
        <v-btn
          v-if="selected.length"
          dark
          color="amber"
          @click="sendState = !sendState"
          class="mr-2"
        >
          <v-icon left>mdi-message-processing</v-icon>Gửi SMS
        </v-btn>
        <v-btn
          v-if="selected.length"
          dark
          color="red"
          @click.stop="onRemove"
          class="mr-2"
        >
          <v-icon left>mdi-delete</v-icon>Xóa
        </v-btn>
        <v-btn dark color="#0D47A1" @click.stop="createState = !createState">
          <v-icon left>add</v-icon>{{ btnTitle }}
        </v-btn>
      </div>
    </div>

    <v-card class="px-md-6 mx-md-4 elevation-1">
      <v-data-table
        item-key="id"
        :options.sync="studentTableOptions"
        :server-items-length="totalItems"
        :headers="headers"
        :items="students"
        :loading="loading"
        :items-per-page="10"
        :footer-props="{
          itemsPerPageOptions: [5, 10, 15, 20, 30],
        }"
        v-model="selected"
        show-select
      >
        <div slot="top" class="mb-md-6">
          <div class="d-flex justify-end">
            <drop-menu
              :default-headers="originHeaders"
              @change="headers = $event"
              v-if="$vuetify.breakpoint.mdAndUp"
            ></drop-menu>
          </div>
          <div v-if="$vuetify.breakpoint.mdAndUp">
            <student-filter @onFilterChanged="refresh"></student-filter>
          </div>
          <div class="d-flex justify-end">
            <v-btn
              v-if="$vuetify.breakpoint.smAndDown"
              icon
              @click.stop="filterState = !filterState"
            >
              <v-icon>mdi-filter-outline</v-icon>
            </v-btn>
          </div>
        </div>
        <template v-slot:[`item.name`]="{ item }">
          <card-student-name :student="item" link />
        </template>
        <template v-slot:[`item.status`]="{ item }">
          <span v-if="item.status" :class="getColor(item.status)">
            {{ item.status | getStatus }}
          </span>
        </template>
        <template v-slot:[`item.classes`]="{ item }">
          <span v-if="item.classes">{{ item.classes | getClasses }}</span>
        </template>
        <template v-slot:[`item.gender`]="{ item }">{{
          item.gender === 'male'
            ? 'Nam'
            : item.gender === 'female'
            ? 'Nữ'
            : 'Khác'
        }}</template>
        <template v-slot:[`item.action`]="{ item }">
          <student-list-actions :item="item"></student-list-actions>
        </template>
      </v-data-table>
    </v-card>

    <student-filter-dialog
      @onFilterDialogChanged="refresh"
      :state="filterState"
    />
     <student-new-dialog :state="createState" @done="requestPageSettings({})" />
     <student-send-s-m-s-dialog :data="selected" :state="sendState"></student-send-s-m-s-dialog>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import CardStudentName from '@/components/basic/card/CardStudentName.vue'
import StudentFilter from '@/modules/student/StudentFilter'
import DropMenu from '@/modules/student/menu/Menu.vue'
import StudentNewDialog from '@/modules/student/StudentNewDialog'
import StudentFilterDialog from '@/modules/student/StudentFilterDialog'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import StudentListActions from '@/modules/student/StudentListActions'
import StudentSendSMSDialog from '@/modules/sms/StudentSendSMSDialog'

const originHeaders = [
  {
    text: 'Tên học sinh',
    value: 'name',
    align: 'left',
    sortable: false,
    show: true,
  },
  { text: 'Lớp', value: 'classes', align: 'left', sortable: false, show: true },
  {
    text: 'Ngày sinh',
    value: 'dob',
    align: 'left',
    sortable: false,
    show: true,
  },
  {
    text: 'Giới tính',
    value: 'gender',
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
    text: 'Ghi chú',
    value: 'notes',
    align: 'left',
    sortable: false,
    show: true,
  },
  {
    text: 'Hành động',
    value: 'action',
    align: 'left',
    sortable: false,
    show: true,
  },
]
export default {
  components: {
    CardStudentName,
    DropMenu,
    StudentNewDialog,
    StudentFilter,
    StudentFilterDialog,
    Breadcrumbs,
    StudentListActions,
    StudentSendSMSDialog
  },
  props: {
    role: String,
  },
  data() {
    return {
      headers: originHeaders,
      originHeaders: originHeaders,
      draw: false,
      search: '',
      status: null,
      loading: true,
      statuses: [
        { text: 'Active', value: 'false' },
        { text: 'Blocked', value: 'true' },
      ],
      range: { from: null, to: null },
      previewUserId: null,
      ready: false,
      studentTableOptions: {},
      createState: false,
      filterState: false,
      selected: [],
      sendState: false
    }
  },
  async created() {
    await this.refresh({})
  },
  computed: {
    ...mapState('app', ['department']),
    ...mapState('students', ['totalItems', 'students']),
    btnTitle() {
      if (this.$vuetify.breakpoint.smAndDown) {
        return 'Thêm'
      } else {
        return 'Thêm học sinh'
      }
    },
  },
  methods: {
    ...mapActions('students', [
      'requestPageSettings',
      'searchStudents',
      'updateStudent',
      'removeStudents',
      'fetchStudents',
    ]),
    updateDraw(draw) {
      this.draw = draw
    },
    getColor(status) {
      if (status === 'active') return 'green--text'
      if (status === 'reserved') return 'orange--text'
      else return 'gray--text'
    },
    onRemove() {
      this.$dialog.confirm({
        title: 'Xóa Học Sinh',
        text: `Bạn Có chắc muốn xóa những học sinh này.? ${this.selected.length} học sinh đã chọn`,
        okText: 'Có',
        cancelText: 'Không',
        done: async () => {
          await this.removeStudents(this.selected)
          this.selected = []
          this.$emit('removed')
        },
      })
    },
    async refresh(query) {
      this.loading = true
      await this.searchStudents({ department: this.department.id, ...query })
      this.loading = false
    },
    getTuitionStatus(leads) {
      if (!leads) return ''
      return leads
        .map((lead) => {
          return lead.liabilities
        })
        .reduce((a, b) => a + b, 0) >= 0
        ? ''
        : 'Nợ'
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
  },
  filters: {
    getStatus(status) {
      if (status === 'reserved') return 'Bảo Lưu'
      if (status === 'active') return 'Đang học'
      return status
    },
    getClassCount(classes) {
      return classes ? classes.length : 0
    },
    getClasses(classes) {
      if (classes && classes.length > 0) {
        return classes.map((c) => c.title).join(' ,')
      } else return ''
    },
  },
}
</script>
<style scoped>
td {
  white-space: nowrap !important   ;
}
</style>
