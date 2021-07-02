<template>
  <v-form ref="form" flat class="pt-5">
    <v-text-field
      label="Tên ban mới"
      v-model="title"
      dense
      outlined
      required
      class="required"
      :rules="[$rules.required]"
    ></v-text-field>
    <autocomplete-grade
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
  methods: {
    reset() {
      this.$refs.form.reset()
    },
    validate() {
      return this.$refs.form.validate()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
    getData() {
      return {
        title: this.title,
        description: this.description,
        grade: this.grade,
        subjects: this.subjects
      }
    },
    onGradeChanged(grade) {
      this.grade = grade
      this.subjects = []
    }
  }
}
</script>
