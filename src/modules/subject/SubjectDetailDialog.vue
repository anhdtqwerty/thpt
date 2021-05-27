<template>
  <v-dialog v-model="dialog" width="600px" :fullscreen="$vuetify.breakpoint.smAndDown">
    <v-card>
      <v-card-title class="blue darken-4 white--text text-uppercase"
        >HỒ SƠ CHI TIẾT MÔN HỌC
        <v-spacer />
        <v-icon color="white" @click="cancel">close</v-icon>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="pt-5">
        <v-row class="pb-5">
          <v-col class="pb-0" cols="4"> Tên môn </v-col>
          <v-col class="pb-0 black--text" cols="8">
            <label>{{ subject.title }}</label></v-col
          >
        </v-row>
        <v-row class="pb-5">
          <v-col class="pb-0" cols="4"> Khối</v-col>
          <v-col class="pb-0 black--text" cols="8">
            <label>{{ subject && subject.grade && subject.grade.gradeNumber }}</label></v-col
          >
        </v-row>
        <v-row class="pb-5">
          <v-col class="pb-0" cols="4"> Ban </v-col>
          <v-col class="pb-0 black--text" cols="8">
            <label dark>{{ subject.division && subject.division.title }}</label></v-col
          >
        </v-row>
        <v-row class="pb-5">
          <v-col class="pb-0" cols="4"> Hệ số tổng kết</v-col>
          <v-col class="pb-0 black--text" cols="8">
            <label>{{ subject.multiply }}</label></v-col
          >
        </v-row>
        <v-row class="pb-5">
          <v-col class="pb-0" cols="4"> Đánh giá theo</v-col>
          <v-col class="pb-0 black--text" cols="8">
            <label>{{ subject.markType | getMarkType }}</label></v-col
          >
        </v-row>
        <v-row class="pb-5">
          <v-col class="pb-0" cols="4"> Số tiết tối đa trên tuần</v-col>
          <v-col class="pb-0 black--text" cols="8">
            <label>{{ subject && subject.data | minWeeklyLesson }}</label></v-col
          >
        </v-row>

        <v-row class="pb-5">
          <v-col class="pb-0" cols="4"> Số tiết tối thiểu trên tuần</v-col>
          <v-col class="pb-0 black--text" cols="8">
            <label>{{ subject && subject.data | maxWeeklyLesson }}</label></v-col
          >
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="d-flex justify-end pa-6">
        <v-btn class="px-6" dark depressed outlined color="#0D47A1" :loading="loading" @click="editSubjectProfile"
          >Sửa hồ sơ môn</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapState } from 'vuex'
import _ from 'lodash'

export default {
  components: {},
  props: {
    state: Boolean
  },
  data() {
    return {
      dialog: false,
      loading: false
    }
  },
  computed: {
    ...mapState('subjects', ['subject'])
  },

  methods: {
    async editSubjectProfile() {
      this.$emit('editSubjectProfile')
      this.dialog = false
    },
    cancel() {
      this.dialog = false
    }
  },
  watch: {
    state(state) {
      this.dialog = true
    }
  },
  filters: {
    getMarkType(type) {
      if (type === 'mark') return 'Điểm số'
      return 'Đánh giá'
    },
    minWeeklyLesson(data) {
      return _.isEmpty(data && data.minWeeklyLesson) ? 0 : data.minWeeklyLesson
    },
    maxWeeklyLesson(data) {
      return _.isEmpty(data && data.maxWeeklyLesson) ? 0 : data.maxWeeklyLesson
    }
  }
}
</script>
