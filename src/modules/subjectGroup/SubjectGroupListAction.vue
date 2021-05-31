<template>
  <div>
    <SubjectGroupUpdateDialog :subjectGroup="selected" :state="editsubjectGroup" />
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-icon v-bind="attrs" v-on="on">mdi-dots-vertical</v-icon>
      </template>
      <v-list>
        <v-list-item>
          <v-btn class="elevation-0" icon @click="editsubjectGroup = !editsubjectGroup">
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
import SubjectGroupUpdateDialog from '@/modules/subjectGroup/SubjectGroupUpdateDialog.vue'

export default {
  components: {
    SubjectGroupUpdateDialog
  },
  props: {
    selected: { type: Object, default: () => [] }
  },
  data() {
    return {
      sending: null,
      editsubjectGroup: false
    }
  },
  computed: {},
  methods: {
    ...mapActions('SubjectGroup', ['removeSubjectGroup', 'updatesubjectGroup']),
    onRemove() {
      this.$dialog.confirm({
        title: 'Xóa phân ban',
        text: 'Bạn có chắc muốn bộ môn này?',
        okText: 'Có',
        cancelText: 'Không',
        done: async () => {
          try {
            await this.removeSubjectGroup(this.selected.id)
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
