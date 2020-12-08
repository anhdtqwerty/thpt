<template>
  <v-form>
    <v-row v-show="show" class="mt-n6 mb-2 kid">
      <v-col cols="12" md="3">
        <v-text-field
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
      </v-col>
      <v-col cols="12" md="3">
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
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="3">
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
      </v-col>
      <v-col cols="12" md="3">
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
      </v-col>
      <v-col cols="12" md="3">
        <autocomplete-root-major
          v-model="major"
          item-text="title"
          item-value="id"
          placeholder="Chọn chuyên ngành"
          flat
          filled
          auto-select-first
          dense
          required
          clearable
        />
      </v-col>
      <v-col cols="12" md="3" class="d-flex justify-end">
        <v-btn
          depressed
          width="120px"
          height="38px"
          color="white"
          @click="show = !show"
          class="grey--text darken-1--text"
        >
          <v-icon left dark>{{
            show ? 'mdi-chevron-up' : 'mdi-chevron-down'
          }}</v-icon
          >Nâng cao
        </v-btn>
        <v-btn
          depressed
          width="80px"
          height="38px"
          color="#0D47A1"
          @click="onFilterChanged"
          class="white--text ml-4"
        >
          <v-icon left dark>mdi-filter-outline</v-icon>Lọc
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import AutocompleteRootMajor from '@/components/basic/input/AutocompleteRootMajor'
import AutocompleteGeneration from '@/components/basic/input/AutocompleteGeneration'

export default {
  components: {
    AutocompleteRootMajor,
    AutocompleteGeneration
  },
  data: () => ({
    show: false,
    query: '',
    major: {},
    status: 'running',
    generation: '',
    code: '',
    tags: '',
    selectedCourse: []
  }),
  computed: {
    ...mapState('constant', ['classStatus'])
  },
  methods: {
    onFilterChanged() {
      console.log({
        generation: this.generation,
        tags_contains: this.tags,
        rootMajor: this.major,
        code_contains: this.code,
        _sort: 'createdAt:desc'
      })
      this.$emit('onFilterChanged', {
        generation: this.generation,
        tags_contains: this.tags,
        rootMajor: this.major,
        code_contains: this.code,
        _sort: 'createdAt:desc'
      })
    }
  }
}
</script>
