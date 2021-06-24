<template>
  <v-card flat style="height: 100%" class="d-flex flex-column align-center justify-center elevation-0 py-16">
    <img :src="BookImage" alt="student-setting" />
    <div class="font-weight-bold mt-4">Năm học mới đã sẵn sàng!</div>
    <div>
      Kính chúc nhà trường, thầy cô và các em học sinh một năm học thành công tốt đẹp!
    </div>
    <router-link style="text-decoration: none" :to="'/students'">
      <div class="font-weight-bold">Xem danh sách học sinh</div>
    </router-link>
  </v-card>
</template>

<script>
import BookImage from '@/assets/book.svg'

export default {
  components: {},

  data() {
    return {
      BookImage
    }
  }
}
</script>

<style></style>
