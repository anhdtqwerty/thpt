<template>
  <div class="d-flex flex-row flex-nowrap align-center py-1" :key="teacher.id">
    <div v-if="!$vuetify.breakpoint.mobile" class="image-wrapper mr-2">
      <img :src="avatar" alt="" />
    </div>
    <div class="name-text">{{ teacher.name }}</div>
    <div class="item-width ml-2">
      <div class="text--disabled">Ngày sinh</div>
      <div class="item-text">{{ teacher.dob | ddmmyyyy }}</div>
    </div>
    <div class="item-width ml-2" v-if="displayGender">
      <div class="text--disabled">Giới tính</div>
      <div class="item-text">{{ teacher.gender | gender }}</div>
    </div>
    <div class="item-width ml-2" v-else>
      <div class="text--disabled">Mã số</div>
      <div class="item-text">{{ teacher.code | getTeacherCode }}</div>
    </div>
    <div class="item-width mr-2" v-if="displaySubjectGroup">
      <div class="text--disabled">Lĩnh vực</div>
      <div class="item-text">{{ teacher | _get('subjectGroup.title') }}</div>
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
    },
    displaySubjectGroup: {
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
  width: 200px;
}
.name-text {
  width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.item-width {
  width: 100px;
}
.item-text {
  width: 100px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
