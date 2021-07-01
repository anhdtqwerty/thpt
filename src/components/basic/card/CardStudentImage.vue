<template>
  <div
    class="d-flex flex-row align-center pa-1"
    style="flex-wrap: wrap"
    :key="student.id"
    @click="$emit('change', student)"
  >
    <div class="image-wrapper mr-5 mb-3">
      <img :src="avatar" alt="" />
    </div>
    <div style="font-size: 18px; color: #000000">
      <router-link v-if="link" :to="'/student/' + student.id">
        <div style="white-space: nowrap">{{ student.name }}</div>
      </router-link>
      <div style="white-space: nowrap" v-else>{{ student.name }}</div>
    </div>
  </div>
</template>
<script>
import { get } from 'lodash'

export default {
  props: {
    student: Object,
    prepend: Object,
    append: Object,
    attendance: Object,
    link: Boolean
  },
  computed: {
    avatar() {
      return get(this.student, 'avatar.url', '/default-avatar.png')
    }
  }
}
</script>

<style lang="scss" scoped>
.image-wrapper {
  width: 140px;
  min-width: 140px;
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    max-width: 100%;
    max-height: 100%;
  }
}
</style>
