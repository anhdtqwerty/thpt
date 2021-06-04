<template>
  <div v-if="student.id" class="pa-4">
    <div class="d-flex justify-space-between align-center">
      <div>
        <Breadcrumbs
          :headline="student ? `${student.name}` : 'Học Sinh'"
          :link="[{ text: 'Danh sách sổ liên lạc', href: '../contact-book' }]"
        />
      </div>
    </div>
    <StudentContactBookHeader :student="student" />
    <StudentContactBookFilter @onFilterChanged="onFilterChanged" />
    <StudentContactBookDataTable ref="table" />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import StudentContactBookHeader from '@/modules/contactBook/StudentContactBookHeader.vue'
import StudentContactBookDataTable from '@/modules/contactBook/StudentContactBookDataTable.vue'
import StudentContactBookFilter from '@/modules/contactBook/StudentContactBookFilter.vue'

export default {
  components: {
    Breadcrumbs,
    StudentContactBookHeader,
    StudentContactBookDataTable,
    StudentContactBookFilter
  },
  props: {
    role: String
  },
  data() {
    return {}
  },
  async created() {
    await this.fetchStudent(this.$route.params.id)
  },
  computed: {
    ...mapState('StudentPostHistory', ['student'])
  },
  methods: {
    ...mapActions('StudentPostHistory', ['fetchStudent', 'setStudent']),

    async onFilterChanged(query) {
      this.$refs.table.refresh(query)
    }
  },
  watch: {},
  filters: {}
}
</script>
<style scoped>
td {
  white-space: nowrap !important   ;
}
.card-border {
  border: 1px solid rgba(224, 224, 224, 1);
}
</style>
