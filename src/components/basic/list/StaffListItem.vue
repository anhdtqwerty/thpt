<template>
  <v-layout :to="to">
    <v-avatar class="ma-2" size="34">
      <v-img :src="avatar" />
    </v-avatar>
    <div class="pa-1">
      <v-list-item-title v-html="data.name"></v-list-item-title>
      <v-list-item-subtitle v-html="data.code"></v-list-item-subtitle>
    </div>
  </v-layout>
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
<style scoped></style>
