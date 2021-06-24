<template>
  <v-form ref="form" v-bind="this.$attrs">
    <p class="font-weight-black black--text">3. Thông tin liên lạc</p>
    <v-row class="pr-12">
      <v-col class="d-flex align-center py-0" cols="12">
        <v-subheader class="px-0">Địa chỉ</v-subheader>
        <p class="mb-0">{{ teacher.address }}</p>
      </v-col>
      <v-col class="py-0 align-center d-flex" cols="12">
        <v-subheader class="px-0">Ngày sinh</v-subheader>
        <p class="mb-0">{{ teacher | _get('dob') | ddmmyyyy }}</p>
      </v-col>
      <v-col class="d-flex align-center py-0" cols="12">
        <v-subheader class="px-0">Tỉnh/thành phố</v-subheader>
        <p class="mb-0">{{ teacher | _get('metadata.province') }}</p>
      </v-col>
      <v-col class="d-flex align-center py-0" cols="12">
        <v-subheader class="px-0">Quận/huyện</v-subheader>
        <p class="mb-0">{{ teacher | _get('metadata.district') }}</p>
      </v-col>
      <v-col class="d-flex align-center py-0" cols="12">
        <v-subheader class="px-0">Số điện thoại</v-subheader>
        <p class="mb-0">{{ teacher.phone }}</p>
      </v-col>
      <v-col class="d-flex align-center py-0" cols="12">
        <v-subheader class="px-0">Email</v-subheader>
        <p class="mb-0">{{ teacher.email }}</p>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { mapState } from 'vuex'
export default {
  created() {},
  computed: {
    ...mapState('teacher', ['teacher'])
  }
}
</script>

<style scoped>
p {
  color: black;
}
.v-subheader {
  width: 30%;
}
</style>
