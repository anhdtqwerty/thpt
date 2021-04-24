<template>
  <v-radio-group
    @change="onChange"
    v-model="semesterData"
    row
    class="shrink mt-0"
  >
    <v-radio label="Học kỳ I" hide-details value="semester-1"></v-radio>
    <v-radio label="Học kỳ II" hide-details value="semester-2"></v-radio>
    <v-radio label="Cả năm" hide-details value="year"></v-radio>
  </v-radio-group>
</template>

<script>
import { Semester } from '@/plugins/api'

export default {
  data: () => ({
    semesterData: 'semester-1',
    semesterFilter: '',
    semesters: []
  }),
  props: {
    generation: Object
  },
  created() {
    this.loadData()
  },
  methods: {
    async loadData() {
      this.semesters = await Semester.fetch({ generation: this.generation.id })
      this.semesterFilter = this.semesters[0]
      this.$emit('change', this.semesterFilter)
    },
    onChange(data) {
      if (data === 'semester-1') this.semesterFilter = this.semesters[0]
      else if (data === 'semester-2') this.semesterFilter = this.semesters[1]
      else this.semesterFilter = ''

      this.$emit('change', this.semesterFilter)
    }
  }
}
</script>
