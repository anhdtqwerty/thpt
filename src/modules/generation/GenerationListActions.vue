<template>
  <v-menu>
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
        <v-list-item-content>Xóa niên khóa</v-list-item-content>
      </v-list-item>
      <v-list-item class="py-1" @click="onEdit">
        <v-list-item-icon class="mr-2"
          ><v-icon left>mdi-pencil</v-icon></v-list-item-icon
        >
        <v-list-item-content>Sửa niên khóa</v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  components: {},
  props: {
    disabled: Boolean,
    selected: { type: Object, default: () => [] }
  },
  data() {
    return {
      createState: false,
      sending: null
    }
  },
  computed: {
    ...mapState('generation', ['generations'])
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
        }
      })
    },
    onEdit() {
      this.$emit('onEdit', this.selected)
    }
  }
}
</script>
