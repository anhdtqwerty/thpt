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
      <autocomplete-semester
        v-model="semester"
        class="mr-4"
        placeholder="Học kỳ"
        filled
        dense
        clearable
      ></autocomplete-semester>
      <v-btn
        class="py-5"
        depressed
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
import AutocompleteSemester from '@/components/basic/input/AutocompleteSemester'

export default {
  components: {
    AutocompleteGeneration,
    AutocompleteSemester,
  },
  data: () => ({
    generation: '',
    semester: '',
  }),
  computed: {},
  methods: {
    onFilterChanged() {
      this.$emit('onFilterChanged', {
        generation: this.generation,
        semester: this.semester,
      })
    },
  },
}
</script>
