<template>
  <div>
    <GroupSubjectUpdateDialog :groupSubject="selected" :state="editgroupSubject" />
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-icon v-bind="attrs" v-on="on">mdi-dots-vertical</v-icon>
      </template>
      <v-list>
        <v-list-item>
          <v-btn class="elevation-0" icon @click="editgroupSubject = !editgroupSubject">
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
import { mapActions } from 'vuex'
import GroupSubjectUpdateDialog from '@/modules/groupSubject/GroupSubjectUpdateDialog.vue'

export default {
  components: {
    GroupSubjectUpdateDialog
  },
  props: {
    selected: { type: Object, default: () => [] }
  },
  data() {
    return {
      sending: null,
      editgroupSubject: false
    }
  },
  computed: {},
  methods: {
    ...mapActions('GroupSubject', ['removeGroupSubject', 'updategroupSubject']),
    onRemove() {
      this.$dialog.confirm({
        title: 'Xóa phân ban',
        text: 'Bạn có chắc muốn bộ môn này?',
        okText: 'Có',
        cancelText: 'Không',
        done: async () => {
          try {
            await this.removeGroupSubject(this.selected.id)
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
