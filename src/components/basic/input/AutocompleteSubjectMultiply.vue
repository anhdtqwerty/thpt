<template>
  <v-autocomplete
    v-bind="this.$attrs"
    item-text="title"
    :items="subjectMultiplys"
    item-value="id"
    @change="onChange"
    v-on:input="$emit('input', $event)"
    @update:search-input="update"
  ></v-autocomplete>
</template>

<script>
export default {
  data: () => ({
    subjectMultiplys: []
  }),
  props: {
    filters: Object,
    defaultSubjectMultiplys: Array,
    options: Object
  },
  computed: {},
  created() {
    if (this.defaultSubjectMultiplys) {
      this.subjectTypes = this.defaultSubjectMultiplys
    }

    this.fetchAllSubjectMultiplys()
  },
  methods: {
    async fetchAllSubjectMultiplys() {
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
