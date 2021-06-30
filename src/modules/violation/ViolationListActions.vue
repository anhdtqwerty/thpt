<template>
  <div>
    <violation-update-dialog v-bind:violation="selected" :state="EditViolation" />
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-icon v-bind="attrs" v-on="on">mdi-dots-vertical</v-icon>
      </template>
      <v-list class="pa-0">
        <v-list-item @click="EditViolation = !EditViolation">
          Sửa nội dung
        </v-list-item>
        <v-list-item class="elevation-0" @click="onRemove()">
          Xóa nội dung
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import ViolationUpdateDialog from '@/modules/violation/ViolationUpdateDialog.vue'

export default {
  components: {
    ViolationUpdateDialog
  },
  props: {
    selected: { type: Object, default: () => [] },
    currentPage: Number
  },
  data() {
    return {
      sending: null,
      EditViolation: false
    }
  },
  computed: {
    ...mapState('violation', ['violations'])
  },
  methods: {
    ...mapActions('violation', ['removeViolation', 'updateDivision', 'refresh']),
    onRemove() {
      this.$dialog.confirm({
        title: 'Xóa',
        text: 'Bạn có chắc muốn xóa nội dung khen thưởng kỷ luật này không?',
        okText: 'Có',
        cancelText: 'Không',
        done: async () => {
          await this.removeViolation({ id: this.selected.id, currentPage: this.currentPage })
        }
      })
    },
    onEdit() {
      this.$emit('onEdit', this.selected)
    }
  }
}
</script>
