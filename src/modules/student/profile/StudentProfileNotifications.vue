<template>
  <v-container>
    <div class="d-flex flex-nowrap container">
      <v-card outlined v-for="notification in notifications" :key="notification.id" class="mr-4 subject elevation-0">
        <v-card-title class="title"
          ><div>
            <div>{{ notification.senderMethod | getSenderMethod }} - {{ notification.postType | getPostType }}</div>
            <div class="text-body-2">{{ notification.createdAt | ddmmhhmm }}</div>
            <div class="text--secondary text-caption">
              {{ notification.staff && notification.staff.name }} <v-icon>mdi-menu-right</v-icon> {{ notification.to }}
            </div>
          </div>
        </v-card-title>
        <v-card-text class="d-flex">
          <div class="mr-4 text--primary">
            <MaxLengthText :text="notification.content" />
          </div>
        </v-card-text>
      </v-card>
    </div>
  </v-container>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import MaxLengthText from '@/components/basic/read-more/MaxLengthText.vue'
import { get } from 'lodash'

export default {
  components: { MaxLengthText },
  props: {
    student: Object
  },
  data() {
    return {}
  },
  async created() {},
  computed: {
    ...mapGetters('student', ['notifications'])
  },
  methods: {
    ...mapActions('student', ['fetchNotifications']),
    async fetchData() {
      if (get(this.student, 'id')) {
        await this.fetchNotifications(this.student)
      }
    }
  },
  watch: {
    student: {
      handler: 'fetchData',
      immediate: true
    }
  }
}
</script>
<style scoped lang="scss">
.title {
  min-width: 300px;
}
.factor-title {
  min-width: 150px;
}
table {
  border-collapse: collapse;
}
tr {
  border-bottom: 1px solid lightgrey;
}
.container {
  overflow-x: auto;
  max-width: 100%;
}
.container::-webkit-scrollbar {
  -webkit-appearance: none;
}
.container::-webkit-scrollbar:horizontal {
  height: 10px;
}
.container::-webkit-scrollbar-thumb {
  border-radius: 8px;
  border: 2px solid white;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
