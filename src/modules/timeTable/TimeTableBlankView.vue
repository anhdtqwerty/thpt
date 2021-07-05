<template>
  <v-card style="height: 100%" class="d-flex flex-column align-center justify-center elevation-1">
    <img :src="TimeTableImage" alt="student-setting" />
    <span class="mt-4">
      {{
        `Vui lòng cung cấp các thông tin ở trên,
 sau đó ấn [ Xem TKB ] để xem Thời khóa biểu của ${name} cụ thể `
      }}
    </span>
  </v-card>
</template>

<script>
import TimeTableImage from '@/assets/time-table-default.svg'

export default {
  props: {
    type: String
  },
  data() {
    return {
      TimeTableImage
    }
  },
  computed: {
    name() {
      return this.type === 'class' ? 'lớp' : 'Giáo viên'
    }
  }
}
</script>

<style></style>
