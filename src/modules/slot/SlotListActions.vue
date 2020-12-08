<template>
  <v-menu bottom left nudge-bottom="36">
    <template v-slot:activator="{ on }">
      <v-btn text v-on="on" icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </template>
    <v-list class="px-2" dense>
      <v-list-item class="py-1" @click="onRemove">
        <v-list-item-icon class="mr-2"
          ><v-icon left>mdi-delete</v-icon></v-list-item-icon
        >
        <v-list-item-content>Xóa buổi học</v-list-item-content>
      </v-list-item>
      <v-list-item class="py-1" @click="onEdit">
        <v-list-item-icon class="mr-2"
          ><v-icon left>mdi-pencil</v-icon></v-list-item-icon
        >
        <v-list-item-content>Chỉnh sửa</v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    selected: { type: Object, default: () => [] },
    options: Object,
    add: Boolean,
    remove: Boolean
  },
  methods: {
    ...mapActions('classDetail', [
      'fetchSlots',
      'setSlots',
      'removeSlot',
      'initClass'
    ]),
    onRemove () {
      this.$dialog.confirm({
        title: 'Thông báo xác nhân',
        text: `Xóa buổi học sẽ xóa toàn bộ thông tin điểm danh, chấm công và tính lương của giáo viên. Bạn có Chắc Chắn ?`,
        okText: 'OK',
        cancelText: 'Hủy',
        done: async () => {
          this.removeSlot(this.selected.id)
        }
      })
    },
    onEdit () {
      this.$emit('edit', this.selected)
    }
  }
}
</script>
