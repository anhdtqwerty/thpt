<template>
  <v-data-table
    v-model='selecteds'
    :headers='headers'
    :items='allSchoolItems'
    item-key='title'
    show-select
    class='elevation-1'
  >
    <div slot='top'>
      <div class='d-flex justify-space-between ps-4 py-2'>
        <span :class="selecteds.length ? 'primary--text' : 'text--disabled'">Đã chọn toàn trường</span>
        <v-btn small color='primary' :disabled='!selecteds.length'  @click="$emit('sendPost', { allSchool: true})">Gửi tin nhắn</v-btn>
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
    ...mapGetters('postCreate', ['allSchoolItems'])
  },
  methods: {
    ...mapActions('postCreate', ['fetchAllSchoolData', 'sendAllSchoolPost'])
  }
}
</script>

<style lang='scss' scoped>

</style>
