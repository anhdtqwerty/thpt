<template>
  <v-form ref="form" flat class="pa-6">
    <p class="h6 font-weight-bold">Năm học ....(từ ngày....)</p>
    <v-text-field
      label="Tên ban mới"
      v-model="name"
      dense
      outlined
      required
    ></v-text-field>
    <autocomplete-grade
              v-model="grade"
              item-text="name"
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
import { mapGetters } from 'vuex'
export default {
  components: {
    TextFieldCode,
    AutocompleteGrade,
  },
  data: () => ({
    valid: true,
    // subjects: '',
    description: '',
    name: '',
    grade:'',
  }),
  computed: {
    ...mapGetters('app', ['department']),
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
    getData() {
      if (this.$refs.form.validate()) {
        return {
          name: this.name,
          description: this.description,
          grade: this.grade,
          // subjects: this.subjects.id,
        }
      }
    },
    resetDefault() {
      if (this.generation) {
        this.grade = this.division.code
        this.description = this.division.description
        this.name = this.division.name
        // this.subjects = this.division.subject
      } else {
        this.name = ''
        this.description = ''
        this.grade = ''
        // this.subjects = ''
      }
    }
  },
  created() {
    this.resetDefault()
  }
}
</script>