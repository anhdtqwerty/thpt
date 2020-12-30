<template>
  <v-autocomplete
    v-bind="this.$attrs"
    item-text="title"
    :items="classes"
    clearable
    item-value="id"
    @change="onChange"
    return-object
    v-on:input="$emit('input', $event)"
    :rules="[v => !!v || 'Item is required']"
    @input="onChange"
  ></v-autocomplete>
</template>

<script>
import { mapGetters } from 'vuex'
import { Class } from '@/plugins/api'

export default {
  data: () => ({
    classes: []
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
      this.classes = await Class.fetch({
        ...this.filter,
        department: this.department.id,
        status_in: ['opened', 'running']
      })
    },
    onChange(data) {
      this.$emit('change', data)
    }
  },
  watch: {
    filters(filters) {
      this.fetchClass()
    }
  }
}
</script>
