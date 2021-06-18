<template>
  <v-form ref="form" v-bind="this.$attrs">
    <p class="font-weight-black black--text">1. Thông tin cơ bản</p>
    <v-row class="pr-12">
      <v-col class="d-flex align-center py-0" cols="12">
        <v-subheader class="py-0 px-0">Họ và tên</v-subheader>
        <p class="mb-0">{{ teacher.name }}</p>
      </v-col>
      <v-col class="py-0 align-center d-flex" cols="12">
        <v-subheader class="px-0">Ngày sinh</v-subheader>
        <p class="mb-0">{{ teacher | _get('dob') | ddmmyyyy }}</p>
      </v-col>
      <v-col class="d-flex align-center py-0" cols="12">
        <v-subheader class="px-0">Giới tính</v-subheader>
        <p class="mb-0">{{ teacher.gender | gender }}</p>
      </v-col>
      <v-col class="py-0 align-center d-flex" cols="12">
        <v-subheader class="px-0">Quê quán</v-subheader>
        <p class="mb-0">{{ teacher | _get('metadata.frequentlyAddress') }}</p>
      </v-col>
      <v-col class="py-0 align-center d-flex" cols="12">
        <v-subheader class="px-0">Dân tộc</v-subheader>
        <p class="mb-0">{{ teacher | _get('metadata.ethnic') }}</p>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('teacher', ['teacher'])
  }
}
</script>

<style scoped>
.v-subheader {
  width: 30%;
}
p {
  color: black;
}
.p > .v-input__control > .v-input__slot:before {
  border-style: none;
}
</style>
