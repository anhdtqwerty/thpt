<template>
  <div>
    <v-row no-gutters>
      <autocomplete-teacher
        v-model="name"
        item-text=""
        item-value=""
        label="Họ tên"
        class="mr-4"
        filled
        clearable
        single-line
        dense
      ></autocomplete-teacher>
      <v-btn
        class="py-5"
        outlined
        height="41"
        color="#0D47A1"
        @click="onFilterChanged"
      >
        <v-icon left>mdi-filter-outline</v-icon>Lọc
      </v-btn>
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
