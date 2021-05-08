<template>
  <v-form ref="form" flat class="pt-6">
    <v-text-field
      label="Tên ban mới"
      v-model="title"
      dense
      outlined
      class="required"
      :rules="[$rules.required]"
    ></v-text-field>
    <autocomplete-grade
      v-model="grade"
      item-text="title"
      item-value="id"
      clear-icon="mdi-close"
      clearable
      label="Khối"
      outlined
      dense
      class="required"
      :rules="[$rules.required]"
      @change="onGradeChanged"
    />
    <autocomplete-subject
      v-model="subjects"
      outlined
      item-value="id"
      clear-icon="mdi-close"
      clearable
      label="Môn học"
      multiple
      dense
      :filter="gradeId"
    />
    <v-textarea ref="description" v-model="description" label="Ghi chú" outlined dense></v-textarea>
  </v-form>
</template>
<script>
import AutocompleteGrade from '@/components/basic/input/AutocompleteGrade'
import AutocompleteSubject from '@/components/basic/input/AutocompleteSubject.vue'
import { mapGetters } from 'vuex'
export default {
  components: {
    AutocompleteGrade,
    AutocompleteSubject
  },
  data: () => ({
    valid: true,
    subjects: '',
    description: '',
    title: '',
    grade: ''
  }),
  computed: {
    ...mapGetters('app', ['department']),
    gradeId() {
      return { grade: this.grade }
    }
  },
  props: {
    division: { type: Object, default: () => {} },
    editCode: { type: Boolean, default: false }
  },
  methods: {
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
    validate() {
      return this.$refs.form.validate()
    },
    getData() {
      return {
        title: this.title,
        description: this.description,
        grade: this.grade,
        subjects: this.subjects
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
    onGradeChanged(grade) {
      this.grade = grade
      this.subjects = []
    }
  },
  created() {
    this.resetDefault()
  }
}
</script>
