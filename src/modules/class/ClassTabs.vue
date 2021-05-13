<template>
  <div>
    <v-card class="mb-3" :flat="$vuetify.breakpoint.smAndDown">
      <v-tabs v-model="tab">
        <v-tab :key="1"> Học sinh</v-tab>
        <v-tab :key="2"> Phụ huynh </v-tab>
        <v-tab :key="3"> Giáo viên </v-tab>
        <v-tab :key="4"> Thống kê báo cáo </v-tab>
      </v-tabs>
    </v-card>

    <v-card :flat="$vuetify.breakpoint.smAndDown">
      <v-tabs-items v-model="tab">
        <v-tab-item :key="1">
          <v-card>
            <div class="d-flex justify-end align-end ">
              <v-btn v-if="$vuetify.breakpoint.mdAndUp" class="mt-4 mr-4" outlined color="primary">
                <v-icon left>mdi-file-excel</v-icon> Xuất Excel
              </v-btn>
            </div>
            <student-table disableSort mobile-breakpoint="0" />
          </v-card>
        </v-tab-item>
        <v-tab-item :key="2">
          <v-card>
            <div class="d-flex justify-end align-end ">
              <v-btn v-if="$vuetify.breakpoint.mdAndUp" class="mt-4 mr-4" outlined color="primary">
                <v-icon left>mdi-file-excel</v-icon> Xuất Excel
              </v-btn>
            </div>
            <ParentDataTable disableSort mobile-breakpoint="0" />
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script>
import StudentTable from '@/modules/class/student/StudentTable.vue'
import ParentDataTable from '@/modules/class/ParentDataTable.vue'
export default {
  data() {
    return {
      tab: null
    }
  },
  components: {
    StudentTable,
    ParentDataTable
  },
  props: {
    classData: Object
  },
  methods: {}
}
</script>

<style></style>
