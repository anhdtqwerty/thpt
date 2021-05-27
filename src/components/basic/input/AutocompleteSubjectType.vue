<template>
  <v-autocomplete
    v-bind="this.$attrs"
    item-text="title"
    :items="subjectTypes"
    item-value="id"
    @change="onChange"
    v-on:input="$emit('input', $event)"
    @update:search-input="update"
  ></v-autocomplete>
</template>

<script>
import { GroupSubject } from '@/plugins/api'
export default {
  data: () => ({
    subjectTypes: []
  }),
  props: {
    filter: Object,
    defaultGrades: Array,
    options: Object
  },
  computed: {},
  created() {
    if (this.defaultSubjectTypes) {
      this.subjectTypes = this.defaultSubjectTypes
    }

    this.fetchAllSubjectTypes()
  },
  methods: {
    async fetchAllSubjectTypes() {
      this.subjectTypes = await GroupSubject.fetch({
        ...this.filter
      })
    },
    async update(data) {},
    onChange(data) {
      this.$emit('change', data)
    }
  },
  watch: {
    filter(filter) {
      this.fetchAllSubjectTypes()
    }
  }
}
</script>

<style scoped></style>
