<template>
  <slots-list
    item-key="id"
    :headers="headers"
    :slots="slots"
    :loading="loading"
    loading-text="Đang Tải"
    @change="onDateChanged"
  ></slots-list>
</template>
<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import SlotsList from '@/modules/dashboard/SlotsList.vue'
import moment from 'moment'
export default {
  components: {
    SlotsList
  },
  data () {
    return {
      loading: true,
      headers: [
        {
          text: 'Lớp học',
          value: 'class.code',
          align: 'left',
          sortable: false
        },
        { text: 'Mã buổi học', value: 'code', align: 'left', sortable: true },
        {
          text: 'Giáo Viên',
          value: 'teachers',
          align: 'left',
          sortable: false
        },
        {
          text: 'Thời gian',
          value: 'startTime',
          align: 'left',
          sortable: false
        },
        { text: 'Phân loại', value: 'type', align: 'left', sortable: false },
        { text: 'Trạng thái', value: 'status', align: 'left', sortable: false }
      ],
      slotId: '',
      draw: false,
      search: '',
      status: null,
      statuses: [
        { text: 'Active', value: 'false' },
        { text: 'Blocked', value: 'true' }
      ],
      range: { from: null, to: null },
      previewUserId: null,
      start: moment().startOf('week').toISOString(),
      end: moment().endOf('week').toISOString()
    }
  },
  async created () {},
  computed: {
    ...mapGetters('studentDashboard', ['classes', 'slots']),
    ...mapState('app', ['department']),
    ...mapState('auth', ['user', 'profile'])
  },
  watch: {
    async profile () {
      this.refresh()
    }
  },
  methods: {
    ...mapActions('studentDashboard', ['fetchClasses', 'fetchSlots']),
    onDateChanged ({ start, end } = {}) {
      this.start = moment(start.date).startOf('day').toISOString()
      this.end = moment(end.date).endOf('day').toISOString()
      this.refresh()
    },
    async refresh () {
      if (!this.profile.id) return
      this.loading = true
      await this.fetchClasses({
        department: this.department.id,
        students: this.profile.id
      })
      let query = {
        class_in: this.classes.map((c) => c.id),
        department: this.department.id,
        startTime_gt: this.start,
        startTime_lt: this.end
      }
      await this.fetchSlots(query)
      this.loading = false
    }
  }
}
</script>
