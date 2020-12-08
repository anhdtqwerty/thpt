<template>
  <v-form v-model="valid" ref="form">
    <v-row>
      <v-col cols="12" md="6">
        <autocomplete-generation
          v-model="generation"
          item-text="name"
          item-value="id"
          label="Khóa"
          placeholder="Chọn khóa"
          required
          dense
          outlined
        ></autocomplete-generation>
        <autocomplete-root-major
          v-model="rootMajor"
          item-text="title"
          label="Chuyên Ngành"
          return-object
          required
          dense
          outlined
        />
      </v-col>

      <v-col cols="12" md="6">
        <autocomplete-major
          v-model="majors"
          multiple
          dense
          label="Chuyên Ngành"
          placeholder="Chọn Chuyên Ngành Hẹp"
          outlined
          item-text="title"
          item-value="id"
        ></autocomplete-major>
        <v-text-field
          ref="tags"
          v-model="tags"
          label="Nhóm"
          placeholder="Nhập cách nhau bởi dấu phẩy"
          required
          dense
          outlined
        ></v-text-field>
      </v-col>
    </v-row>      
  </v-form>
</template>

<script>
import AutocompleteGeneration from '@/components/basic/input/AutocompleteGeneration'
import AutocompleteRootMajor from '@/components/basic/input/AutocompleteRootMajor'
import AutocompleteMajor from '@/components/basic/input/AutocompleteMajor'
import { get } from 'lodash'
export default {
  components: {
    AutocompleteGeneration,
    AutocompleteRootMajor,
    AutocompleteMajor,
  },
  props: {
    student: {
      type: [Object],
      required: true,
      default: () => {},
    },
  },
  data: () => ({
    valid: true,
    tags: '',
    generation: '',
    majors: [],
    rootMajor: {},
  }),
  computed: {
    majorList() {
      return get(this.rootMajor, 'majors', this.majors)
    },
  },
  created() {
    this.reset()
  },
  methods: {
    validate() {
      return this.$refs.form.validate()
    },
    reset() {
      this.generation = this.student.generation
      this.tags = this.student.tags
      this.majors = this.student.majors
      this.rootMajor = this.student.rootMajor
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
    getData() {
      return {
        generation: this.generation,
        tags: this.tags,
        majors: this.majors,
        rootMajor: get(this.rootMajor, 'id'),
      }
    },
  },
  watch: {
    student(student) {
      this.reset()
    },
  },
}
</script>

<style scoped>
</style>
