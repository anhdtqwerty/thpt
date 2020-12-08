<template>
  <v-timeline dense clipped v-if="logs.length">
    <v-timeline-item
        fill-dot
        color="orange"
        :icon="item.icon"
        v-for="(item, i) in data"
        :key="i"
    >
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-subtitle>
            <router-link :to="'/staff/' + item.staff.id ">
              {{item.staff.name}}
            </router-link>
            {{item.action | transformAction}}
          </v-list-item-subtitle>
          <v-list-item-subtitle>
            {{item.timestamp | familiarizeDate}}
          </v-list-item-subtitle>
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
      return this.logs.map(log => {
        return { ...log, icon: this.getIcon(log.action), staff: log.staff || {} }
      }).reverse()
    }
  },
  methods: {
    getIcon (action) {
      if (action === 'update-student') return 'mdi-pencil'
      if (action === 'delete-student') return 'mdi-delete'
      else return 'add'
    }
  },
  filters: {
    transformAction (action) {
      if (action === 'update-student') return 'Đã cập nhật thông tin học viên'
      if (action === 'delete-student') return 'Đã xóa học viên'
      if (action === 'create-student') return 'Đã tạo mới học viên'
      else return ''
    },
    familiarizeDate: (time) => {
      if (!time) {
        return 'None'
      }
      return moment(time).format(' hh:mm Ngày DD/MM')
    }
  }
}
</script>

<style scoped>
  .v-timeline-item, .v-list-item {
    padding: 0
  }

  .v-list-item__subtitle {
    white-space: normal;
  }
</style>
