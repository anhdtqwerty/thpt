<template>
  <v-form>
    <v-row>
      <v-col cols="10">
        <v-row>
          <v-col cols="4">
            <v-text-field
              v-model="name"
              label="Tên giáo viên"
              return-object
              clearable
              flat
              outlined
              dense
              hide-details
            />
          </v-col>
          <v-col cols="4">
            <v-select
              :items="types"
              item-text="title"
              item-value="value"
              v-model="type"
              label="Loại cán bộ"
              outlined
              dense
              clearable
              hide-details
            ></v-select>
          </v-col>
          <v-col cols="4">
            <autocomplete-subject
              v-model="subject"
              clear-icon="mdi-close"
              label="Lĩnh vực"
              clearable
              outlined
              dense
              return-object
              hide-details
            />
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="2">
        <v-btn
          height="40"
          color="#0D47A1"
          @click="onFilterChanged"
          outlined
        >
          <v-icon left dark>mdi-filter-outline</v-icon>Lọc
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import AutocompleteSubject from '@/components/basic/input/AutocompleteSubject'

export default {
  components: {
    AutocompleteSubject,
  },
  data: () => ({
    query: '',
    dialog: false,
    name: '',
    subject: '',
    type: '',
    filterState: false,
    types: [
      { value: 'short-tern', title: 'Ngắn hạn' },
      { value: 'long-tern', title: 'Dài hạn' },
    ],
  }),
  methods: {
    onFilterChanged() {
      this.$emit('onFilterChanged', {
        id: this.id,
        name_contains: this.name,
        subject: this.subject.id,
        type: this.type,
      })
    },
    onFilterDialogChange(id) {
      this.$emit('onFilterChanged', id)
    },
  },
}
</script>
