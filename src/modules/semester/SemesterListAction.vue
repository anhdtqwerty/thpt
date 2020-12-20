<template>
  <div class="d-flex">
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item @click="remove">
          <v-icon left>mdi-delete</v-icon>
          <v-list-item-title>Xóa</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  components: {},
  props: {
    item: Object,
  },
  data() {
    return {}
  },
  computed: {},
  methods: {
    ...mapActions('semester', ['removeSemester']),
    remove() {
      this.$dialog.confirm({
        title: 'Xóa Học kỳ',
        text: 'Bạn có chắc muốn xóa học kỳ này?',
        okText: 'Có',
        cancelText: 'Không',
        done: async () => {
          await this.removeSemester(this.item.id)
        },
      })
    },
  },
}
</script>
