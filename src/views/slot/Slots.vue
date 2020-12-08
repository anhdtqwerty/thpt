<template>
  <v-layout>
    <v-flex xs12 sm4 md3>
      <slot-filter @onFilterChanged="refresh" :defaultFilters="{}" />
    </v-flex>
    <v-flex xs12 sm8 md9>
      <slots-table
        class="mt-3"
        item-key="id"
        :headers="headers"
        :slots="slots"
        :loading="loading"
        loading-text="Đang Tải"
        @remove="onRemove"
        @add="onAdd"
        remove
        :count="count"
        @pagination="pagination"
        @onSlotSelected="onSlotSelected"
      >
      </slots-table>
    </v-flex>
    <slot-drawer
      :draw="draw"
      :slotId="this.slotId"
      @onDrawerStateChange="updateDraw"
    ></slot-drawer>
  </v-layout>
</template>
<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import SlotFilter from '@/modules/slot/SlotFilter'
import SlotDrawer from '@/modules/slot/SlotDrawer'
import SlotsTable from '@/modules/slot/SlotsTable'

export default {
  components: {
    SlotDrawer,
    SlotFilter,
    SlotsTable
  },
  data() {
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
      previewUserId: null
    }
  },
  created() {
    this.refresh()
  },
  computed: {
    ...mapGetters('slot', ['slots', 'slot', 'count']),
    ...mapState('app', ['department'])
  },
  methods: {
    ...mapActions('slot', [
      'fetchSlots',
      'setSlots',
      'countSlots',
      'removeSlots'
    ]),
    updateDraw(draw) {
      this.draw = draw
    },
    async pagination(page) {
      this.loading = true
      await this.fetchSlots({
        department: this.department.id,
        _start: page.pageStart,
        _limit: page.itemsPerPage
      })
      this.loading = false
    },
    async preview(user) {
      if (!user) return
      this.$refs.template.preview()
      this.previewUserId = user.id
    },
    onSlotSelected(slot) {
      this.slotId = slot.id
      this.draw = true
    },
    async refresh(query) {
      this.loading = true
      this.setSlots([])
      query = {
        ...query,
        department: this.department.id
      }
      await this.fetchSlots(query)
      this.countSlots(query)
      this.countSlots(query)
      this.loading = false
    },
    onRemove(selected) {
      this.$dialog.confirm({
        title: 'Xóa Buổi Học',
        text: `Xóa buổi học sẽ xóa toàn bộ thông tin điểm danh, chấm công và tính lương của giáo viên. Bạn có Chắc Chắn ?`,
        okText: 'Có',
        cancelText: 'Không',
        done: async () => {
          this.removeSlots(selected)
        }
      })
    },
    onAdd() {}
  }
}
</script>
