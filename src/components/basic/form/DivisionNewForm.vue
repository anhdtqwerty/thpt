<template>
  <v-form ref="form" flat class="pt-5">
    <v-text-field
      label="Tên ban mới"
      v-model="title"
      dense
      outlined
      required
    ></v-text-field>
    <autocomplete-grade
      v-model="grade"
      clear-icon="mdi-close"
      clearable
      label="Khối"
      outlined
      dense
      :hide-details="$vuetify.breakpoint.smAndDown"
      :class="{ 'mb-4': $vuetify.breakpoint.smAndDown }"
    />
    <autocomplete-subject
      v-model="subjects"
      outlined
      clear-icon="mdi-close"
      clearable
      label="Môn học"
      multiple
      dense
      :hide-details="$vuetify.breakpoint.smAndDown"
      :class="{ 'mb-4': $vuetify.breakpoint.smAndDown }"
    />
    <v-textarea
      ref="description"
      v-model="description"
      label="Ghi chú"
      outlined
      dense
    ></v-textarea>
  </v-form>
</template>
<script>
import TextFieldCode from '@/components/basic/input/TextFieldCode'
import AutocompleteGrade from '@/components/basic/input/AutocompleteGrade'
import AutocompleteSubject from '@/components/basic/input/AutocompleteSubject.vue'
import { mapGetters } from 'vuex'
export default {
  components: {
    TextFieldCode,
    AutocompleteGrade,
    AutocompleteSubject,
  },
  data: () => ({
    subjects: '',
    description: '',
    title: '',
    grade: '',
  }),
  computed: {
    ...mapGetters('app', ['department']),
  },
  methods: {
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
    getData() {
      if (this.$refs.form.validate()) {
        return {
          title: this.title,
          description: this.description,
          grade: this.grade,
          subjects: this.subjects,
        }
      }
    },
    resetDefault() {
      if (this.division) {
        this.grade = this.division.grade
        this.description = this.division.description
        this.title = this.division.title
        this.subjects = this.division.subjects
      } else {
        this.title = ''
        this.description = ''
        this.grade = ''
        this.subjects = ''
      }
    },
  },
  created() {
    this.resetDefault()
  },
}
</script>