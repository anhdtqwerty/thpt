<template>
  <div>
    <v-row no-gutters>
      <v-col cols="6">
        <autocomplete-teacher
          v-model="name"
          label="Họ tên"
          class="mr-4"
          outlined
          clearable
          single-line
          dense
        ></autocomplete-teacher>
      </v-col>
      <v-col>
        <v-btn
          height="40"
          outlined
          color="#0D47A1"
          @click="onFilterChanged"
        >
          <v-icon left>mdi-filter-outline</v-icon>Lọc
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import AutocompleteTeacher from '@/components/basic/input/AutocompleteTeacher'

export default {
  components: {
    AutocompleteTeacher,
  },
  data: () => ({
    query: '',
    dialog: false,
    name: '',
    filterState: false,
  }),
  methods: {
    onFilterChanged() {
      this.$emit('onFilterChanged', {
        id: this.name,
      })
    },
    onFilterDialogChange(id) {
      this.$emit('onFilterChanged', id)
    },
  },
}
</script>
