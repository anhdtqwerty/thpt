<template>
  <div>
    <v-btn class="elevation-0" icon @click="onEdit()">
      <v-icon >mdi-pencil</v-icon>
    </v-btn>
    <v-btn class="elevation-0" icon @click="onRemove()">
      <v-icon>mdi-delete</v-icon>
    </v-btn>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  components: {},
  props: {
    selected: { type: Object, default: () => [] }
  },
  data() {
    return {
      createState: false,
      sending: null
    }
  },
  computed: {
    ...mapState('division', ['divisions'])
  },
  methods: {
    ...mapActions('division', ['removeDivision', 'updateDivisions']),
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
      this.$emit('onEdit', this.selected)
    }
  }
}
</script>
