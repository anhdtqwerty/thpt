<template>
  <v-autocomplete
    v-bind="this.$attrs"
    item-text="title"
    :items="classes"
    item-value="id"
    @change="onChange"
    return-object
    v-on:input="$emit('input', $event)"
    @input="onChange"
    auto-select-first
    :loading="loading"
  ></v-autocomplete>
</template>

<script>
import { mapGetters } from 'vuex'
import { Class } from '@/plugins/api'

export default {
  data: () => ({
    classes: [],
    loading: false
  }),
  props: {
    filter: Object,
    defaultClasses: Array
  },
  computed: {
    ...mapGetters('app', ['department', 'roles', 'roleIdByName'])
  },
  created() {
    this.classes = this.defaultClasses || []
    this.fetchClass()
  },
  methods: {
    async fetchClass() {
      this.loading = true
      this.classes = await Class.fetch({
        ...this.filter,

        department: this.department.id,
        status_in: ['opened', 'running']
      })
      this.loading = false
    },
    onChange(data) {
      this.$emit('change', data)
    }
  },
  watch: {
    filter(filters) {
      this.fetchClass()
    }
  }
}
</script>
