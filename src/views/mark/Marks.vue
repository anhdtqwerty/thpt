<template>
  <div style="height: 100%">
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
      <MarkFilter class="pa-4" @onFilterChanged="onFilterChanged" />
    </v-card>

    <v-card v-if="factors && factors.length" class="mx-md-4 elevation-1">
      <v-row class="pa-4 justify-end">
        <v-btn v-if="$vuetify.breakpoint.mdAndUp" class="mr-2" outlined color="primary">
          <v-icon left>mdi-file-excel</v-icon> Xuất Excel
        </v-btn>
      </v-row>

      <MarkDataTable
        :factors="factors"
        :semester="semester"
        :studentMarks="semester && semester.type !== 'year' ? marks : avgMarkYear"
        class="pa-4"
      />
    </v-card>
    <MarkBlankView v-else />
  </div>
</template>

<script>
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import MarkFilter from '@/modules/mark/MarkFilter'
import MarkDataTable from '@/modules/mark/MarkDataTable'
import { orderBy, get } from 'lodash'
import MarkBlankView from '@/modules/mark/MarkBlankView.vue'

import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  components: {
    Breadcrumbs,
    MarkFilter,
    MarkDataTable,
    MarkBlankView
  },
  data() {
    return {
      semester: {},
      studentMarks: {},
      avgMarkYear: []
    }
  },
  watch: {},
  computed: {
    ...mapGetters('Mark', ['marks', 'students', 'factors']),
    ...mapGetters('app', ['department']),
    ...mapState('app', ['currentGeneration', 'currentSemester']),
    ...mapState('subjects', ['subject'])
  },
  methods: {
    ...mapActions('Mark', ['fetchMarks', 'setStudents', 'setFactors']),
    ...mapActions('subjects', ['fetchSubject']),

    async onFilterChanged(query) {
      if (!get(query, 'class.id') || !get(query, 'subject')) return
      this.$loading.active = true

      this.setStudents(get(query, 'class.students'))
      await this.fetchSubject(query.subject)

      if (query.semester.type !== 'year') {
        await this.getSemesterMark(query)
      } else {
        await this.getAvgMark(get(query, 'class.id'), get(query, 'subject'), get(query, 'semester.semesters'))
      }

      this.$loading.active = false
    },

    async getSemesterMark(query) {
      await this.fetchSubject(query.subject)
      let factors = this.subject.factors.filter(x => x.semesterType === query.semester.type)
      factors = orderBy(factors, ['index'], ['asc'])
      this.setFactors(factors)

      await this.fetchMarks({
        class: get(query, 'class.id'),
        semester: get(query, 'semester.id'),
        subject: get(query, 'subject')
      })
      this.semester = query.semester
    },

    async getAvgMark(classId, subjectId, semseters) {
      this.avgMarkYear = this.students.map((s, index) => {
        return { student: s, marks: [{ value: undefined }, { value: undefined }, { value: undefined }] }
      })

      let yearFactors = [{ title: 'TB HK I' }, { title: 'TB HK II' }, { title: 'Cả Năm' }]
      this.setFactors(yearFactors)
      this.semester = { title: 'Cả năm', type: 'year' }
    }
  },
  created() {}
}
</script>

<style></style>
