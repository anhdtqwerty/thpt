<template>
  <div
    class="d-flex flex-row flex-nowrap align-center pa-1"
    :key="student.id"
    @click="$emit('change', student)"
  >
    <div v-if="!$vuetify.breakpoint.mobile" class="image-wrapper mr-5">
      <img :src="avatar" alt="" />
    </div>
    <div>
      <router-link v-if="link" :to="'/student/' + student.id">
        <div style="white-space: nowrap; text-decoration: none">
          {{ student.name }}
        </div>
      </router-link>

      <div style="white-space: nowrap" v-else>{{ student.name }}</div>
      <div style="white-space: nowrap">{{ student.code }}</div>
    </div>
  </div>
</template>
<script>
import _ from 'lodash'

export default {
  props: {
    student: Object,
    prepend: Object,
    append: Object,
    attendance: Object,
    link: Boolean,
  },
  computed: {
    avatar() {
      return _.get(this.student, 'avatar.url', '/default-avatar.png')
    },
  },
}
</script>

<style lang="scss" scoped>
.image-wrapper {
  width: 60px;
  min-width: 60px;
  height: 60px;
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
