<template>
  <div :class="{ 'px-3': $vuetify.breakpoint.mdAndUp }">
    <new-grade-dialog :state="createGrade" />
    <v-row
      :class="{
        'px-2 mt-2': $vuetify.breakpoint.smAndDown,
        'mx-n2': $vuetify.breakpoint.mdAndUp,
      }"
      no-gutters
    >
      <v-col>
        <Breadcrumbs
          headline="Quản lý khối"
          :link="[{ text: 'Quản lý khối', href: '../grades' }]"
        />
      </v-col>
      <v-col class="d-flex justify-end pt-4">
        <v-btn color="primary" @click="createGrade = !createGrade">
          <v-icon left>add</v-icon>{{ addButtonText }}
        </v-btn>
      </v-col>
    </v-row>
    <v-card class="pa-6">
      <p class="text-uppercase text-h6" style="color: #0d47a1">
        Danh sách các khối
      </p>
      <v-data-table :headers="headers" :items="grades">
        <template v-slot:item.actions="{ item }">
          <grade-list-actions :selected="item"> </grade-list-actions>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>


<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import NewGradeDialog from '@/modules/grade/NewGradeDialog.vue'
import GradeListActions from '@/modules/grade/GradeListActions.vue'

export default {
  components: {
    NewGradeDialog,
    Breadcrumbs,
    GradeListActions,
  },
  props: {
    role: String,
  },
  data() {
    return {
      headers: [
        { text: 'Tên khối', value: 'title', align: 'left', sortable: false },
        {
          text: 'Ghi chú',
          value: 'description',
          align: 'left',
          sortable: false,
        },
        { text: 'Hành động', value: 'actions', align: 'left', sortable: false },
      ],
      createGrade: false,
      selected: {},
    }
  },

  computed: {
    ...mapState('app', ['department']),
    ...mapState('grade', ['grades']),
    addButtonText() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
        case 'sm':
          return 'Thêm'
        default:
          return 'Thêm khối'
      }
    },
  },
  async created() {
    await this.refresh({})
  },
  methods: {
    ...mapActions('grade', ['fetchGrades']),
    updateDraw(draw) {
      this.draw = draw
    },
    refresh() {
      this.fetchGrades()
    },
    // onDivisionSelected(division) {
    //   this.setDivision(division)
    // },
  },
  filters: {},
}
</script>