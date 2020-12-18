<template>
  <v-autocomplete
    item-text="title"
    item-value="id"
    v-bind="this.$attrs"
    :items="semesters"
    @change="onChange"
    v-on:input="$emit('input', $event)"
  ></v-autocomplete>
</template>

<script>
import { mapGetters } from 'vuex'
import { Semester } from '@/plugins/api'

export default {
  data: () => ({
    semesters: [],
  }),
  props: {
    filters: Object,
    defaultSemesters: Array,
    options: Object,
  },
  computed: {
    ...mapGetters('app', ['currentGeneration']),
  },
  created() {
    if (this.defaultSemesters) {
      this.semesters = this.defaultSemesters
    }
    this.fetchAllSemesters()
  },
  methods: {
    async fetchAllSemesters() {
      this.semesters = await Semester.fetch({
        generation: this.currentGeneration,
      })
    },
    onChange(data) {
      this.$emit('change', data)
    },
  },
}
</script>
