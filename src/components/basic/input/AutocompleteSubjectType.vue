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
export default {
  data: () => ({
    subjectTypes: []
  }),
  props: {
    filters: Object,
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
      // this.subjectTypes = await Grade.fetch({
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
