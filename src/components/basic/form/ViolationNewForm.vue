<template>
  <v-form ref="form" flat class="pa-6">
    <autocomplete-grade
      v-model="grade"
      item-text="title"
      item-value="id"
      clear-icon="mdi-close"
      clearable
      label="Khối"
      :rules="ruleRequired"
      outlined
      dense
      deletable-chips
      :hide-details="$vuetify.breakpoint.smAndDown"
      :class="{ 'mb-4': $vuetify.breakpoint.smAndDown }"
    />
    <autocomplete-class
      v-model="classData"
      item-text="title"
      item-value="id"
      clear-icon="mdi-close"
      clearable
      :rules="ruleRequired"
      label="Lớp"
      outlined
      dense
      deletable-chips
      :hide-details="$vuetify.breakpoint.smAndDown"
      :class="{ 'mb-4': $vuetify.breakpoint.smAndDown }"
    ></autocomplete-class>
    <autocomplete-student
      v-model="student"
      :rules="ruleRequired"
      clearable
      clear-icon="mdi-close"
      outlined
      label="Tên học sinh"
      dense
      deletable-chips
      :hide-details="$vuetify.breakpoint.smAndDown"
      :class="{ 'mb-4': $vuetify.breakpoint.smAndDown }"
    />
    <!-- <v-select
      v-model="type"
      outlined
      label="Mục"
      :items="options"
      :rules="ruleRequired"
      clearable
      dense
      deletable-chips
      :class="{ 'mb-4': $vuetify.breakpoint.smAndDown }"
      :hide-details="$vuetify.breakpoint.smAndDown"
    /> -->
     <v-radio-group v-model="type" row class="shrink mt-0">
      <p class="mr-2 my-0">Mục: </p>
      <v-radio label="Kỷ luật" hide-details value="violation"></v-radio>
      <v-radio label="Khen thưởng" hide-details value="commendation"></v-radio>
    </v-radio-group>

    <!-- <v-radio-group row class="shrink ml-4 mt-0">
      <p class="mx-2 my-0">Loại nội dung:</p>
      <v-radio label="Điểm" hide-details></v-radio>
      <v-radio label="Nề nếp" hide-details></v-radio>
      <v-radio label="Khác" hide-details></v-radio>
    </v-radio-group> -->

    <v-textarea
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
    AutocompleteStudent,
  },
  data: () => ({
    // options: [
    //   { text: 'Kỷ luật', value: 'violation' },
    //   { text: 'Khen thưởng', value: 'commendation' },
    // ],
    ruleRequired: [(v) => !!v || 'Phần này không được trống'],
    grade: '',
    classData: '',
    student: '',
    description: '',
    type: '',
  }),
  computed: {
    ...mapGetters('app', ['department']),
  },
  props: {},
  methods: {
    reset() {},
    validate() {
      return this.$refs.form.validate()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
    getData() {
      if (this.$refs.form.validate()) {
        return {
          grade: this.grade,
          description: this.description,
          student: this.student,
          classData: this.classData,
          type: this.type,
        }
      }
    },
    resetDefault() {
      if (this.violation) {
        this.grade = this.violation.grade
        this.description = this.violation.description
        this.student = this.violation.student
        this.classData = this.violation.classData
        this.type = this.violation.type
      } else {
        this.grade = ''
        this.description = ''
        this.student = ''
        this.classData = ''
        this.type = ''
      }
    },
  },
  created() {
    this.resetDefault()
  },
}
</script>
<style scoped>
</style>>

