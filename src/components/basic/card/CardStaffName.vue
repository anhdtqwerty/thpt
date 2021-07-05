<template>
  <div v-if="staff" class="d-flex flex-row align-center pa-1" :key="staff.id" @click="$emit('change', staff)">
    <v-avatar class="mr-2" size="36">
      <v-img :src="avatar"></v-img>
    </v-avatar>
    <div>
      <router-link :to="'/staff/' + staff.id">
        <div style="white-space: nowrap !important;">{{ staff.name }}</div>
      </router-link>
    </div>
  </div>
  <div v-else class="d-flex flex-row align-center pa-1">
    <v-avatar class="mr-2" size="36">
      <v-img :src="avatar"></v-img>
    </v-avatar>
    <div>Không có</div>
  </div>
</template>
<script>
import { get } from 'lodash'

export default {
  props: {
    staff: Object,
    prepend: Object,
    append: Object,
    attendance: Object,
    link: Boolean
  },
  computed: {
    avatar() {
      return get(this.staff, 'avatar.url', '/default-avatar.png')
    }
  }
}
</script>

<style scoped></style>
