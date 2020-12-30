<template>
  <div>
    <violation-update-dialog v-bind:violation=selected :state="EditViolation"/>
    <v-btn class="elevation-0" icon  @click="EditViolation=!EditViolation">
      <v-icon >mdi-pencil</v-icon>
    </v-btn>
    <v-btn class="elevation-0" icon @click="onRemove()">
      <v-icon>mdi-delete</v-icon>
    </v-btn>
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
    selected: { type: Object, default: () => [] }
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
    ...mapActions('violation', ['removeViolation', 'updateDivision']),
    onRemove() {
      this.$dialog.confirm({
        title: 'Xóa',
        text: 'Bạn có chắc muốn xóa không?',
        okText: 'Có',
        cancelText: 'Không',
        done: async () => {
          await this.removeViolation(this.selected.id)
        }
      })
    },
    onEdit() {
      this.$emit('onEdit', this.selected)
    }
  }
}
</script>
