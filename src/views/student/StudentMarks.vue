<template>
  <div style="height: 100%">
    <div class="pa-4 d-flex justify-space-between align-center">
      <div>
        <Breadcrumbs headline="Sổ điểm" :link="[{ text: 'Sổ điểm', href: '../student-mark' }]" />
      </div>
    </div>

    <v-card class="mx-md-4 my-md-4 elevation-1">
      <StudentMarkFilter class="pa-4" :defaultStudentId="defaultStudentId" @onFilterChanged="onFilterChanged" />
    </v-card>

    <v-card v-if="factors && factors.length" class="mx-md-4 elevation-1">
      <v-row class="pa-4 justify-end">
        <v-btn v-if="$vuetify.breakpoint.mdAndUp" class="mr-2" outlined color="primary" @click="exportExcel">
          <v-icon left>mdi-file-excel</v-icon> Xuất Excel
        </v-btn>
      </v-row>

      <StudentMarkDataTable
        :factors="factors"
        :semester="semesterData"
        :subjectMarks="semesterData && semesterData.type !== 'year' ? marks : avgMarkYear"
        class="pa-4"
      />
    </v-card>
    <MarkBlankView v-else />
  </div>
</template>

<script>
import Breadcrumbs from '@/components/layout/Breadcrumbs.vue'
import { mapActions, mapState, mapGetters } from 'vuex'
import StudentMarkFilter from '@/modules/student/mark/StudentMarkFilter.vue'
import { get, orderBy, max } from 'lodash'
import StudentMarkDataTable from '@/modules/student/mark/StudentMarkDataTable.vue'
import MarkBlankView from '@/modules/mark/MarkBlankView.vue'

export default {
  components: {
    Breadcrumbs,
    StudentMarkFilter,
    StudentMarkDataTable,
    MarkBlankView
  },
  data() {
    return {
      factors: [],
      avgMarkYear: [],
      semesterData: {},
      defaultStudentId: ''
    }
  },
  computed: {
    ...mapGetters('StudentMark', ['marks', 'semester']),
    ...mapState('subjects', ['subjects', 'defaultFactors'])
  },
  mounted() {
    let param = {}
    if (this.$route.query.student) {
      param.student = this.$route.query.student
      this.defaultStudentId = this.$route.query.student
    }
  },
  methods: {
    ...mapActions('StudentMark', ['fetchMarks', 'setSubjects', 'setSemester', 'setFactors']),
    ...mapActions('subjects', ['fetchSubjects']),

    async onFilterChanged(query) {
      if (!get(query, 'class.id') || !get(query, 'student.id')) return
      this.$loading.active = true
      await this.fetchSubjects({ division: get(query.class, 'division'), grade: query.grade })
      this.setSubjects(this.subjects)

      if (query.semester.type !== 'year') {
        this.setSemester(query.semester)
        this.semesterData = this.semester
        await this.getSemesterMark(query)
      } else {
        this.semesterData = query.semester
        await this.getAvgMark(get(query, 'class.id'), get(query, 'student.id'), get(query, 'semester.semesters'))
      }
      this.$loading.active = false
    },
    async getSemesterMark(query) {
      await this.fetchMarks({
        class: get(query, 'class.id'),
        semester: get(query, 'semester.id'),
        student: get(query, 'student.id')
      })

      let factors = orderBy(this.defaultFactors, ['index'], ['asc'])
      // build factors, get max of quanity per factor
      factors = factors.map(factor => {
        let quantities = []
        this.subjects.map(subject => {
          const factorsByType = subject.factors.filter(f => f.type === factor.type)
          quantities = [...quantities, ...factorsByType.map(f => f.quantity)]
        })
        return { ...factor, quantity: max(quantities) }
      })
      this.setFactors(factors)

      // factors.push({ title: 'TBM' })
      this.factors = factors
    },
    async getAvgMark(classId, studentId, semseters) {
      this.avgMarkYear = this.subjects.map((s, index) => {
        const avg1 = 0
        const avg2 = 0
        let avgYear = (avg1 + avg2) / 2
        avgYear = Math.floor(avgYear * 100) / 100

        return { subject: s, marks: [{ value: avg1 }, { value: avg2 }, { value: avgYear }] }
      })

      let yearFactors = [{ title: 'TB HK I' }, { title: 'TB HK II' }, { title: 'Cả Năm' }]
      this.factors = yearFactors
      this.semesterData = { title: 'Cả năm', type: 'year' }
    },
    exportExcel() {
      // todo
    }
  }
}
</script>

<style></style>
