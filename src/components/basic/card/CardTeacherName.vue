<template>
  <div class="d-flex flex-row flex-nowrap align-center py-2" :key="teacher.id" @click="$emit('change', teacher)">
    <div v-if="!$vuetify.breakpoint.mobile" class="image-wrapper mr-2">
      <img :src="avatar" alt="" />
    </div>
    <div>
      <router-link class="teacher-link" v-if="link" :to="'/teacher/' + teacher.id">
        <div class="teacher-name">{{ teacher.name }}</div>
      </router-link>
      <div style="white-space: nowrap" v-else>{{ teacher.name }}</div>
      <div class="grey--text">{{ teacher.code }}</div>
    </div>
  </div>
</template>
<script>
import { get } from 'lodash'

export default {
  props: {
    teacher: Object,
    prepend: Object,
    append: Object,
    attendance: Object,
    link: Boolean
  },
  computed: {
    avatar() {
      return get(this.teacher, 'avatar.url', '/default-avatar.png')
    }
  }
}
</script>

<style lang="scss" scoped>
.image-wrapper {
  width: 55px;
  min-width: 55px;
  height: 55px;
  display: flex;
  align-items: center;
  border-radius: 4px;
  justify-content: center;
  img {
    max-width: 100%;
    max-height: 100%;
    border-radius: 4px;
  }
}
.teacher-link {
  text-decoration: none !important;
}
</style>
