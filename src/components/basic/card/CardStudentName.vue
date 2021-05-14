<template>
  <div class="d-flex flex-row flex-nowrap align-center py-2" :key="student.id" @click="$emit('change', student)">
    <div v-if="!$vuetify.breakpoint.mobile" class="image-wrapper mr-2">
      <img :src="avatar" alt="" />
    </div>
    <div>
      <router-link style="text-decoration: none" v-if="link" :to="'/student/' + student.id">
        <div style="white-space: nowrap">
          {{ student.name }}
        </div>
      </router-link>

      <div style="white-space: nowrap" v-else>{{ student.name }}</div>
      <div style="white-space: nowrap">{{ student.code.substring(0, 5) }}</div>
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
    link: Boolean
  },
  computed: {
    avatar() {
      return _.get(this.student, 'avatar.url', '/default-avatar.png')
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
