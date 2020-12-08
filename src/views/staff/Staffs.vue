<template>
  <div>
    <new-staff-dialog :state="createState" />

    <v-row class="mx-2 justify-space-between justify-align-center">
      <v-col cols="8" class="md-6 px-0 py-2">
        <h2>Nhân viên</h2>
        <breadcrumbs />
      </v-col>

      <v-col cols="4" class="text-right md-6 px-0">
        <v-btn medium color="success" @click="createState = !createState">
          <v-icon left>add</v-icon>
          <span>{{ titleBtn }}</span>
        </v-btn>
      </v-col>
    </v-row>

    <v-card class="px-md-6 py-md-2 px-2 mx-md-2">
      <v-data-table
        item-key="id"
        :headers="headers"
        :items="members"
        :search="search"
        class="mt-3"
        :loading="isLoading"
      >
        <template v-slot:top>
          <v-row>
            <v-col cols="11" md="12" class="text-right">
              <setting-table-header
                :default-headers="originHeaders"
                @change="headers = $event"
              />
              <KebapMenu v-if="!$vuetify.breakpoint.xs">
                <v-list>
                  <v-list-item>
                    <export-excel :custom-header="headers" api="/staffs/" />
                  </v-list-item>
                </v-list>
              </KebapMenu>
            </v-col>

            <v-col cols="1" md="12">
              <staff-filter @onFilterChanged="refresh"> </staff-filter>
            </v-col>
          </v-row>
        </template>

        <template v-slot:[`item.name`]="{ item }">
          <user-item :data="item"></user-item>
        </template>

        <template v-slot:[`item.role.name`]="{ item }">
          <div class="staff-department">{{ item.department.title }}</div>
        </template>

        <template v-slot:[`item.status`]="{ item }">
          <v-chip label :color="getColor(item.status)" dark>{{
            item.status
          }}</v-chip>
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <staff-list-actions :item="item"></staff-list-actions>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import StaffListActions from '@/modules/staff/StaffListActions'
import UserItem from '@/modules/user/UserItem'
import StaffFilter from '@/modules/staff/StaffFilter'
import Breadcrumbs from '@/components/basic/Breadcrumbs'
import NewStaffDialog from '@/modules/staff/NewStaffDialog'
import KebapMenu from '@/components/basic/menu/KebapMenu.vue'
import SettingTableHeader from '@/components/basic/table/SettingHeaders'
import ExportExcel from '@/components/basic/ExportExcel'
const originHeaders = [
  { text: 'Tên', value: 'name', align: 'left', sortable: false, show: true },
  { text: 'Email', value: 'email', align: 'left', sortable: false, show: true },
  {
    text: 'Số Điện Thoại',
    value: 'phone',
    align: 'left',
    sortable: false,
    show: true,
  },
  {
    text: 'Trạng Thái',
    value: 'status',
    align: 'left',
    sortable: false,
    show: true,
  },
  { text: 'Hành động', value: 'actions', show: true },
]

export default {
  components: {
    UserItem,
    StaffListActions,
    StaffFilter,
    Breadcrumbs,
    NewStaffDialog,
    KebapMenu,
    SettingTableHeader,
    ExportExcel,
  },
  props: {
    role: String,
  },
  data() {
    return {
      headers: [],
      originHeaders: originHeaders,
      draw: false,
      search: '',
      status: null,
      range: { from: null, to: null },
      previewUserId: null,
      ready: false,
      isLoading: false,
      createState: false,
    }
  },
  created() {
    this.isLoading = true
    this.fetchStaffsCount()
    this.fetchStaffs('?department=' + this.department.id).then(() => {
      this.isLoading = false
    })
  },
  computed: {
    ...mapState('staff', ['staffs', 'count', 'staff']),
    ...mapState('app', ['department']),
    members() {
      return this.staffs
    },
    titleBtn() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
        case 'sm':
          return 'Thêm'
        default:
          return 'Thêm Nhân Viên'
      }
    },
    filters() {
      return [{ key: 'block', value: this.status }]
    },
  },
  methods: {
    ...mapActions('staff', [
      'fetchStaffs',
      'fetchStaffsCount',
      'setStaff',
      'setStaffs',
      'updateStaffs',
    ]),
    updateDraw(draw) {
      this.draw = draw
    },
    async preview(user) {
      if (!user) return
      this.$refs.template.preview()
      this.previewUserId = user.id
    },
    getColor(status) {
      if (status === 'active') return 'green'
      else return 'red'
    },
    refresh(query) {
      this.isLoading = true
      // if (query.includes('name_in=undefined')) {
      //   this.fetchStaffs('?department=' + this.department.id).then(()=>{
      //     this.isLoading = false
      //   })
      // } else {
      this.fetchStaffs('?department=' + this.department.id + '&' + query).then(
        () => {
          this.isLoading = false
        }
      )
    },
    // }
  },
}
</script>

<style scoped>
.staff-department {
  white-space: nowrap;
}
</style>
