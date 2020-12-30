<template>
  <v-form ref="form" flat class="pa-6">
    <p class="h6 font-weight-bold">Năm học ....(từ ngày....)</p>
    <autocomplete-grade
      v-model="grade.title"
      item-text="title"
      item-value="id"
      clear-icon="mdi-close"
      clearable
      label="Khối"
      outlined
      dense
      deletable-chips
      :hide-details="$vuetify.breakpoint.smAndDown"
      :class="{ 'mb-4': $vuetify.breakpoint.smAndDown }"
    />
    <autocomplete-class
      v-model="title"
      item-text="title"
      item-value="id"
      clear-icon="mdi-close"
      clearable
      label="Lớp"
      outlined
      dense
      deletable-chips
      :hide-details="$vuetify.breakpoint.smAndDown"
      :class="{ 'mb-4': $vuetify.breakpoint.smAndDown }"
  ></autocomplete-class>
    <autocomplete-student>

    </autocomplete-student>
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
import AutocompleteClass from '@/components/basic/input/AutocompleteClass.vue'
import AutocompleteStudent from '@/components/basic/input/AutocompleteStudent.vue'
import { mapGetters } from 'vuex'
export default {
  components: {
    TextFieldCode,
    AutocompleteGrade,
    AutocompleteClass,
    AutocompleteStudent
  },
  data: () => ({
    valid: true,
    subjects: '',
    description: '',
    title: '',
    grade: '',
  }),
  computed: {
    ...mapGetters('app', ['department']),
  },
  props: {
    violation: { type: Object, default: () => {} },
    editCode: { type: Boolean, default: false },
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