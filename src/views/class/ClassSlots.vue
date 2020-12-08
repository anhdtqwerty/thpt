<template>
  <div :class="{ 'px-3': $vuetify.breakpoint.mdAndUp }">
    <slot-new-dialog :state="slotNewDialog" :classData="classData" />
    <slot-drawer
      v-if="slotInfoDialog"
      :state="slotInfoDialog"
      :slotData="selectedSlot"
      @onDrawerStateChange="updateInfoDialog"
    ></slot-drawer>
    <v-row class="px-1">
      <v-col>
        <Breadcrumbs
          :class="{ 'px-2': $vuetify.breakpoint.smAndDown }"
          v-if="classData"
          :data="classData.title"
          headline="Lịch học"
          :link="[
            { text: 'Danh sách lớp', href: '../../../classes' },
            {
              text: classData.title,
              id: classData.id,
              href: `../../class/${classData.id}`,
            },
            { text: 'Lịch học' },
          ]"
        />
      </v-col>
      <v-col class="d-flex justify-end">
        <v-btn :class="{ 'mt-4': $vuetify.breakpoint.mdAndUp }" color="success" @click="onAdd"
          ><v-icon left>add</v-icon>{{ addButtonText }}</v-btn
        >
      </v-col>
    </v-row>

    <v-card elevation="1" class="mt-3">
      <slots-table
        class="px-4 mt-n2"
        item-key="id"
        :headers="headers"
        :slots="slotData"
        :loading="loading"
        loading-text="Đang Tải"
        @edit="onEdit"
        @add="onAdd"
        disableSort
        add
      ></slots-table>
    </v-card>
  </div>
</template>
<script>
import Breadcrumbs from '@/components/layout/Breadcrumbs.vue'
import { mapActions, mapState, mapGetters } from 'vuex'
import SlotDrawer from '@/modules/class/slot/SlotDrawer'
import SlotsTable from '@/modules/slot/SlotsTable'
import SlotNewDialog from '@/modules/class/slot/SlotNewDialog'
import moment from 'moment'
export default {
  components: {
    SlotDrawer,
    SlotNewDialog,
    SlotsTable,
    Breadcrumbs
  },

  data() {
    return {
      loading: false,
      headers: [
        {
          text: 'Thời gian',
          value: 'startTime',
          align: 'left',
          sortable: false
        },
        {
          text: 'Ngày',
          value: 'startTimeDate',
          align: 'left',
          sortable: false
        },
        { text: 'Phòng học', value: 'room', align: 'left', sortable: true },
        { text: 'Giáo viên', value: 'teachers', align: 'left', sortable: true },
        { text: 'Hành động', value: 'actions', align: 'left', sortable: true }
      ],
      selectedSlot: {},
      search: '',
      slotNewDialog: false,
      slotInfoDialog: false,
      status: null,
      defaultFilters: {
        class: this.classData
      },
      filters: {},
      count: 0
    }
  },
  async created() {
    const classId = this.$route.params.id
    this.refresh()
    this.initClass({ id: classId })
  },
  computed: {
    ...mapGetters('classDetail', [
      'classData',
      'slots',
      'classList',
      'attendances'
    ]),
    ...mapState('constant', ['slotStatus']),
    ...mapState('app', ['department']),
    slotData() {
      return this.slots.map((s) => {
        let startTimeDate = moment(s.startTime).format('dddd, DD/MM')
        return {
          ...s,
          startTimeDate: this.replaceDatetime(startTimeDate)
        }
      })
    },
    addButtonText() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
        case 'sm':
          return 'Thêm'
        default:
          return 'Thêm buổi học'
      }
    }
  },

  methods: {
    ...mapActions('classDetail', ['fetchSlots', 'setSlots', 'initClass']),
    updateInfoDialog(slotInfoDialog) {
      this.slotInfoDialog = slotInfoDialog
    },
    refresh(query) {
      this.filters = query || {}
    },
    onAdd() {
      this.slotNewDialog = !this.slotNewDialog
    },
    onEdit(selected) {
      this.selectedSlot = selected
      this.slotInfoDialog = !this.slotInfoDialog
    },
    replaceDatetime(startTimeDate) {
      return startTimeDate
        .replace('thứ hai', 'Thứ 2')
        .replace('thứ ba', 'Thứ 3')
        .replace('thứ tư', 'Thứ 4')
        .replace('thứ năm', 'Thứ 5')
        .replace('thứ sáu', 'Thứ 6')
        .replace('thứ bảy', 'Thứ 7')
        .replace('chủ nhật', 'CN')
    }
  }
}
</script>
