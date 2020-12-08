<template>
  <v-list dense>
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
    onFilterChanged () {}
  }
}
</script>
