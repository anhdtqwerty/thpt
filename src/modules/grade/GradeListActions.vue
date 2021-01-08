<template>
  <div>
    <grade-update-dialog v-bind:grade="selected" :state="EditGrade" />
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-icon v-bind="attrs" v-on="on">mdi-dots-vertical</v-icon>
      </template>
      <v-list>
        <v-list-item>
          <v-btn class="elevation-0" icon @click="EditGrade = !EditGrade">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn class="elevation-0" icon @click="onRemove()">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import GradeUpdateDialog from '@/modules/grade/GradeUpdateDialog.vue'

export default {
  components: {
    GradeUpdateDialog,
  },
  props: {
    selected: { type: Object, default: () => [] },
  },
  data() {
    return {
      sending: null,
      EditGrade: false,
    }
  },
  computed: {
    ...mapState('grade', ['Grades']),
  },
  methods: {
    ...mapActions('grade', ['removeGrade', 'updateGrade']),
    onRemove() {
      this.$dialog.confirm({
        title: 'Xóa phân ban',
        text: 'Bạn có chắc muốn phân ban này?',
        okText: 'Có',
        cancelText: 'Không',
        done: async () => {
          await this.removeGrade(this.selected.id)
        },
      })
    },
    onEdit() {
      this.$emit('onEdit', this.selected)
    },
  },
}
</script>
