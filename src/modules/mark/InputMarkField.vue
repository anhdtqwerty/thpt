<template>
  <div>
    <td v-for="index in columns" :key="index">
      <v-text-field
        v-if="marks && marks.length && marks[index - 1]"
        outlined
        dense
        hide-details
        :value="marks[index - 1].value"
        @change="event => onInputMark(marks[index - 1].student.id, marks[index - 1].id, event)"
      />
      <v-text-field v-else outlined dense hide-details :disabled="index > 1 && marks[index - 1]" />
    </td>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  components: {},
  data: () => ({}),
  props: {
    columns: Number,
    marks: Array
  },
  computed: {
    ...mapState('app', ['currentGeneration', 'currentSemester'])
  },
  created() {
    console.log('input', this.columns, this.marks)
  },
  methods: {
    onInputMark(studentId, markId, markValue) {
      console.log('input chan', studentId, markId, markValue)
    },
    async onClassChanged(classData) {},
    onFilterChanged() {}
  }
}
</script>
