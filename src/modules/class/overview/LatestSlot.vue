<template>
  <v-layout>
    <v-flex md-4>
      <v-list-item three-line class="border-right">
        <v-list-item-avatar>
          <v-icon class="blue white--text">mdi-account</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>Điểm Danh</v-list-item-title>
          <v-list-item-subtitle>
            <h1 color="succes">10/15</h1>
          </v-list-item-subtitle>
          <v-list-item-subtitle>5 học sinh nghỉ học</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-flex>
    <v-flex md-4>
      <v-list-item three-line class="border-right">
        <v-list-item-avatar>
          <v-icon class="red white--text">mdi-auto-fix</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>Bài tập về nhà đã nộp</v-list-item-title>
          <v-list-item-subtitle>
            <h1 style="color: #F44336">4/15</h1>
          </v-list-item-subtitle>
          <v-list-item-subtitle>11 học sinh chưa nộp</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-flex>
    <v-flex md-4>
      <v-list-item three-line>
        <v-list-item-avatar>
          <v-icon class="green white--text">mdi-message-draw</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>Chấm Công</v-list-item-title>
          <v-list-item-subtitle>
            <h1>Đã Hoàn Thành</h1>
          </v-list-item-subtitle>
          <v-list-item-subtitle>Giáo viên đi dạy đúng giờ</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'LatestSlot'
}
</script>

<style scoped>
.border-right {
  border-right: solid 1px gray;
}
.v-list-item {
  padding-left: 0;
}
</style>
