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
    filter: Object,
    defaultSubjectTypes: Array,
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
      // fetch api
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
