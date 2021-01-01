<template>
  <v-form ref="form" flat class="pa-6">
    <p class="h6 font-weight-bold">Năm học ....(từ ngày....)</p>
    <autocomplete-grade
      v-model="grade"
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
      v-model="class_data"
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
      item-value="id"
      dense
      deletable-chips
      :hide-details="$vuetify.breakpoint.smAndDown"
      :class="{ 'mb-4': $vuetify.breakpoint.smAndDown }"
    />
    <v-autocomplete
      v-model="status"
      outlined
      label="Mục"
      :items="options"
      :rules="ruleRequired"
      clearable
      dense
      deletable-chips
      :class="{ 'mb-4': $vuetify.breakpoint.smAndDown }"
      :hide-details="$vuetify.breakpoint.smAndDown"
    >
    </v-autocomplete>
    <v-radio-group v-model="type" row class="shrink ml-4 mt-0">
      <p class="mx-2 my-0">Loại nội dung:</p>
      <v-radio label="Điểm" hide-details></v-radio>
      <v-radio label="Nề nếp" hide-details></v-radio>
      <v-radio label="Khác" hide-details></v-radio>
    </v-radio-group>

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
    options: ['Kỷ luật', 'Khen thưởng'],
    ruleRequired: [(v) => !!v || 'Phần này không được trống'],
    grade: '',
    class_data: '',
    student:'',
    status:'',
    description: '',
    type:''
  }),
  computed: {
    ...mapGetters('app', ['department']),
  },
  props: {},
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
        grade: this.grade,
        description: this.class_data,
        student: this.student,
        status: this.status,
        class_data: this.class_data,
        type : this.type
      }
    },
    refresh() {
      if (this.violation) {
        this.grade = this.violation.grade
        this.description=this.violation.description
        this.student=this.violation.student
        this.status=this.violation.status
        this.class_data=this.violation.class_data
        this.type = this.violation.type
      }
    },
  },
  created() {
    this.reset()
  },
}
</script>
<style scoped>
</style>>

