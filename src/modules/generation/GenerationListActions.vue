<template>
  <div>
    <v-btn @click="onEdit" icon><v-icon left>mdi-pencil</v-icon></v-btn>
    <v-btn @click="onRemove" icon><v-icon left>mdi-delete</v-icon></v-btn>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  components: {},
  props: {
    disabled: Boolean,
    selected: { type: Object, default: () => [] },
  },
  data() {
    return {
      createState: false,
      sending: null,
    }
  },
  computed: {
    ...mapState('generation', ['generations']),
  },
  methods: {
    ...mapActions('generation', ['removeGeneration', 'updateGenerations']),
    onRemove() {
      this.$dialog.confirm({
        title: 'Xóa Niên Khóa',
        text: 'Bạn có chắc muốn xóa niên khóa này?',
        okText: 'Có',
        cancelText: 'Không',
        done: async () => {
          await this.removeGeneration(this.selected.id)
        },
      })
    },
    onEdit() {
      this.$emit('onEdit', this.selected)
    },
  },
}
</script>
