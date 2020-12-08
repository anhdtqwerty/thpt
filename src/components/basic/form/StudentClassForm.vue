<template>
  <v-form v-model="valid" ref="form">
    <autocomplete-class
      v-model="classes"
      item-text="name"
      item-value="id"
      label="Lớp"
      placeholder="Chọn Lớp Học"
      required
      dense
      multiple
      outlined
    ></autocomplete-class>
  </v-form>
</template>

<script>
import AutocompleteClass from '@/components/basic/input/AutocompleteClass'
export default {
  components: {
    AutocompleteClass
  },
  props: {
    student: {
      type: [Object],
      required: true,
      default: () => {}
    }
  },
  data: () => ({
    valid: true,
    classes: []
  }),
  created() {
    this.reset()
  },
  methods: {
    validate() {
      return this.$refs.form.validate()
    },
    reset() {
      this.classes = this.student.classes
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
    getData() {
      return {
        classes: this.classes.map(c => c.id)
      }
    }
  },
  watch: {
    student(student) {
      this.reset()
    }
  }
}
</script>

<style scoped></style>
