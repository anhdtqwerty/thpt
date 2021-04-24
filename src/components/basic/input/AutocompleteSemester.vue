<template>
  <v-autocomplete
    item-text="title"
    item-value="id"
    v-bind="this.$attrs"
    :items="semesters"
    @change="onChange"
    return-object
    v-on:input="$emit('input', $event)"
    :loading="loading"
  ></v-autocomplete>
</template>

<script>
import { Semester } from '@/plugins/api'

export default {
  props: {
    filter: Object
  },
  data: () => ({
    semesters: [],
    semester: {},
    loading: false
  }),

  created() {
    this.fetchAllSemesters()
  },
  methods: {
    async fetchAllSemesters() {
      this.loading = true
      if (this.filter && this.filter.generation) {
        this.semesters = await Semester.fetch({ generation: this.filter.generation })
      } else {
        this.semesters = await Semester.fetch({})
      }
      this.loading = false
    },
    onChange(data) {
      this.$emit('change', data)
    }
  }
}
</script>
