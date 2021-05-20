<template>
  <div>
    <DivisionUpdateDialog :division="selected" :state="editDivision" />
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-icon v-bind="attrs" v-on="on">mdi-dots-vertical</v-icon>
      </template>
      <v-list>
        <v-list-item>
          <v-btn class="elevation-0" icon @click="editDivision = !editDivision">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn class="elevation-0" icon @click="onRemove">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import DivisionUpdateDialog from '@/modules/division/DivisionUpdateDialog.vue'

export default {
  components: {
    DivisionUpdateDialog
  },
  props: {
    selected: { type: Object, default: () => [] }
  },
  data() {
    return {
      sending: null,
      editDivision: false
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
          try {
            await this.removeDivision(this.selected.id)
            this.$alert.deleteSuccess()
          } catch (error) {
            this.$alert.deleteError()
          }
        }
      })
    }
  }
}
</script>
