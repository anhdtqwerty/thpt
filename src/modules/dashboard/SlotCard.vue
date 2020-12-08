<template>
  <v-card flat>
    <v-card-title class="d-flex">
      <span class="slot__title mr-3">{{ data.class.title }}</span>
      <v-icon style="cursor: pointer" @click="onClickCloseIcon" dark
        >close</v-icon
      >
    </v-card-title>
    <v-card-text class="pa-4">
      <div class="mb-3">
        <v-icon>collections_bookmark</v-icon>
        <router-link :to="'/class/' + data.class.id">
          {{ data.class.code }}
        </router-link>
      </div>
      <div class="mb-3">
        <v-icon>mdi-calendar</v-icon>
        {{ data.startTime | toDate }}
      </div>
      <div class="mb-3">
        <v-icon>mdi-clock-outline</v-icon>
        {{ data.startTime | toTime }} - {{ data.endTime | toTime }}
      </div>
      <div class="mb-3">
        <v-icon>perm_contact_calendar</v-icon>
        <span v-if="data.teachers && data.teachers.length > 0">
          {{ data | getTeacher }}
        </span>

        <span v-else class="text--disabled text-body-2"
          >Không tìm thấy dữ liệu</span
        >
      </div>
      <div>
        <v-icon>mdi-comment-edit</v-icon>
        <span v-if="data.descriptions">
          {{ data.descriptions }}
        </span>
        <span v-else class="text--disabled text-body-2"
          >Không tìm thấy dữ liệu</span
        >
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn text color="primary" :to="'/class/' + data.class.id">Xem</v-btn>
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="onClickAttendance">Điểm Danh</v-btn>

      <class-attendance-dialog
        ref="attendanceDialog"
        :slotData="selectedSlot"
        :classData="classData"
        :attendances="attendances"
      ></class-attendance-dialog>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import moment from 'moment'
import ClassAttendanceDialog from '@/modules/class/attendance/ClassAttendanceDialog'

export default {
  components: {
    ClassAttendanceDialog
  },
  data: () => ({
    loading: false,
    selection: 1,
    attendanceDialogState: false,
    selectedSlot: {}
  }),
  props: { data: Object },
  computed: {
    ...mapState('constant', ['slotStatus', 'slotTypes']),
    ...mapGetters('classDetail', ['classData', 'slots', 'attendances'])
  },
  methods: {
    ...mapActions('classDetail', ['initClass']),
    reserve() {
      this.loading = true
      setTimeout(() => (this.loading = false), 2000)
    },
    onClickCloseIcon() {
      this.$emit('close')
    },
    onClickAttendance() {
      this.initClass({ id: this.data.class.id }).then(res => {
        this.$refs.attendanceDialog.open()
        this.selectedSlot = this.slots.find(item => {
          let format = 'DD/MM/YYYY'
          return (
            moment(item.startTime).format(format) ===
            moment(this.data.startTime).format(format)
          )
        })
      })
    }
  },
  filters: {
    toTime(time) {
      return moment(time).format('HH:mm')
    },
    toDate(time) {
      return moment(time).format('DD/MM/YYYY')
    },
    getTeacher(data) {
      return data.teachers.map(t => t.name).join(',')
    },
    getRoom(data) {
      return data.room ? data.room.title : ''
    }
  }
}
</script>
<style lang="scss" scoped>
.slot__title {
  font-size: 18px;
  line-height: 21px;
  text-transform: uppercase;
  color: #ffffff;
  max-width: 250px;
  word-break: keep-all;
}
::v-deep {
  .v-card__title {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    background-color: #ff5c93;
    padding: 12px 16px !important;
  }
  .v-card__text {
    border-bottom: 1px solid #e0e0e0;
  }
  .v-list-item__subtitle {
    .v-icon {
      font-size: 20px;
      margin-right: 20px;
    }
    a {
      text-decoration: none;
      color: #0d47a1;
      cursor: pointer;
    }
    font-size: 14px;
    line-height: 16px;
    font-weight: bold;
    color: #757575;
    margin-bottom: 16px;
  }
}
</style>
