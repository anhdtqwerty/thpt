<template>
  <v-form ref="form" v-bind="this.$attrs">
    <p class="font-weight-black black--text">2. Thông tin tại trường</p>
    <v-row class="pr-12">
      <v-col class="d-flex align-center py-0" cols="12">
        <v-subheader class="py-0 px-0">Loại cán bộ</v-subheader>
        <p class="mb-0">{{ teacher.type | teacherType }}</p>
      </v-col>
      <v-col class="d-flex align-center py-0" cols="12">
        <v-subheader class="px-0">Năm vào trường</v-subheader>
        <p class="mb-0">{{ teacher | _get('metadata.schoolDate') }}</p>
      </v-col>
      <v-col class="py-0 align-center d-flex" cols="12">
        <v-subheader class="px-0">Trạng thái hiện tại</v-subheader>
        <p class="mb-0">{{ teacher.status | teacherStatus }}</p>
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
