<template>
  <div>
    <div class="pa-4 d-flex justify-space-between align-center">
      <div>
        <Breadcrumbs
          headline="Quản lý bộ môn"
          :link="[
            { text: 'Nâng cao', href: '../groupSubjects' },
            { text: 'QL bộ môn', href: '../groupSubjects' }
          ]"
        />
      </div>
      <div class="flex-center">
        <v-btn @click="createStateDialog = !createStateDialog" dark color="#0D47A1">
          <v-icon left>add</v-icon>Thêm bộ môn
        </v-btn>
      </div>
    </div>
    <GroupSubjectDataTable :groupSubjects="groupSubjects" />

    <GroupSubjectNewDialog :state="createStateDialog" />
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import GroupSubjectNewDialog from '@/modules/groupSubject/GroupSubjectNewDialog.vue'
import GroupSubjectDataTable from '@/modules/groupSubject/GroupSubjectDataTable.vue'

export default {
  components: {
    GroupSubjectNewDialog,
    Breadcrumbs,
    GroupSubjectDataTable
  },
  props: {
    role: String
  },
  data() {
    return {
      headers: [
        {
          text: 'Bộ môn',
          value: 'title',
          align: 'left',
          sortable: false,
          show: true
        },
        {
          text: 'Cấp học',
          value: 'academicLevel',
          align: 'left',
          sortable: false,
          show: true
        },
        {
          text: 'Hành động',
          value: 'action',
          align: 'center',
          sortable: false,
          show: true,
          width: 100
        }
      ],
      createStateDialog: false,
      selected: {}
    }
  },

  computed: {
    ...mapState('GroupSubject', ['groupSubjects'])
  },
  async created() {
    await this.refresh({})
  },
  methods: {
    ...mapActions('GroupSubject', ['fetchGroupSubjects']),
    updateDraw(draw) {
      this.draw = draw
    },
    refresh() {
      this.fetchGroupSubjects({ _sort: 'createdAt:desc' })
    },
    onDivisionSelected(division) {
      this.setDivision(division)
    }
  },
  filters: {}
}
</script>

<style scoped></style>
