<template>
  <v-autocomplete
    v-bind="this.$attrs"
    item-text="title"
    :items="subjects"
    item-value="id"
    @change="onChange"
    v-on:input="$emit('input', $event)"
    @update:search-input="update"
  ></v-autocomplete>
</template>

<script>
import { mapGetters } from 'vuex'
import { Subject } from '@/plugins/api'

export default {
  data: () => ({
    subjects: []
  }),
  props: {
    filters: Object,
    defaultSubjects: Array,
    options: Object
  },
  computed: {
    ...mapGetters('app', ['department'])
  },
  created() {
    if (this.defaultSubjects) {
      this.subjects = this.defaultSubjects
    }

    this.fetchAllSubjects()
  },
  methods: {
    async fetchAllSubjects() {
      this.subjects = await Subject.fetch({
        ...this.filters
      })
    },
    async update(data) {},
    onChange(data) {
      this.$emit('change', data)
    }
  }
}
</script>

<style scoped></style>
