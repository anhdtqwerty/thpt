<template>
  <v-form v-model="valid" ref="form" v-bind="this.$attrs">
    <v-col class="pb-0 pl-0" cols="12" md="6">
      <autocomplete-class
        v-model="classData"
        return-object
        label="Lớp"
        outlined
        dense
        :rules="[$rules.required]"
        class="required"
      />
    </v-col>
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
      default: () => {}
    }
  },
  data: () => ({
    valid: true,
    classData: null
  }),
  created() {
    if (this.student) {
      this.classData = this.student.currentClass
    }
  },
  methods: {
    validate() {
      return this.$refs.form.validate()
    },
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
    getData() {
      return {
        class: this.classData.id,
        grade: this.classData.grade.id
      }
    }
  },
  watch: {
    student(student) {
      this.classData = student.currentClass
    }
  }
}
</script>

<style scoped></style>
