<template>
  <v-data-table
    v-model="selecteds"
    :headers="headers"
    :items="grades"
    item-key="title"
    show-select
    class="elevation-1"
    :footer-props="footerTable"
  >
    <div slot="top">
      <div class="d-flex justify-space-between ps-4 py-2">
        <span :class="selecteds.length ? 'text--primary' : 'text--disabled'">{{
          selecteds.length ? 'Đã chọn ' + selecteds.length + ' khối' : 'Chưa chọn'
        }}</span>
        <v-btn small color="primary" :disabled="!selecteds.length" @click="$emit('sendPost', { grades: selecteds })">
          Gửi tin nhắn
        </v-btn>
      </div>
    </div>
  </v-data-table>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
  data() {
    return {
      selecteds: [],
      grade: null,
      headers: [
        { text: 'Nhóm nhận tin', value: 'title' },
        { text: 'Số lớp', value: 'classNo' },
        { text: 'Số học sinh', value: 'studentNo' }
      ]
    }
  },
  async mounted() {
    this.$loading.active = true
    await this.fetchGradeData()
    this.$loading.active = false
  },
  computed: {
    ...mapGetters('postCreate', ['allSchoolItems']),
    ...mapState('postCreate', ['grades']),
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
    ...mapActions('postCreate', ['fetchGradeData'])
  }
}
</script>

<style lang="scss" scoped></style>
