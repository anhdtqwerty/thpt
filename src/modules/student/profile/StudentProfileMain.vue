<template>
  <div>
    <v-row>
      <v-col cols="12">
        <v-card outlined>
          <v-card-title>
            <v-icon color="primary">mdi-clipboard-text</v-icon>
            <span class="ml-2 text-subtitle-2">Học tập</span>
            <v-spacer></v-spacer>
            <v-btn color="primary" text>Xem chi tiết</v-btn>
          </v-card-title>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card outlined>
          <v-card-title>
            <v-icon color="primary">mdi-calendar-account</v-icon>
            <span class="ml-2 text-subtitle-2">Chuyên cần</span>
            <v-spacer></v-spacer>
            <v-btn color="primary" text>Xem chi tiết</v-btn>
          </v-card-title>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card outlined>
          <v-card-title>
            <v-icon color="primary">mdi-star</v-icon>
            <span class="ml-2 text-subtitle-2">Khen thưởng kỷ luật</span>
            <v-spacer></v-spacer>
            <v-btn color="primary" text>Xem chi tiết</v-btn>
          </v-card-title>
          <v-card-text class="px-0">
            <violation-data-table :violations="violations" />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card outlined>
          <v-card-title>
            <v-icon color="primary">mdi-bell-ring</v-icon>
            <span class="ml-2 text-subtitle-2">Tin nhắn, thông báo gần đây</span>
            <v-spacer></v-spacer>
            <v-btn color="primary" text>Xem chi tiết</v-btn>
          </v-card-title>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card outlined>
          <v-card-title>
            <v-icon color="primary">mdi-laptop</v-icon>
            <span class="ml-2 text-subtitle-2">Học tập online</span>
            <v-spacer></v-spacer>
            <v-btn color="primary" text>Xem chi tiết</v-btn>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ViolationDataTable from '@/modules/violation/ViolationDataTable'
import { mapActions, mapState, mapGetters } from 'vuex'

export default {
  data() {
    return {
      tab: null,
    }
  },
  components: {
    ViolationDataTable,
  },
  props: {
    student: Object,
  },
  computed: {
    ...mapState('violation', ['violations']),
    ...mapGetters('attendance', ['attendances']),
  },
  async created() {
    await this.fetchViolation({ student: this.student.id })
    await this.fetchAttendances({ student: this.student.id })
  },
  methods: {
    ...mapActions('violation', ['fetchViolation']),
    ...mapActions('attendance', ['fetchAttendances']),
  },
}
</script>

<style>
</style>
