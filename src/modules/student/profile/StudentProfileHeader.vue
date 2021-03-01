<template>
  <v-card elevation="0" outlined>
    <v-row class="py-5 px-3">
      <v-col class="d-flex align-center justify-center" cols="2">
        <user-avatar-picker :student="student" type="student" />
      </v-col>
      <v-col class="d-flex flex-column justify-center" cols="8">
        <v-row no-gutters class="flex-column">
          <p class="text-h5 primary--text mb-0">{{ student.name }}</p>
          <p class="text-subtitle-2">{{ student.code }}</p>
        </v-row>
        <v-row>
          <v-col
            v-for="studentDetail in studentDetails"
            :key="studentDetail.title"
            :cols="studentDetail.cols"
            class="py-2 d-flex flex-column justify-end"
          >
            <p class="text-caption mb-0">{{ studentDetail.title }}</p>
            <p class="text-subtitle-2 mb-0">{{ studentDetail.value }}</p>
          </v-col>
        </v-row>
      </v-col>
      <v-col class="d-flex align-end" cols="2">
        <v-btn small color="primary" outlined>Hồ sơ chi tiết</v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import UserAvatarPicker from '@/components/basic/picker/UserAvatarPicker'

export default {
  data() {
    return {
      studentDetails: [
        { title: 'Lớp', value: this.student.classes[0].title, cols: 2 },
        {
          title: 'Bố / Người giám hộ',
          value: `${this.student.data.dadName} / ${this.student.data.dadPhone}`,
          cols: 5,
        },
        {
          title: 'Mẹ / Người giám hộ',
          value: `${this.student.data.momName} / ${this.student.data.momPhone}`,
          cols: 5,
        },
      ],
    }
  },
  components: {
    UserAvatarPicker,
  },
  props: {
    student: Object,
  },
}
</script>

<style lang="css" scoped>
</style>
