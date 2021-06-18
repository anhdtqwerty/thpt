<template>
  <div>
    <v-card class="d-flex elevation-0 flex-column justify-center mx-8 pa-4">
      <p class="font-weight-bold">Danh sách lên lớp</p>
      <v-row>
        <v-col cols="6">
          <AutocompleteGrade
            item-text="title"
            item-value="id"
            label="Khối"
            required
            dense
            outlined
            :filters="gradeFilter"
            @change="gradeChanged"
          />
        </v-col>
      </v-row>

      <div style="overflow-y: scroll; height: 400px">
        <v-card outlined flat>
          <v-data-table
            mobile-breakpoint="0"
            item-key="id"
            :headers="headers"
            :items="filteredClasses"
            :items-per-page="-1"
            hide-default-footer
          >
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon @click="editClass(item)" class="ma-2" dense>mdi-pencil</v-icon>
            </template>
          </v-data-table>
        </v-card>
      </div>

      <v-card-actions class="pa-0">
        <v-spacer />
        <v-btn @click="done" depressed color="primary" class="px-6 mt-4  white--text">Tiếp tục</v-btn>
      </v-card-actions>
    </v-card>
    <NewClassNameUpdateDialog :state="editDialog" :item="selectedItem" />
  </div>
</template>

<script>
import AutocompleteGrade from '@/components/basic/input/AutocompleteGrade.vue'
import { mapActions, mapGetters } from 'vuex'
import NewClassNameUpdateDialog from '@/modules/generation/NewClassNameUpdateDialog.vue'

export default {
  components: { AutocompleteGrade, NewClassNameUpdateDialog },
  data() {
    return {
      headers: [
        {
          text: 'Khối',
          value: 'currentClass.grade.gradeNumber',
          align: 'left',
          sortable: false
        },
        {
          text: 'Lớp hiện tại',
          value: 'currentClass.title',
          align: 'left',
          sortable: false
        },
        {
          text: 'Lên lớp',
          value: 'newClass.newClassTitle',
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
      editDialog: false,
      selectedItem: {},
      filteredClasses: []
    }
  },
  async created() {
    await this.refresh({})
  },
  computed: {
    ...mapGetters('Generation', ['classes']),

    gradeFilter() {
      return { gradeNumber_nin: [5, 9, 12] }
    }
  },
  methods: {
    ...mapActions('Generation', ['fetchClasses']),
    async refresh(params) {
      this.$loading.active = true
      await this.fetchClasses({
        _limit: -1,
        _sort: 'grade.gradeNumber:ASC',
        status: 'running',
        'grade.gradeNumber_nin': [5, 9, 12],
        ...params
      })
      this.filteredClasses = this.classes
      this.$loading.active = false
    },
    async gradeChanged(grade) {
      const classes = this.classes.filter(c => c.currentClass.grade.id === grade)
      this.filteredClasses = classes
    },
    done() {
      // const params = {}
      this.$emit('saveNewClass', this.classes)
    },
    editClass(item) {
      this.selectedItem = item
      this.editDialog = !this.editDialog
    }
  }
}
</script>

<style lang="scss" scoped></style>
