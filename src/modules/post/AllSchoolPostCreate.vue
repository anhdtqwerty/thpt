<template>
  <v-data-table
    v-model="selected"
    :headers="headers"
    :items="allSchoolItems"
    item-key="title"
    show-select
    class="elevation-1"
  >
  <v-slot slot="top">
    <div class="d-flex justify-space-between ps-4 py-2">
      <v-checkbox hide-details class="ma-0" :value="selected.length">
        <template v-slot:label>
          <span class="primary--text">Đã chọn toàn trường</span>
        </template>
      </v-checkbox>
      <v-btn small color="primary">Gửi tin nhắn</v-btn>
    </div>
  </v-slot>
  </v-data-table>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      selected: [],
      headers: [
        { text: 'Nhóm nhận tin', value: 'title' },
        { text: 'Số lớp', value: 'classNo' },
        { text: 'Số học sinh', value: 'studentNo' },
      ],
    }
  },
  computed: {
    ...mapGetters('postCreate', ['allSchoolItems']),
  },
}
</script>

<style lang="scss" scoped>

</style>
