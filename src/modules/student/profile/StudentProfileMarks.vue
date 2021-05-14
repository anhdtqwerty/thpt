<template>
  <v-container>
    <div class="d-flex flex-nowrap container">
      <v-card v-for="(item) in subjectMarks" :key="item.subject.id" class="mr-4 subject">
        <v-card-title class="title">
          {{ item.subject.title }}
        </v-card-title>
        <v-card-text class="d-flex">
          <div class="mr-4" v-for="sm in item.semesterMasks" :key="sm.name">
            <div>
            {{ sm.name }}
            <table>
              <tr v-for="fm in sm.factorMarks" :key="fm.factor.id">
                <td class="py-1 pr-2">{{ fm.factor.title }}</td>
                <td v-for="mark in fm.marks" :key="mark.id" class="px-1">
                  {{ mark.value }}
                </td>
                <td v-for="mark in fm.marks" :key="mark.id" class="px-1">
                  {{ mark.value }}
                </td>
              </tr>
            </table>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </v-container>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  components: {
  },
  props: {
    student: Object,
  },
  data() {
    return {
      tab: null,
      subjectMarks: []
    }
  },
  created() {
    //
  },
  methods: {
    ...mapActions('student', ['fetchSubjectMarks']),
    async fetchData() {
      if (this.student) {
        const { subjects, marks } = await this.fetchSubjectMarks(this.student)
        this.subjectMarks = subjects.map(s => {
          const filteredMarks = marks.filter(m => m.subject.id === s.id)
          const factors = s.factors
          const getSemesterMarks = (semesterType, name) => {
            const factorMarks = factors.filter(f => f.semesterType === semesterType).map(f => {
              const fms = filteredMarks.filter(m => m.factor.id === f.id)
              console.log(s.title, semesterType, fms)
              return {
                factor: f,
                marks: fms
              }
            })
            let maxNumberMarks = Math.max(factorMarks.map(sm => sm.marks.length))
            if (isNaN(maxNumberMarks)) maxNumberMarks = 0
            return {
              name, factorMarks, maxNumberMarks
            }
          }
          return {
            subject: s,
            semesterMasks: [
              getSemesterMarks('semester-1', 'Học kì I'),
              getSemesterMarks('semester-2', 'Học kì II'),
            ]
          }
        })
      }
    }
  },
  watch: {
    setudent: {
      handler: 'fetchData',
      immediate: true
    }
  }
}
</script>
<style scoped lang="scss">
.container {
  overflow-y: auto;
}
.subject {
}
.title {
  min-width: 150px;
}
</style>
