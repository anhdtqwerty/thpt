<template>
  <div
    v-if="student && student.id"
    class="d-flex flex-row flex-nowrap align-center py-2"
    @click="$emit('change', student)"
  >
    <div v-if="!$vuetify.breakpoint.mobile" class="image-wrapper mr-2">
      <img :src="avatar" alt="" />
    </div>
    <div>
      <router-link style="text-decoration: none" v-if="link" :to="'/student/' + student.id">
        <div style="white-space: nowrap">
          {{ student.name }}
        </div>
      </router-link>

      <div class="black--text" style="white-space: nowrap" v-else>{{ student.name }}</div>
      <div v-if="isShowCode" style="white-space: nowrap">{{ student.code | getStudentCode }}</div>
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
    link: Boolean,
    isShowCode: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    avatar() {
      return get(this.student, 'avatar.url', '/default-avatar.png')
    }
  },
  methods: {}
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
</style>
