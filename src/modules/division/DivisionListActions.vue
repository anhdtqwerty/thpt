<template>
  <div>
    <division-update-dialog v-bind:division=selected :state="EditDivision"/>
    <v-btn class="elevation-0" icon  @click="EditDivision=!EditDivision">
      <v-icon >mdi-pencil</v-icon>
    </v-btn>
    <v-btn class="elevation-0" icon @click="onRemove()">
      <v-icon>mdi-delete</v-icon>
    </v-btn>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import DivisionUpdateDialog from '@/modules/division/DivisionUpdateDialog.vue'

export default {
  components: {
    DivisionUpdateDialog,
  },
  props: {
    selected: { type: Object, default: () => [] }
  },
  data() {
    return {
      sending: null,
      EditDivision: false
    }
  },
  computed: {
    ...mapState('division', ['divisions'])
  },
  methods: {
    ...mapActions('division', ['removeDivision', 'updateDivision']),
    onRemove() {
      this.$dialog.confirm({
        title: 'Xóa phân ban',
        text: 'Bạn có chắc muốn phân ban này?',
        okText: 'Có',
        cancelText: 'Không',
        done: async () => {
          await this.removeDivision(this.selected.id)
        }
      })
    },
    onEdit() {
      console.log(12)
      this.$emit('onEdit', this.selected)
    }
  }
}
</script>
