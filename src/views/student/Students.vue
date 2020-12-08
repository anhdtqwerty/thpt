<template>
  <div>
    <div class="d-flex justify-space-between align-center ">
      <Breadcrumbs
        data="classData.title"
        headline="Học viên"
        :link="[{ text: 'Danh sách lớp', href: '../classes' }]"
      />

      <student-list-actions
        :selected="selected"
        @removed="selected = []"
        :filter="draw"
        @filter="draw = !draw"
      />
    </div>

    <v-data-table
      flat
      item-key="id"
      show-select
      v-model="selected"
      class="elevation-1"
      :options.sync="studentTableOptions"
      :server-items-length="totalItems"
      :headers="headers"
      :items="students"
      :loading="loading"
      :items-per-page="5"
      :footer-props="{
        itemsPerPageOptions: [5, 10, 15, 20, 30],
      }"
      dense
    >
      <div slot="top" class="px-2">
        <v-col col="12" class="d-flex flex-row-reverse pt-2">
          <drop-menu></drop-menu>
          <setting-table-header
            :default-headers="originHeaders"
            @change="headers = $event"
          />
        </v-col>
        <student-filter @onFilterChanged="refresh"></student-filter>
      </div>
      <template v-slot:item.status="{ item }">
        <v-chip v-if="item.status" small dark :color="getColor(item.status)">{{
          item.status | getStatus
        }}</v-chip>
      </template>
      <template v-slot:item.name="{ item }">
        <card-student-name :student="item" link />
      </template>
      <template v-slot:item.generation="{ item }">
        <span style="white-space: nowrap">{{
          item.generation ? item.generation.code : ''
        }}</span>
      </template>
      <template v-slot:item.tags="{ item }">
        <span style="white-space: nowrap">{{ item.tags }}</span>
      </template>
      <template v-slot:item.classes="{ item }">
        <span>{{ item.classes | getClassCount }}</span>
      </template>
      <template v-slot:item.majors="{ item }">
        <span
          style="white-space: nowrap"
          v-for="(major, index) in item.majors"
          :key="major.id"
        >
          <router-link :to="'/major/' + major.id">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <span v-on="on">{{ major.code }}</span>
              </template>
              <span>{{ major.title }}</span>
            </v-tooltip>
          </router-link>
          <span v-if="index < item.majors.length - 1">{{ ', ' }}</span>
        </span>
      </template>
      <template v-slot:item.gender="{ item }">{{
        item.gender === 'male'
          ? 'Nam'
          : item.gender === 'female'
          ? 'Nữ'
          : 'Khác'
      }}</template>
      <template v-slot:item.rootMajor="{ item }">{{
       getType(item.rootMajor)
      }}</template>
      <template v-slot:item.action="{ item }">
        <v-btn text icon @click="onStudentSelected(item)">
          <v-icon dense>mdi-pencil</v-icon>
        </v-btn>
      </template>
      <template v-slot:item.tuition="{ item }">
        <span style="white-space: nowrap">{{
          getTuitionStatus(item.leads)
        }}</span>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import StudentListActions from '@/modules/student/StudentListActions'
import CardStudentName from '@/components/basic/card/CardStudentName.vue'
import StudentFilter from '@/modules/student/StudentFilter'
import DropMenu from '@/modules/student/menu/Menu.vue'
import Breadcrumbs from '@/components/layout/Breadcrumbs.vue'
import SettingTableHeader from '@/components/basic/table/SettingHeaders'
const originHeaders = [
  { text: 'Tên', value: 'name', align: 'left', sortable: false, show: true },
  { text: 'Mã', value: 'code', align: 'left', sortable: false },
  {
    text: 'Khóa',
    value: 'generation',
    align: 'left',
    sortable: false,
    show: true,
  },
  { text: 'Nhóm', value: 'tags', align: 'left', sortable: false },
  { text: 'Số Lớp', value: 'classes', align: 'left', sortable: false },
  {
    text: 'Chuyên ngành',
    value: 'majors',
    align: 'left',
    sortable: false,
  },
  {
    text: 'Loại',
    value: 'rootMajor',
    align: 'left',
    sortable: false,
    show: true
  },
  { text: 'Giới tính', value: 'gender', align: 'left', sortable: false },
  { text: 'Ngày sinh', value: 'dob', align: 'left', sortable: false },
  { text: 'Học Phí', value: 'tuition', align: 'left', sortable: false },
  {
    text: 'Số Điện Thoại',
    value: 'phone',
    align: 'left',
    sortable: false,
    show: true,
  },
  { text: 'Trạng Thái', value: 'status', align: 'left', sortable: false },
  { text: 'Email', value: 'email', align: 'left', sortable: false },
]
export default {
  components: {
    CardStudentName,
    DropMenu,
    StudentListActions,
    StudentFilter,
    Breadcrumbs,
    SettingTableHeader,
  },
  props: {
    role: String,
  },
  data() {
    return {
      headers: [],
      originHeaders: originHeaders,
      selected: [],
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
    }
  },
  async created() {
    await this.refresh({})
  },
  computed: {
    ...mapState('app', ['department']),
    ...mapState('students', ['totalItems', 'students']),
  },
  methods: {
    ...mapActions('students', ['requestPageSettings', 'searchStudents']),
    updateDraw(draw) {
      this.draw = draw
    },
    getColor(status) {
      if (status === 'active') return 'green'
      if (status === 'reserved') return 'orange'
      else return 'gray'
    },
    getType(type) {
      return type ? type.title : ''
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
      if (status === 'active') return 'Hoạt Động'
      return status
    },
    getClassCount(classes) {
      return classes ? classes.length : 0
    },
  },
}
</script>
<style scoped>
td {
  white-space: nowrap !important   ;
}
</style>
