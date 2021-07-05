<template>
  <div :to="to" class="d-flex flex-row align-center">
    <v-avatar class="my-2 mr-2" size="34">
      <v-img :src="avatar" />
    </v-avatar>
    <div class="staff-name" v-html="data.name"></div>
  </div>
</template>

<script>
import { get } from 'lodash'
export default {
  props: {
    to: String,
    data: {
      type: [Object],
      default: () => {}
    }
  },
  computed: {
    avatar() {
      return get(this.data, 'avatar.url', '/default-avatar.png')
    }
  }
}
</script>
<style scoped>
.staff-name {
  white-space: nowrap;
}
</style>
