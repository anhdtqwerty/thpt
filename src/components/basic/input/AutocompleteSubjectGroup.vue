<template>
  <v-autocomplete
    v-bind="this.$attrs"
    item-text="title"
    :items="subjectGroups"
    item-value="id"
    @change="onChange"
    v-on:input="$emit('input', $event)"
    @update:search-input="update"
    :loading="loading"
    clearable
  ></v-autocomplete>
</template>

<script>
import { SubjectGroup } from '@/plugins/api'

export default {
  data: () => ({
    subjectGroups: [],
    loading: false
  }),
  props: {
    filter: Object,
    defaultSubjectGroups: Array,
    options: Object
  },
  computed: {},
  created() {
    if (this.defaultSubjectGroups) {
      this.subjectGroups = this.defaultSubjectGroups
    }

    this.fetchAllSubjectGroups()
  },
  methods: {
    async fetchAllSubjectGroups() {
      this.loading = true
      this.subjectGroups = await SubjectGroup.fetch({
        ...this.filter,
        _limit: -1
      })
      this.loading = false
    },
    async update(data) {},
    onChange(data) {
      this.$emit('change', data)
    }
  },
  watch: {
    filter(filter) {
      this.fetchAllSubjectGroups()
    }
  }
}
</script>

<style scoped></style>
