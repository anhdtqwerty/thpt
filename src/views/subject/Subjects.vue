<template>
  <div>
    <div class="pa-4 pa-md-2 d-flex justify-space-between align-center">
      <div>
        <Breadcrumbs
          headline="Quản lý môn"
          :link="[{ text: 'Quản lý môn', href: '../subjects' }]"
        />
      </div>
      <div class="flex-center">
        <v-btn @click="createSubject = !createSubject" dark color="primary">
          <v-icon left>add</v-icon>{{ addButtonText }}
        </v-btn>
      </div>
    </div>
    <new-subject-dialog :state="createSubject" />

    <v-card class="pa-2 pa-md-4 ma-md-2 elevation-1">
      <p class="text-uppercase text-h6" style="color: #0d47a1">
        Danh sách các môn
      </p>
      <v-data-table :headers="headers" :items="subjects">
        <template v-slot:item.actions="{ item }">
          <subject-list-actions :selected="item"> </subject-list-actions>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import NewSubjectDialog from '@/modules/subject/SubjectNewDialog.vue'
import SubjectListActions from '@/modules/subject/SubjectListActions.vue'

export default {
  components: {
    NewSubjectDialog,
    Breadcrumbs,
    SubjectListActions
  },
  props: {
    role: String
  },
  data() {
    return {
      headers: [
        { text: 'Tên môn', value: 'title', align: 'left', sortable: false },
        {
          text: 'Ghi chú',
          value: 'description',
          align: 'left',
          sortable: false
        },
        { text: 'Hành động', value: 'actions', align: 'left', sortable: false }
      ],
      createSubject: false,
      selected: {}
    }
  },

  computed: {
    ...mapState('app', ['department']),
    ...mapState('subjects', ['subjects']),
    addButtonText() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
        case 'sm':
          return 'Thêm'
        default:
          return 'Thêm môn'
      }
    }
  },
  async created() {
    await this.refresh({})
  },
  methods: {
    ...mapActions('subjects', ['fetchSubjects']),
    updateDraw(draw) {
      this.draw = draw
    },
    async refresh() {
      console.log('refresh')
      await this.fetchSubjects()
    },
    onSubjectSelected(subject) {
      this.setSubject(subject)
    }
  },
  filters: {}
}
</script>
