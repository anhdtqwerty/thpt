<template>
  <v-card style="height: 100%" class="d-flex flex-column align-center justify-center mx-md-4 my-md-4 elevation-1">
    <img :src="markView ? MarkImage : InputMarkImage" alt="student-setting" />
    <span class="mt-4">
      {{ `Vui lòng cung cấp các thông tin ở trên, sau đó ấn ${action} để xem bảng điểm` }}
    </span>
  </v-card>
</template>

<script>
import MarkImage from '@/assets/mark-view-icon.svg'
import InputMarkImage from '@/assets/mark-input-icon.svg'

export default {
  components: {},
  props: {
    markView: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      MarkImage,
      InputMarkImage
    }
  },
  computed: {
    action() {
      return this.markView ? '[Xem điểm]' : '[Nhập điểm]'
    }
  }
}
</script>

<style></style>
