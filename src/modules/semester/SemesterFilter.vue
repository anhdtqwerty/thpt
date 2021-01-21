<template>
  <v-form>
    <v-row >
      <v-col cols="4">
        <autocomplete-generation
          v-model="generation"
          placeholder="Năm học"
          outlined
          dense
          clearable
        ></autocomplete-generation>
      </v-col>

      <v-col cols="4">
        <v-btn color="primary" height="40" outlined @click="onFilterChanged">
          <v-icon left>mdi-filter-outline</v-icon>Lọc
        </v-btn>
      </v-col>
    </v-row>
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
