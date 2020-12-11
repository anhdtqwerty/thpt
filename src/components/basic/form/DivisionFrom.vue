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
    <v-autocomplete
      v-model="grade"
      :items="items_grades"
      outlined
      dense
      label="Chọn khối"
    >
    </v-autocomplete>
    <v-autocomplete
      v-model="subjects"
      :items="items"
      outlined
      dense
      label="Môn học"
    >
    </v-autocomplete>
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
import { mapGetters } from 'vuex'
export default {
  components: {
    TextFieldCode,
  },
  data: () => ({
    valid: true,
    subjects: '',
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
          subjects: this.subjects.id,
        }
      }
    },
    resetDefault() {
      if (this.generation) {
        this.grade = this.division.code
        this.description = this.division.description
        this.name = this.division.name
        this.subjects = this.division.subject
      } else {
        this.name = ''
        this.description = ''
        this.grade = ''
        this.subjects = ''
      }
    }
  },
  created() {
    this.resetDefault()
  }
}
</script>