<template>
  <v-card outlined class="d-flex flex-column justify-center my-8 mx-16 pa-4">
    <p class="text--secondary">
      Đây là thao tác gửi tin nhắn Khen thưởng kỷ luật hàng ngày. Các thông tin về Khen thưởng kỷ luật của học sinh
      trong ngày sẽ được tổng hợp và gửi tới ứng dụng Sổ liên lạc điện tử của phụ huynh học sinh.
    </p>
    <p class="text--secondary">
      Vui lòng nhập đầy đủ thông tin của học sinh trước khi thực hiện thao tác này. Nếu đã chắc chắn, bạn có thể tích
      vào ô <span class="font-weight-bold">[Xác nhận gửi tin]</span> bên dưới, sau đó nhấn nút
      <span class="font-weight-bold">[Gửi]</span>.
    </p>

    <v-checkbox v-model="checkbox" label="Xác nhận gửi tin" />
    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer />
      <v-btn
        :disabled="!checkbox"
        @click="$emit('sendDailyViolation')"
        depressed
        color="primary"
        class="px-6 mt-4  white--text"
        >Gửi</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      checkbox: false
    }
  },
  computed: {},
  methods: {}
}
</script>

<style lang="scss" scoped></style>
