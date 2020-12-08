<template>
  <v-dialog fullscreen v-model="dialog">
    <v-card>
      <v-toolbar dense class="elevation-0" color="#0D47A1" dark>
        <v-toolbar-title>LỌC TÌM KIẾM</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon @click="cancel">close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-divider />
      <v-form class="pa-4">
        <v-autocomplete
          v-model="selectedCourse"
          item-text="tags"
          item-value="id"
          clear-icon="mdi-close"
          placeholder="Nhập tên nhóm"
          deletable-chips
          clearable
          multiple
          flat
          filled
          dense
          return-object
        />
        <autocomplete-generation
          v-model="generation"
          item-text="name"
          item-value="id"
          placeholder="Chọn khóa"
          return-object
          deletable-chips
          clearable
          multiple
          flat
          filled
          dense
        ></autocomplete-generation>
        <v-text-field
          v-model="code"
          :items="classStatus"
          clear-icon="mdi-close"
          placeholder="Mã học viên"
          flat
          filled
          dense
          clearable
        />
        <v-autocomplete
          v-model="status"
          :items="classStatus"
          clear-icon="mdi-close"
          item-text="title"
          item-value="status"
          placeholder="Chọn trạng thái"
          flat
          filled
          dense
          clearable
          deletable-chips
        ></v-autocomplete>
        <autocomplete-root-major
          v-model="major"
          item-text="title"
          item-value="id"
          placeholder="Chọn chuyên ngành"
          flat
          filled
          auto-select-first
          dense
          clearable
        />
      </v-form>
      <v-card-actions class="pa-4">
        <v-spacer></v-spacer>
        <v-btn
          depressed
          color="#0D47A1"
          @click="onFilterChanged"
          dark
        >
          <v-icon left dark>mdi-filter-outline</v-icon>Lọc
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex'
import AutocompleteRootMajor from '@/components/basic/input/AutocompleteRootMajor'
import AutocompleteGeneration from '@/components/basic/input/AutocompleteGeneration'

export default {
  components: {
    AutocompleteRootMajor,
    AutocompleteGeneration,
  },
  props: {
    state: Boolean,
  },
  data: () => ({
    show: false,
    query: '',
    major: {},
    status: 'running',
    generation: '',
    code: '',
    tags: '',
    selectedCourse: [],
    dialog: false,
  }),
  computed: {
    ...mapState('constant', ['classStatus']),
  },
  methods: {
    onFilterChanged() {
      console.log({
        generation: this.generation,
        tags_contains: this.tags,
        rootMajor: this.major,
        code_contains: this.code,
        _sort: 'createdAt:desc',
      })
      this.$emit('onFilterChanged', {
        generation: this.generation,
        tags_contains: this.tags,
        rootMajor: this.major,
        code_contains: this.code,
        _sort: 'createdAt:desc',
      })
    },
    cancel() {
      this.dialog = false
      this.reset()
      this.$emit('cancel')
    },
    reset() {
      this.selectedCourse = ''
      this.generation = ''
      this.code = ''
      this.status = ''
      this.major = ''
    },
  },
  watch: {
    state(state) {
      this.dialog = true
    },
  },
}
</script>
