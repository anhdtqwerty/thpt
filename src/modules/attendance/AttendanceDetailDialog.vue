<template>
  <v-dialog :fullscreen="$vuetify.breakpoint.smAndDown" v-model="dialog" width="700" height="600" scrollable>
    <v-card>
      <v-card-title class="primary white--text px-4">
        {{ student.name }} - {{ student.code | getStudentCode }}
        <v-spacer></v-spacer>
        <v-btn dark icon>
          <v-icon @click="dialog = false">close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider />
      <AttendanceDetailFilter />
      <AttendanceDetailDataTable :student="student" />
    </v-card>
  </v-dialog>
</template>

<script>
import AttendanceDetailFilter from '@/modules/attendance/AttendanceDetailFilter.vue'
import AttendanceDetailDataTable from '@/modules/attendance/AttendanceDetailDataTable.vue'

export default {
  components: { AttendanceDetailFilter, AttendanceDetailDataTable },
  props: {
    state: Boolean,
    student: Object
  },
  data() {
    return {
      dialog: false
    }
  },
  methods: {},
  computed: {},
  watch: {
    state(state) {
      this.dialog = true
    }
  },
  filters: {}
}
</script>

<style></style>
