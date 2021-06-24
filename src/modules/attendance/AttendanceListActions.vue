<template>
  <div class="d-flex">
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" icon>
          <v-icon color="primary">mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item>
          <v-list-item-title style="cursor: pointer" @click="editDialog = !editDialog">Sửa điểm danh</v-list-item-title>
        </v-list-item>
        <!-- <v-list-item>
          <v-list-item-title>Gửi tin nhắn</v-list-item-title>
        </v-list-item> -->
        <v-list-item>
          <v-list-item-title style="cursor: pointer" @click="detailDialog = !detailDialog"
            >Xem chi tiết</v-list-item-title
          >
        </v-list-item>
      </v-list>
    </v-menu>

    <AttendanceEditDialog :item="item" :state="editDialog" />
    <AttendanceDetailDialog :student="item.student" :state="detailDialog" />
  </div>
</template>

<script>
import AttendanceEditDialog from '@/modules/attendance/AttendanceEditDialog.vue'
import AttendanceDetailDialog from '@/modules/attendance/AttendanceDetailDialog.vue'

export default {
  props: {
    item: Object
  },
  components: {
    AttendanceEditDialog,
    AttendanceDetailDialog
  },
  data() {
    return {
      detailDialog: false,
      editDialog: false
    }
  },
  computed: {},
  methods: {}
}
</script>
