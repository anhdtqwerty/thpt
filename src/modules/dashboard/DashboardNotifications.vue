<template>
  <v-container>
    <div class="d-flex flex-nowrap container">
      <v-card outlined v-for="post in posts" :key="post.id" class="mr-4 subject elevation-0">
        <v-card-title class="title"
          ><div>
            <div>{{ post.senderMethod | getSenderMethod }} - {{ post.postToType }}</div>
            <p class="text-body-2">{{ post.createdAt | ddmmhhmm }}</p>
          </div>
        </v-card-title>
        <v-card-text class="d-flex">
          <div class="mr-4">
            {{ post.content }}
          </div>
        </v-card-text>
      </v-card>
    </div>
  </v-container>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {},
  props: {
    student: Object
  },
  data() {
    return {}
  },
  async created() {
    await this.fetchNotifications()
  },
  computed: {
    ...mapGetters('Dashboard', ['posts'])
  },
  methods: {
    ...mapActions('Dashboard', ['fetchNotifications'])
  },
  watch: {
    // student: {
    //   handler: 'fetchData',
    //   immediate: true
    // }
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
