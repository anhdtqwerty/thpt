<template>
  <v-list dense>
    <v-subheader>Bài Kiểm Tra</v-subheader>
    <v-list-item three-line>
      <v-list-item-content>
        <v-checkbox
          v-model="checkbox1"
          label="Progress Test 1(5%)"
        ></v-checkbox>
        <v-checkbox
          v-model="checkbox2"
          label="Progress Test 2 (5%)"
        ></v-checkbox>
        <v-checkbox v-model="finalTest" label="Thi Cuối Kỳ(40%)"></v-checkbox>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
    <v-subheader>Học Sinh</v-subheader>
    <v-list-item>
      <v-radio-group v-model="radioGroup">
        <v-radio label="Chưa nộp bài"></v-radio>
        <v-radio label="Đã nộp bài"></v-radio>
        <v-radio label="Tất cả"></v-radio>
      </v-radio-group>
    </v-list-item>
    <v-divider></v-divider>
    <v-subheader>Điểm số</v-subheader>
    <v-list-item>
      <v-radio-group v-model="radioGroup">
        <v-radio label="Dưới trung bình"></v-radio>
        <v-radio label="Trung Bình"></v-radio>
        <v-radio label="Khá, Giỏi"></v-radio>
        <v-radio label="Tất cả"></v-radio>
      </v-radio-group>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  data: () => ({
    query: '',
    checkbox1: false,
    checkbox2: false,
    checkbox3: false,
    finalTest: false,
    status: [],
    selectedRole: []
  }),
  computed: {},
  methods: {
    onFilterChanged() {}
  }
}
</script>
