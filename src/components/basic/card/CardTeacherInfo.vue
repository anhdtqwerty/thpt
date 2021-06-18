<template>
  <div class="d-flex flex-row flex-nowrap align-center py-1" :key="teacher.id">
    <div v-if="!$vuetify.breakpoint.mobile" class="image-wrapper mr-2">
      <img :src="avatar" alt="" />
    </div>
    <div class="name-width">
      <div style="white-space: nowrap">{{ teacher.name }}</div>
    </div>
    <div class="dob-width ml-2">
      <div class="text--disabled" style="white-space: nowrap">Ngày sinh</div>
      <div style="white-space: nowrap">{{ teacher.dob | ddmmyyyy }}</div>
    </div>
    <div class="mx-2" v-if="displayGender">
      <div class="text--disabled" style="white-space: nowrap">Giới tính</div>
      <div style="white-space: nowrap">{{ teacher.gender | gender }}</div>
    </div>
    <div class="mx-2" v-else>
      <div class="text--disabled" style="white-space: nowrap">Mã số</div>
      <div style="white-space: nowrap">{{ teacher.code | getTeacherCode }}</div>
    </div>
  </div>
</template>
<script>
import { get } from 'lodash'

export default {
  props: {
    teacher: Object,
    displayGender: {
      default: false,
      type: Boolean
    }
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
  width: 45px;
  min-width: 45px;
  height: 45px;
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
.name-width {
  min-width: 150px;
}
.dob-width {
  min-width: 100px;
}
</style>
