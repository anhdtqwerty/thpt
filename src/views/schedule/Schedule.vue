<template>
  <slots-list
    item-key="id"
    :headers="headers"
    :slots="slots"
    :loading="loading"
    @change="onDateChanged"
    loading-text="Đang Tải"
  ></slots-list>
</template>
<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import SlotsList from '@/modules/dashboard/SlotsList.vue'
import moment from 'moment'
export default {
  components: {
    SlotsList,
  },
  data() {
    return {
      loading: true,
      headers: [
        {
          text: 'Lớp học',
          value: 'class.code',
          align: 'left',
          sortable: false,
        },
        { text: 'Mã buổi học', value: 'code', align: 'left', sortable: true },
        {
          text: 'Giáo Viên',
          value: 'teachers',
          align: 'left',
          sortable: false,
        },
        {
          text: 'Thời gian',
          value: 'startTime',
          align: 'left',
          sortable: false,
        },
        { text: 'Phân loại', value: 'type', align: 'left', sortable: false },
        { text: 'Trạng thái', value: 'status', align: 'left', sortable: false },
      ],
      slotId: '',
      draw: false,
      search: '',
      status: null,
      statuses: [
        { text: 'Active', value: 'false' },
        { text: 'Blocked', value: 'true' },
      ],
      range: { from: null, to: null },
      previewUserId: null,
      start: moment().startOf('week').toISOString(),
      end: moment().endOf('week').toISOString(),
    }
  },
  async created() {
    await this.fetchClasses({
      department: this.department.id,
    })
    this.refresh()
  },
  computed: {
    ...mapGetters('departmentDashboard', ['classes', 'slots']),
    ...mapState('app', ['department']),
    ...mapState('auth', ['user', 'profile']),
  },
  methods: {
    ...mapActions('departmentDashboard', ['fetchClasses', 'fetchSlots']),
    onDateChanged({ start, end } = {}) {
      this.start = start.startOf('day').toISOString()
      this.end = end.endOf('day').toISOString()
      this.refresh()
    },
    async refresh() {
      this.loading = true
      await this.fetchSlots({
        department: this.department.id,
        startTime_gt: this.start,
        startTime_lt: this.end,
      })
      this.loading = false
    },
  },
}
</script>

<style>
.border-right {
  border-right: solid 1px lightgray;
}
</style>
