<template>
  <v-form>
    <v-row no-gutters>
      <v-col cols="6">
        <autocomplete-generation
          v-model="generation"
          class="mr-4"
          placeholder="Năm học"
          outlined
          dense
          clearable
        ></autocomplete-generation>
      </v-col>

      <v-col cols="6">
        <v-btn
          class="py-1 px-2"
          color="primary"
          height="40"
          outlined
          @click="onFilterChanged"
        >
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
