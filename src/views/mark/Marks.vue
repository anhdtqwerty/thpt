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
  </div>
</template>

<script>
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import MarkFilter from '@/modules/mark/MarkFilter'
import MarkDataTable from '@/modules/mark/MarkDataTable'
import { orderBy, get } from 'lodash'

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
      // factors: [],
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
      let factors = this.subject.factors.filter(x => x.semesterType === semseters[0].type)
      this.setFactors(factors)

      await this.fetchMarks({
        class: classId,
        semester: semseters[0].id,
        subject: subjectId
      })
      const mark1 = this.marks

      factors = this.subject.factors.filter(x => x.semesterType === semseters[1].type)
      this.setFactors(factors)

      await this.fetchMarks({
        class: classId,
        semester: semseters[1].id,
        subject: subjectId
      })
      const mark2 = this.marks

      this.avgMarkYear = this.students.map((s, index) => {
        const avg1 = mark1[index].avgSemester
        const avg2 = mark2[index].avgSemester
        let avgYear = (avg1 + avg2) / 2
        avgYear = Math.floor(avgYear * 100) / 100

        return { student: s, marks: [{ value: avg1 }, { value: avg2 }, { value: avgYear }] }
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