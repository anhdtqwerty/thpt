<template>
  <v-layout>
    <v-flex xs12 sm4 md3>
      <staff-filter @onFilterChanged="refresh" />
    </v-flex>
    <v-flex xs12 sm8 md9>
      <v-data-table
        item-key="id"
        v-model="selected"
        :headers="headers"
        :items="members"
        :search="search"
        show-select
        class="mt-3"
        @click:row="onStaffSelected"
      >
        <v-layout slot="top">
          <v-flex xs12 sm8 md8 class="px-6">
            <staff-list-actions :selected="selected" />
          </v-flex>
          <v-flex xs12 sm4 md4>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Tìm kiếm nhanh"
              clearable
              dense
              outlined
            />
          </v-flex>
        </v-layout>
        <template v-slot:item.status="{ item }">
          <v-chip :color="getColor(item.status)" dark>{{ item.status }}</v-chip>
        </template>
        <template v-slot:item.name="{ item }">
          <user-item :data="item" :to="'staff/' + item.id"></user-item>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import StaffListActions from '@/modules/staff/StaffListActions'
import UserItem from '@/modules/user/UserItem'
import StaffFilter from '@/modules/staff/StaffFilter'

export default {
  components: {
    UserItem,
    StaffListActions,
    StaffFilter
  },
  props: {
    role: String
  },
  data () {
    return {
      headers: [
        { text: 'Tên', value: 'name', align: 'left', sortable: false },
        { text: 'Vị Trí', value: 'role.name', align: 'left', sortable: true },
        { text: 'Email', value: 'email', align: 'left', sortable: false },
        {
          text: 'Số Điện Thoại',
          value: 'phone',
          align: 'left',
          sortable: false
        },
        { text: 'Trạng Thái', value: 'status', align: 'left', sortable: false }
      ],
      selected: [],
      draw: false,
      search: '',
      status: null,
      statuses: [
        { text: 'Active', value: 'false' },
        { text: 'Blocked', value: 'true' }
      ],
      range: { from: null, to: null },
      previewUserId: null,
      ready: false
    }
  },
  async created () {
    await this.fetchStaffsCount()
    await this.fetchStaffs('?department=' + this.department.id)
  },
  computed: {
    ...mapState('staff', ['staffs', 'count', 'staff']),
    ...mapState('app', ['department']),
    members () {
      return this.staffs.filter(staff => staff.role.name !== 'Teacher')
    },
    filters () {
      return [{ key: 'blocked', value: this.status }]
    }
  },
  methods: {
    ...mapActions('staff', [
      'fetchStaffs',
      'fetchStaffsCount',
      'setStaff',
      'setStaffs'
    ]),
    updateDraw (draw) {
      this.draw = draw
    },
    async preview (user) {
      if (!user) return
      this.$refs.template.preview()
      this.previewUserId = user.id
    },
    onStaffSelected (staff) {
      this.setStaff(staff)
      this.draw = true
    },
    getColor (status) {
      if (status === 'active') return 'green'
      else return 'red'
    },
    refresh (query) {
      this.setStaffs([])
      this.fetchStaffs('?department=' + this.department.id + '&' + query)
    }
  }
}
</script>
