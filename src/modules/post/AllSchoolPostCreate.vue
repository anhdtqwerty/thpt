<template>
  <v-data-table
    v-model="selecteds"
    :headers="headers"
    :items="allSchoolItems"
    item-key="title"
    show-select
    class="elevation-1"
    :footer-props="footerTable"
  >
    <template v-slot:[`footer.page-text`]="items">
      {{ items.pageStart }} - {{ items.pageStop }} trên tổng
      {{ items.itemsLength }}
    </template>
    <div slot="top">
      <div class="d-flex justify-space-between ps-4 py-2">
        <span :class="selecteds.length ? 'primary--text' : 'text--disabled'">Đã chọn toàn trường</span>
        <v-btn small color="primary" :disabled="!selecteds.length" @click="$emit('sendPost', { allSchool: true })"
          >Gửi tin nhắn</v-btn
        >
      </div>
    </div>
  </v-data-table>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      selecteds: [],
      headers: [
        { text: 'Nhóm nhận tin', value: 'title' },
        { text: 'Số lớp', value: 'classNo' },
        { text: 'Số học sinh', value: 'studentNo' }
      ]
    }
  },
  mounted() {
    this.fetchAllSchoolData()
  },
  computed: {
    ...mapGetters('postCreate', ['allSchoolItems']),
    footerTable() {
      let footer = {
        'items-per-page-text': 'Hiển thị mỗi trang',
        'items-per-page-all-text': 'Tất cả',
        'items-per-page': 10,
        'page-text': this.pageText
      }
      if (this.totalItems > 100) {
        footer['items-per-page-options'] = [5, 10, 15]
      }
      return footer
    }
  },
  methods: {
    ...mapActions('postCreate', ['fetchAllSchoolData', 'sendAllSchoolPost'])
  }
}
</script>

<style lang="scss" scoped></style>
