<template>
  <v-form ref="form" v-bind="this.$attrs">
    <p class="font-weight-black black--text">5. Ghi chú về giáo viên</p>
    <v-row class="pr-12">
      <v-col class="py-0" cols="12">
        <v-subheader class="pa-0">Ghi chú</v-subheader>
        <p class="mt-0">
          {{ teacher | _get('notes') }}
        </p>
      </v-col>
      <v-col class="d-flex align-center py-0" cols="12">
        <v-subheader class="px-0">Ngày vào Đội</v-subheader>
        <p class="mb-0">{{ teacher | _get('metadata.youngJoinedDate') | ddmmyyyy }}</p>
      </v-col>
      <v-col class="d-flex align-center py-0" cols="12">
        <v-subheader class="px-0">Ngày vào Đoàn</v-subheader>
        <p class="mb-0">{{ teacher | _get('metadata.communistJoinedDate') | ddmmyyyy }}</p>
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
p {
  color: black;
}
</style>
