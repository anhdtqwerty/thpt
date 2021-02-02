<template>
  <div>
    <v-card class="mb-3" :flat="$vuetify.breakpoint.smAndDown">
      <v-tabs v-model="tab">
        <v-tab :key="1"> Học sinh</v-tab>
        <v-tab :key="2"> Phụ huynh </v-tab>
        <v-tab :key="3"> Các môn học </v-tab>
        <v-tab :key="4"> Học phí </v-tab>
        <v-tab :key="5"> Thống kê báo cáo </v-tab>
      </v-tabs>
    </v-card>

    <!-- <v-card :flat="$vuetify.breakpoint.smAndDown">
      <v-tabs-items v-model="tab">
        <v-tab-item :key="1">
          <student-general-info :student="student" />
        </v-tab-item>
      </v-tabs-items>
    </v-card> -->
  </div>
</template>

<script>
import StudentGeneralInfo from '@/modules/student/profile/StudentGeneralInfo'

export default {
  data() {
    return {
      tab: null,
    }
  },
  components: {
    StudentGeneralInfo,
  },
  props: {
    student: Object,
  },
}
</script>

<style>
</style>
