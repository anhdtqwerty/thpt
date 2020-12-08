<template>
  <v-form ref="form" v-model="valid" flat class="pa-4">
    <v-text-field
      :rules="required"
      label="Tên"
      v-model="title"
      outlined
      required
      dense
    ></v-text-field>
    <autocomplete-major
      v-model="rootMajor"
      item-text="title"
      item-value="id"
      label="Chuyên Ngành"
      :rules="required"
      return-object
      dense
      outlined
    ></autocomplete-major>
    <v-autocomplete
      :disabled="!isRootChosen"
      v-model="major"
      :items="getMajorsByRoot"
      item-text="title"
      item-value="id"
      label="Chuyên Ngành"
      return-object
      :rules="required"
      outlined
      dense
    />
    <autocomplete-course
      v-model="course"
      item-text="title"
      item-value="id"
      label="Khóa Học"
      :rules="required"
      dense
      outlined
    ></autocomplete-course>
    <v-textarea
      ref="description"
      v-model="description"
      label="Mô Tả"
      placeholder="Nhập mô tả"
      required
      dense
      outlined
    ></v-textarea>
    <v-text-field
      ref="link"
      v-model="link"
      label="Đường dẫn"
      placeholder="Nhập đường dẫn tới bài viết"
      required
      dense
      outlined
    ></v-text-field>
    <div class="d-flex">
      <v-checkbox v-model="isFeature" label="Đưa lên đầu trang"></v-checkbox>
      <v-spacer />
      <v-checkbox
        v-model="isHighlight"
        label="Đưa lên đầu danh mục"
      ></v-checkbox>
    </div>
    <v-file-input
      v-model="file"
      color="deep-purple accent-4"
      counter
      label="File input"
      :rules="required"
      placeholder="Tải ảnh lên"
      outlined
      required
      :show-size="1000"
    >
      <template v-slot:selection="{ index, text }">
        <v-chip
          v-if="index < 2"
          color="deep-purple accent-4"
          dark
          label
          small
          >{{ text }}</v-chip
        >

        <span
          v-else-if="index === 2"
          class="overline grey--text text--darken-3 mx-2"
          >+{{ files.length - 2 }} File(s)</span
        >
      </template>
    </v-file-input>
  </v-form>
</template>
<script>
import { mapGetters } from 'vuex'
import AutocompleteMajor from '@/components/basic/input/AutocompleteRootMajor.vue'
import AutocompleteCourse from '@/components/basic/input/AutocompleteCourse.vue'
export default {
  components: { AutocompleteMajor, AutocompleteCourse },
  data: () => ({
    valid: false,
    required: [(v) => !!v || 'Name is required'],
    description: '',
    title: '',
    major: '',
    link: '',
    course: '',
    rootMajor: '',
    isHighlight: false,
    isFeature: false,
    file: null,
  }),
  computed: {
    ...mapGetters('app', ['department']),
    getMajorsByRoot() {
      if (this.rootMajor) return this.rootMajor.majors
      return []
    },
    isRootChosen() {
      return this.rootMajor !== null && typeof this.rootMajor !== 'undefined'
    },
  },
  methods: {
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
    validate() {
      this.$refs.form.validate()
      return this.valid
    },
    getData() {
      return {
        description: this.description,
        title: this.title,
        file: this.file,
        course: this.course,
        link: this.link,
        major: this.major.id,
        position: `${this.isFeature ? 'home-page,' : ''} ${
          this.isHighlight ? 'highlight,' : ''
        }`,
        department: this.department.id,
      }
    },
  },
  created() {},
  watch: {},
}
</script>

<style scoped>
</style>
