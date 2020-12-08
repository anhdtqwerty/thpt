<template>
  <v-autocomplete
    outlined
    dense
    v-bind="this.$attrs"
    item-text="title"
    :items="Products"
    item-value="id"
    @change="onChange"
    return-object
    v-on:input="$emit('input', $event)"
  >
    <template v-slot:selection="data">{{ data.item.title }}</template>
    <template v-slot:item="data">
      <template v-if="typeof data.item !== 'object'">
        <v-list-item-content v-text="data.item"></v-list-item-content>
      </template>
      <template v-else>
        <v-list-item-content>
          <v-list-item-title v-html="data.item.title"></v-list-item-title>
          <v-list-item-subtitle v-html="data.item.descriptions"></v-list-item-subtitle>
        </v-list-item-content>
      </template>
    </template>
  </v-autocomplete>
</template>

<script>
import { mapGetters } from 'vuex'
import { Product } from '@/plugins/api'

export default {
  data: () => ({
    Products: []
  }),
  props: {
    filters: Object,
    options: Object
  },
  computed: {
    ...mapGetters('app', ['department'])
  },
  created () {
    this.fetchProducts()
  },
  methods: {
    async fetchProducts () {
      this.Products = await Product.fetch({
        ...this.filters,
        status_nin: ['block'],
        department: this.department.id
      })
    },
    onChange (data) {
      this.$emit('change', data)
    }
  },
  watch: {
    filters (filters) {
      this.fetchProducts()
    }
  }
}
</script>
