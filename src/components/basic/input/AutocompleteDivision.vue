<template>
  <v-autocomplete
    v-bind="this.$attrs"
    item-text="title"
    :items="divisions"
    item-value="id"
    @change="onChange"
    v-on:input="$emit('input', $event)"
    @update:search-input="update"
  ></v-autocomplete>
</template>

<script>
import { mapGetters } from 'vuex'
import { Division } from '@/plugins/api'

export default {
  data: () => ({
    divisions: []
  }),
  props: {
    filters: Object,
    defaultDivisions: Array,
    options: Object
  },
  computed: {
    ...mapGetters('app', ['department'])
  },
  created() {
    if (this.defaultDivisions) {
      this.divisions = this.defaultDivisions
    }

    this.fetchAllDivisions()
  },
  methods: {
    async fetchAllDivisions() {
      this.divisions = await Division.fetch({
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
