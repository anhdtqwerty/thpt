<template>
  <div>
    <v-card class="d-flex elevation-0 flex-column justify-center ma-8 pa-4">
      <div class="py-4 d-flex justify-space-between align-center">
        <div>
          <p class="font-weight-bold">Danh sách lớp mới</p>
        </div>
        <div>
          <v-btn outlined light depressed color="#0D47A1" @click.stop="addDialog = !addDialog">
            <v-icon left>add</v-icon>Thêm lớp</v-btn
          >
        </div>
      </div>

      <div style="overflow-y: scroll; max-height: 400px">
        <v-data-table
          mobile-breakpoint="0"
          item-key="id"
          :headers="headers"
          :items="newClasses"
          hide-default-footer
          class="elevation-1"
        >
          <template v-slot:[`item.grade`]="{ item }">
            {{ item.grade.title }}
          </template>
          <template v-slot:[`item.class`]="{ item }">
            {{ item.title }}
          </template>
          <template v-slot:[`item.division`]="{ item }">
            {{ item.division.title }}
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <div class="d-flex flex-column"></div>
            <v-icon @click="editNewClass(item)" class="ma-2" dense>mdi-pencil</v-icon>
            <v-icon @click="onRemove(item)" class="ma-2" dense>mdi-delete</v-icon>
          </template>
        </v-data-table>
      </div>

      <v-card-actions class="pa-0">
        <v-spacer />
        <v-btn @click="done" depressed color="primary" class="px-6 mt-4  white--text">Tiếp tục</v-btn>
      </v-card-actions>
    </v-card>
    <CreateNewClassDialog :state="addDialog" />
    <UpdateNewClassDialog :classData="selectedItem" :state="editDialog" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import CreateNewClassDialog from '@/modules/generation/CreateNewClassDialog.vue'
import UpdateNewClassDialog from '@/modules/generation/UpdateNewClassDialog.vue'

export default {
  components: { CreateNewClassDialog, UpdateNewClassDialog },
  data() {
    return {
      headers: [
        {
          text: 'Khối',
          value: 'grade',
          align: 'left',
          sortable: false
        },
        {
          text: 'Lớp',
          value: 'class',
          align: 'left',
          sortable: false
        },
        {
          text: 'Phân ban',
          value: 'division',
          align: 'left',
          sortable: false
        },
        {
          text: 'Thao tác',
          value: 'actions',
          align: 'left',
          sortable: false
        }
      ],
      addDialog: false,
      editDialog: false,
      selectedItem: {}
    }
  },
  async created() {
    // await this.refresh({})
  },
  computed: {
    ...mapGetters('Generation', ['classes', 'newClasses'])
  },
  methods: {
    ...mapActions('Generation', ['fetchClasses', 'removeNewClass']),

    done() {
      this.$emit('createNewClass')
    },
    editNewClass(item) {
      this.selectedItem = item
      this.editDialog = !this.editDialog
    },
    onRemove(item) {
      this.$dialog.confirm({
        title: 'Xóa lớp mới',
        text: ` Bạn có Chắc Chắn muốn xóa lớp này không ?`,
        okText: 'Có',
        cancelText: 'Hủy',
        done: async () => {
          await this.removeNewClass(item.id)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
