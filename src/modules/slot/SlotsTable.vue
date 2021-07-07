<template>
  <v-data-table
    v-bind="this.$attrs"
    item-key="id"
    :headers="headers"
    :items="slots"
    loading-text="Đang Tải"
    :server-items-length="count"
    :page="page"
    :items-per-page="10"
    @pagination="pagination"
    :search="search"
    class="mt-3"
  >
    <template v-slot:[`item.status`]="{ item }">
      <v-chip :color="getColor(item.status)" dark>{{ item.status | status }}</v-chip>
    </template>
    <template v-slot:[`item.class.code`]="{ item }">
      <router-link style="text-decoration: none" :to="'/class/' + item.class.id">{{ item.class.code }}</router-link>
    </template>
    <template v-slot:[`item.teachers`]="{ item }">
      <user-item :teacher="item.teachers[0]" :to="'teacher/' + item.id"></user-item>
    </template>
    <template v-slot:[`item.room`]="{ item }">
      <span>{{ item.room | getRoom }}</span>
    </template>
    <template v-slot:[`item.monters`]="{ item }">
      <user-item :teacher="item.mentors[0]" :to="'teacher/' + item.id"></user-item>
    </template>
    <template v-slot:[`item.startTime`]="{ item }">{{ $moment(item.startTime).format('HH:mm') }}</template>
    <template v-slot:[`item.startTimeDate`]="{ item }">{{ item.startTimeDate }}</template>
    <template v-slot:[`item.type`]="{ item }">{{ item.type | type }}</template>
    <template v-slot:[`item.attendances`]="{ item }">
      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <v-btn icon @click="onCheckAttendance(item)">
            <v-icon>mdi-account-check</v-icon>
          </v-btn>
        </template>
        <span>{{ 'Bấm Vào để Điểm Danh' }}</span>
      </v-tooltip>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <slot-list-actions :selected="item" @edit="onEdit" />
    </template>
  </v-data-table>
</template>
<script>
import { mapState } from 'vuex'
import SlotListActions from '@/modules/slot/SlotListActions'
import UserItem from '@/components/basic/card/CardTeacherName'

export default {
  components: {
    UserItem,
    SlotListActions
  },
  props: {
    slots: Array,
    count: Number,
    add: Boolean,
    headers: Array
  },
  data() {
    return {
      page: 1,
      search: ''
    }
  },
  computed: {
    ...mapState('app', ['staffs']),
    ...mapState('constant', ['slotStatus', 'slotTypes'])
  },
  methods: {
    async pagination(page) {
      this.$emit('pagination', page)
    },
    onEdit(selected) {
      this.$emit('edit', selected)
    },
    onCheckAttendance(item) {
      this.$emit('onCheckAttendance', item)
    },
    getColor(status) {
      if (status === 'opened') return 'orange'
      if (status === 'running') return 'green'
      if (status === 'rejected') return 'red'
      if (status === 'canceled') return 'gray'
      if (status === 'done') return 'gray'
      else return 'orange'
    }
  },
  filters: {
    status(status) {
      if (status === 'opened') {
        return 'Chờ điểm danh'
      } else if (status === 'running') {
        return 'Đã điểm danh'
      } else if (status === 'done') {
        return 'Hoàn Thành'
      } else if (status === 'rejected') {
        return 'Bị từ chối'
      } else if (status === 'canceled') {
        return 'Đã Hủy'
      } else {
        return 'Chờ điểm danh'
      }
    },
    type(type) {
      if (type === 'class-slot') {
        return 'Lớp Học'
      } else {
        return 'Dạy Bù'
      }
    },
    getRoom(room) {
      if (room) {
        return room.title
      }
    }
  }
}
</script>
