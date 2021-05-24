<template>
  <v-autocomplete
    v-bind="this.$attrs"
    item-text="title"
    :items="subjectGroups"
    item-value="id"
    @change="onChange"
    v-on:input="$emit('input', $event)"
    @update:search-input="update"
  ></v-autocomplete>
</template>

<script>
// import { GroupSubject } from '@/plugins/api'

export default {
  data: () => ({
    subjectGroups: []
  }),
  props: {
    filters: Object,
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
      // this.subjectGroups = await GroupSubject.fetch({
      //   ...this.filters
      // })
    },
    async update(data) {},
    onChange(data) {
      this.$emit('change', data)
    }
  }
}
</script>

<style scoped></style>
