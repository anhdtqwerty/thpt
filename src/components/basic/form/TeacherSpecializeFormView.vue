<template>
  <v-form ref="form" v-bind="this.$attrs">
    <p class="font-weight-black black--text">4. Thông tin chuyên môn</p>
    <v-row class="pr-12">
      <v-col class="d-flex align-center py-0" cols="12">
        <v-subheader class="py-0 px-0">Trình độ</v-subheader>
        <p class="mb-0">{{ teacher | _get('metadata.level') | teacherLevel }}</p>
      </v-col>
      <v-col class="d-flex align-center py-0" cols="12">
        <v-subheader class="px-0">Lĩnh vực</v-subheader>
        <p class="mb-0">{{ teacher | _get('subjectGroup.title') }}</p>
      </v-col>
      <v-col class="d-flex align-center py-0" cols="12">
        <v-subheader class="px-0">Nơi đào tạo</v-subheader>
        <p class="mb-0">{{ teacher | _get('metadata.trainingPlace') }}</p>
      </v-col>
      <v-col class="py-0 align-center d-flex" cols="12">
        <v-subheader class="px-0">Năm vào ngành</v-subheader>
        <p class="mb-0">{{ teacher | _get('metadata.majorDate') }}</p>
      </v-col>
      <v-col class="py-0 align-center d-flex" cols="12">
        <v-subheader class="px-0">Năm kinh nghiệm</v-subheader>
        <p class="mb-0">{{ teacher | getExperienceYears }}</p>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { mapState } from 'vuex'
import { get } from 'lodash'
export default {
  data: () => ({}),
  computed: {
    ...mapState('teacher', ['teacher'])
  },
  filters: {
    getExperienceYears(teacher) {
      const res = new Date().getFullYear() - get(teacher, 'metadata.majorDate', 0)
      return res > 0 ? res : 0
    }
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
