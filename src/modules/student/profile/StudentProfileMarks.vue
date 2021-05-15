<template>
  <v-container>
    <div class="d-flex flex-nowrap container">
      <v-card v-for="item in subjectMarks" :key="item.subject.id" class="mr-4 subject">
        <v-card-title class="title">
          {{ item.subject.title }}
        </v-card-title>
        <v-card-text class="d-flex">
          <div class="mr-4" v-for="sm in item.semesterMasks" :key="sm.name">
            <div>
              <p class="font-weight-bold">
                {{ sm.name }}
              </p>
              <table class="pr-4">
                <tr v-for="fm in sm.factorMarks" :key="fm.factor.id">
                  <td class="py-1 pr-2 factor-title">{{ fm.factor.title }}</td>
                  <td v-for="i in sm.maxNumberMarks - fm.marks.length" :key="i" class="px-1">
                    <div></div>
                  </td>
                  <td v-for="mark in fm.marks" :key="mark.id" class="px-1">
                    <div :class="getMarkColor(mark.value)">{{ mark.value }}</div>
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
  components: {},
  props: {
    student: Object
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
            const factorMarks = factors
              .filter(f => f.semesterType === semesterType)
              .sort((a, b) => a.index - b.index)
              .map(f => {
                const fms = filteredMarks.filter(m => m.factor.id === f.id).sort((a, b) => a.data.index - b.data.index)
                return {
                  factor: f,
                  marks: fms
                }
              })

            let maxNumberMarks = Math.max(...factorMarks.map(sm => sm.marks.length))
            if (isNaN(maxNumberMarks)) maxNumberMarks = 0
            return {
              name,
              factorMarks,
              maxNumberMarks
            }
          }
          return {
            subject: s,
            semesterMasks: [getSemesterMarks('semester-1', 'Học kì I'), getSemesterMarks('semester-2', 'Học kì II')]
          }
        })
      }
    },
    getMarkColor(markValue) {
      if (markValue >= 0 && markValue < 5) return 'red--text'
      if (markValue >= 5 && markValue < 9) return 'orange--text'
      if (markValue >= 9) return 'green--text'
      return 'gray--text'
    }
  },
  watch: {
    student: {
      handler: 'fetchData',
      immediate: true
    }
  }
}
</script>
<style scoped lang="scss">
.title {
  min-width: 300px;
}
.factor-title {
  min-width: 150px;
}
table {
  border-collapse: collapse;
}
tr {
  border-bottom: 1px solid lightgrey;
}
.container {
  overflow-x: auto;
  width: 100%;
}
.container::-webkit-scrollbar {
  -webkit-appearance: none;
}
.container::-webkit-scrollbar:horizontal {
  height: 10px;
}
.container::-webkit-scrollbar-thumb {
  border-radius: 8px;
  border: 2px solid white;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
