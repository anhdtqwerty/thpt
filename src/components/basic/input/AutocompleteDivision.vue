<template>
  <v-autocomplete
    v-bind="this.$attrs"
    item-text="title"
    :items="divisions"
    item-value="id"
    @change="onChange"
    v-on:input="$emit('input', $event)"
    @update:search-input="update"
    :loading="loading"
  ></v-autocomplete>
</template>

<script>
import { mapGetters } from 'vuex'
import { Division } from '@/plugins/api'

export default {
  data: () => ({
    divisions: [],
    loading: false
  }),
  props: {
    filter: Object,
    defaultDivisions: Object,
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
      this.loading = true
      this.divisions = await Division.fetch({
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
      this.fetchAllDivisions()
    }
  }
}
</script>

<style scoped></style>
