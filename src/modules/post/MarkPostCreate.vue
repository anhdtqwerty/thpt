<template>
  <v-card outlined class="d-flex flex-column justify-center my-8 mx-16 pa-4">
    <p>
      Đây là thao tác gửi tin nhắn Sổ điểm hàng ngày. Các thông tin về điểm số của học sinh trong ngày sẽ được tổng hợp
      và gửi tới ứng dụng Sổ liên lạc điện tử của phụ huynh học sinh.
    </p>
    <p>
      Vui lòng nhập đầy đủ thông tin của học sinh trước khi thực hiện thao tác này. Nếu đã chắc chắn, bạn có thể tích
      vào ô <span class="font-weight-bold">[Xác nhận gửi tin]</span> bên dưới, sau đó nhấn nút
      <span class="font-weight-bold">[Gửi]</span>.
    </p>

    <v-checkbox label="Xác nhận gửi tin" />
    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer />
      <v-btn depressed color="primary" class="px-6 mt-4  white--text">Gửi</v-btn>
    </v-card-actions>
  </v-card>
</template>
