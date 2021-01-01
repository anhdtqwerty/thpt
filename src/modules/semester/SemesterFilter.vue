<template>
  <v-form>
    <div class="d-flex">
      <autocomplete-generation
        v-model="generation"
        class="mr-4"
        placeholder="Năm học"
        filled
        dense
        clearable
      ></autocomplete-generation>
      <v-btn
        class="py-5"
        color="primary"
        outlined
        @click="onFilterChanged"
      >
        <v-icon left>mdi-filter-outline</v-icon>Lọc
      </v-btn>
    </div>
  </v-form>
</template>

<script>
import AutocompleteGeneration from '@/components/basic/input/AutocompleteGeneration'

export default {
  components: {
    AutocompleteGeneration,
  },
  data: () => ({
    generation: '',
  }),
  computed: {},
  methods: {
    onFilterChanged() {
      this.$emit('onFilterChanged', {
        generation: this.generation,
      })
    },
  },
}
</script>
