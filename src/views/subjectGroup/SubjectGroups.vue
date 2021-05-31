<template>
  <div>
    <div class="pa-4 d-flex justify-space-between align-center">
      <div>
        <Breadcrumbs
          headline="Quản lý bộ môn"
          :link="[
            { text: 'Nâng cao', href: '../subjectGroups' },
            { text: 'QL bộ môn', href: '../subjectGroups' }
          ]"
        />
      </div>
      <div class="flex-center">
        <v-btn @click="createStateDialog = !createStateDialog" dark color="#0D47A1">
          <v-icon left>add</v-icon>Thêm bộ môn
        </v-btn>
      </div>
    </div>
    <SubjectGroupDataTable :subjectGroups="subjectGroups" />

    <SubjectGroupNewDialog :state="createStateDialog" />
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import SubjectGroupNewDialog from '@/modules/subjectGroup/SubjectGroupNewDialog.vue'
import SubjectGroupDataTable from '@/modules/subjectGroup/SubjectGroupDataTable.vue'

export default {
  components: {
    SubjectGroupNewDialog,
    Breadcrumbs,
    SubjectGroupDataTable
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
    ...mapState('SubjectGroup', ['subjectGroups'])
  },
  async created() {
    await this.refresh({})
  },
  methods: {
    ...mapActions('SubjectGroup', ['fetchSubjectGroups']),
    updateDraw(draw) {
      this.draw = draw
    },
    refresh() {
      this.fetchSubjectGroups({ _sort: 'createdAt:desc' })
    },
    onDivisionSelected(division) {
      this.setDivision(division)
    }
  },
  filters: {}
}
</script>

<style scoped></style>
