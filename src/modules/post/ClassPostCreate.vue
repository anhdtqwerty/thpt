<template>
  <v-data-table
    v-model='selecteds'
    :headers='headers'
    :items='classes'
    item-key='title'
    show-select
    class='elevation-1'
  >
    <div slot='top'>
      <div>
        <v-card flat class='ma-1 mt-4 pa-4 elevation-1'>
          <div class='d-flex'>
            <AutocompleteGrade class='mr-2'
                               v-model='grade'
                               item-text='title'
                               item-value='id'
                               label='Khối'
                               required
                               dense
                               outlined
                               auto-select-first
                               hide-details
                               style='max-width: 256px' />
            <v-btn color='primary' outlined @click='search'>Tìm kiếm</v-btn>
          </div>
        </v-card>
        <div class='d-flex justify-space-between ps-4 py-2'>
          <span :class="selecteds.length ? 'text--primary' : 'text--disabled'">
            {{ selecteds.length ? 'Đã chọn ' + selecteds.length + ' lớp' : 'Chưa chọn' }}
          </span>
          <v-btn small color='primary' :disabled='!selecteds.length' @click="$emit('sendPost', { classes: selecteds})">
            Gửi tin nhắn
          </v-btn>
        </div>
      </div>
    </div>
  </v-data-table>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import AutocompleteGrade from '@/components/basic/input/AutocompleteGrade'

export default {
  components: { AutocompleteGrade },
  data() {
    return {
      selecteds: [],
      grade: null,
      headers: [
        { text: 'Nhóm nhận tin', value: 'title' },
        // { text: 'Số lớp', value: 'classNo' },
        { text: 'Số học sinh', value: 'students.length' }
      ]
    }
  },
  computed: {
    ...mapState('postCreate', ['classes'])
  },
  methods: {
    ...mapActions('postCreate', ['fetchClassData']),
    search() {
      if (this.grade) {
        this.fetchClassData({ gradeId: this.grade })
      }
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
