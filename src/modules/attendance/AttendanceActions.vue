<template>
  <div class="d-flex">
    <v-btn v-show="selected.length" small color="primary" class="mr-2" depressed @click="onConfirm">
      <v-icon left>check</v-icon>Xác Nhận Điểm Danh
    </v-btn>
    <v-btn v-show="selected.length" small color="error" class="mr-2" depressed @click="onReject">
      <v-icon left>close</v-icon>Từ Chối Điểm Danh
    </v-btn>
    <v-btn v-show="selected.length" small color="warning" class="mr-2" depressed @click="onPay">
      <v-icon left>warning</v-icon>Xác Nhận Đã Trả Lương
    </v-btn>
    <v-btn v-show="selected.length" small color="gray" class="mr-2" depressed @click="onRemove">
      <v-icon left>delete</v-icon>Xóa Chấm Công
    </v-btn>
  </div>
</template>
<script>
export default {
  props: {
    selected: { type: Array, default: () => [] },
    options: Object,
    add: Boolean,
    remove: Boolean
  },
  methods: {
    onRemove () {
      this.$dialog.confirm({
        title: 'Xóa Điểm Danh',
        text: ` Bạn có Chắc Chắn xóa những thông tin điểm danh ?`,
        okText: 'Có',
        cancelText: 'Hủy',
        done: async () => {
          this.$emit('remove', this.selected)
        }
      })
    },
    onConfirm () {
      this.$dialog.confirm({
        title: 'Xác Nhận Điểm Danh',
        text: ` Xác nhận buổi học đã diễn ra như dự kiến ?`,
        okText: 'Đúng Vậy',
        cancelText: 'Hủy',
        done: async () => {
          this.$emit(
            'update',
            this.selected.map(i => ({ ...i, state: 'confirmed' }))
          )
        }
      })
    },
    onReject () {
      this.$dialog.confirm({
        title: 'Xác Nhận Điểm Danh',
        text: ` Xác nhận buổi học đã KHÔNG diễn ra như dự kiến ?`,
        okText: 'Đúng Vậy',
        cancelText: 'Hủy',
        done: async () => {
          this.$emit(
            'update',
            this.selected.map(i => ({ ...i, state: 'rejected' }))
          )
        }
      })
    },
    onPay () {
      this.$dialog.confirm({
        title: 'Xác Nhận Trả Lương',
        text: ` Xác nhận đã trả lương trong trường họp trả lương bằng tiền mặt, hoặc trong trường hợp hệ thống không thể tự đánh dấu ngày công này là đã trả lương. Bạn Có chắc chắn muốn đánh dấu Đã Trả Lương ?`,
        okText: 'Xác Nhận',
        cancelText: 'Hủy',
        done: async () => {
          this.$emit(
            'update',
            this.selected.map(i => ({ ...i, state: 'paid' }))
          )
        }
      })
    }
  }
}
</script>
