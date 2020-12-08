<template>
  <v-timeline dense clipped v-if="logs.length">
    <v-timeline-item
      fill-dot
      :color="getColor(item.action)"
      :icon="item.icon"
      v-for="(item, i) in data"
      :key="i"
    >
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-subtitle>
            <router-link :to="'/staff/' + item.staff.id ">{{item.staff.name}}</router-link>
            {{item | transformAction}}
            <router-link
              v-if="item.data.student"
              :to="'/student/' + item.data.student.id "
            >{{item.data.student.name}}</router-link>
          </v-list-item-subtitle>
          <v-list-item-subtitle>{{item.timestamp | familiarizeDate}}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-timeline-item>
  </v-timeline>
  <v-list v-else>
    <v-skeleton-loader type="list-item-three-line"></v-skeleton-loader>
    <v-skeleton-loader type="list-item-three-line"></v-skeleton-loader>
  </v-list>
</template>

<script>
import moment from 'moment'

export default {
  data: () => ({
    events: [],
    input: null,
    nonce: 0
  }),
  props: {
    logs: Array
  },
  computed: {
    data () {
      return this.logs
        .map(log => {
          return {
            ...log,
            icon: this.getIcon(log.action),
            staff: log.staff || {}
          }
        })
        .reverse()
    }
  },
  methods: {
    getIcon (action) {
      if (action === 'update-class') return 'mdi-pencil'
      if (action === 'create-attendance' || action === 'update-attendance') { return 'mdi-bookmark-check' } else return 'add'
    },
    getColor (action) {
      if (action === 'update-class') return 'orange'
      if (action === 'create-attendance' || action === 'update-attendance') { return 'green' }
      if (action === 'delete-class') return 'red'
      else return 'add'
    }
  },
  filters: {
    transformAction (log) {
      if (log.action === 'update-class') return 'Đã cập nhật thông tin lớp học'
      if (log.action === 'delete-class') return 'Đã Xóa lớp học'
      if (
        log.action === 'create-attendance' ||
        log.action === 'update-attendance'
      ) { return 'Đã cập nhật điểm danh học sinh ' } else return ''
    },
    familiarizeDate: time => {
      if (!time) {
        return 'None'
      }
      return moment(time).format(' hh:mm Ngày DD/MM')
    }
  }
}
</script>

<style scoped>
.v-timeline-item,
.v-list-item {
  padding: 0;
}

.v-list-item__subtitle {
  white-space: normal;
}
</style>
