<template>
  <div>
    <div class="pa-4 d-flex justify-space-between align-center">
      <Breadcrumbs
        headline="Sổ điểm"
        :link="[
          { text: 'Điểm số', href: '/marks' },
          { text: 'Số điểm', href: '/marks' }
        ]"
      />
    </div>

    <v-card class="mx-md-4 my-md-4 elevation-1">
      <MarkFilter class="pa-4" @onFilterChanged="refresh" />
    </v-card>

    <v-card v-if="factors.length" class="mx-md-4 elevation-1">
      <v-row class="pa-4 justify-end">
        <v-btn v-if="$vuetify.breakpoint.mdAndUp" class="mr-2" outlined color="primary">
          <v-icon left>mdi-file-excel</v-icon> Xuất Excel
        </v-btn>
      </v-row>

      <MarkDataTable :factors="factors" :semester="semester" :marks="marks" class="pa-4" />
    </v-card>
  </div>
</template>

<script>
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import MarkFilter from '@/modules/mark/MarkFilter'
import MarkDataTable from '@/modules/mark/MarkDataTable'
import { orderBy } from 'lodash'

import { mapState, mapActions, mapGetters } from 'vuex'
// import { Semester, Factor, Subject } from '@/plugins/api'

export default {
  components: {
    Breadcrumbs,
    MarkFilter,
    MarkDataTable
  },
  data() {
    return {
      loading: false,
      factors: [],
      semester: Object
    }
  },
  watch: {},
  computed: {
    ...mapGetters('mark', ['marks']),
    ...mapState('subjects', ['subject'])
  },
  methods: {
    ...mapActions('mark', ['fetchMarks']),
    ...mapActions('subjects', ['fetchSubject']),
    // ...mapActions('factor', ['setFactors']),

    async refresh(query) {
      this.loading = true
      try {
        this.semester = query.semester
        if (this.semester !== 'year') {
          await this.fetchSubject(query.subject)
          const factors = this.subject.factors.filter(x => x.semesterType === query.semester.type)
          this.factors = orderBy(factors, ['index'], ['asc'])

          const params = {
            class: query.class,
            semester: query.semester.id,
            subject: query.subject
          }

          await this.fetchMarks(params)
          console.log('factors', this.factors, this.marks)
        } else {
          this.factors = ['TB HK I', 'TB HK II', 'Ca Nam']
        }
      } catch (err) {
        console.log(err)
      } finally {
        this.loading = false
      }
    }
  },
  created() {}
}
</script>

<style></style>
