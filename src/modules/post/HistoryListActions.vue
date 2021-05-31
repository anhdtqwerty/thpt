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
          <v-list-item-title style="cursor: pointer" @click="detail = !detail">Xem chi tiết</v-list-item-title>
        </v-list-item>
        <v-list-item :disabled="item.status !== 'error'">
          <v-list-item-title style="cursor: pointer" @click="resend">Gửi lại tin</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <HistoryDetailDialog :history="item" :state="detail" @resend="resend" />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import HistoryDetailDialog from '@/modules/post/HistoryDetailDialog.vue'
import { ContactBook } from '@/plugins/api.js'

export default {
  components: { HistoryDetailDialog },
  props: {
    disabled: Boolean,
    filter: Boolean,
    item: Object
  },
  data() {
    return {
      mailDialogState: false,
      smsDialogState: false,
      smsEditingState: false,
      sending: null,
      detail: false
    }
  },
  computed: {
    ...mapState('student', ['students'])
  },
  methods: {
    ...mapActions('AppHistory', ['updateHistory']),

    async resend() {
      this.$dialog.confirm({
        title: 'Xác nhận gửi tin',
        text: ` Bạn có chắc chắn muốn gửi lại tin nhắn này ?`,
        okText: 'Xác nhận',
        cancelText: 'Hủy',
        done: async () => {
          try {
            this.$loading.active = true
            await ContactBook.resend(this.item.id)
            this.$emit('resend')
            this.$alert.success('Gửi lại tin nhắn thành công')
          } catch (error) {
            this.$alert.error('Gửi lại tin nhắn thất bại: ' + error)
          } finally {
            this.$loading.active = false
          }
        }
      })
    }
  }
}
</script>
