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

    <v-card :flat="$vuetify.breakpoint.smAndDown">
      <v-tabs-items v-model="tab">
        <v-tab-item :key="1">
          <v-card>
            <div class="d-flex align-center">
              <v-card-title>Danh sách học sinh trong lớp </v-card-title>
              <v-spacer />
              <drop-menu class="mr-2" @add-new-student="dialog = !dialog" />
            </div>
            <student-table
              disableSort
              mobile-breakpoint="0"
            />
          </v-card>
        </v-tab-item>
        <v-tab-item :key="2">
          <v-card>
            <div class="d-flex align-center">
              <v-card-title>Danh sách phụ huynh </v-card-title>
              <v-spacer />
              <drop-menu class="mr-2" @add-new-student="dialog = !dialog" />
            </div>
            <student-table
              disableSort
              mobile-breakpoint="0"
            />
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script>
import StudentTable from '@/modules/class/student/StudentTable.vue'

export default {
  data() {
    return {
      tab: null,
    }
  },
  components: {
    StudentTable,
  },
  props: {
    classData: Object,
  },
  methods:{
  }
}
</script>

<style>
</style>
