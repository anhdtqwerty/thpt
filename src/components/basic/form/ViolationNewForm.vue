<template>
  <v-form ref="form" flat class="pt-5">
    <v-row>
      <v-col>
        <DateIOSPicker
          label="Ngày"
          v-model="time"
          outlined
          dense
          deletable-chips
          :hide-details="$vuetify.breakpoint.smAndDown"
          :class="{ 'mb-4': $vuetify.breakpoint.smAndDown }"
        />
      </v-col>
      <v-col></v-col>
    </v-row>

    <v-row>
      <v-col>
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
      </v-col>
      <v-col>
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
      </v-col>
    </v-row>
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
    <v-radio-group v-model="type" row class="shrink mt-0">
      <p class="mr-2 my-0">Mục:</p>
      <v-radio label="Khen thưởng" hide-details value="commendation"></v-radio>
      <v-radio label="Kỷ luật" hide-details value="violation"></v-radio>
    </v-radio-group>

    <v-textarea
      v-model="description"
      label="Nội dung"
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
import DateIOSPicker from '@/components/basic/picker/DateIOSPicker.vue'
import { mapGetters } from 'vuex'
export default {
  components: {
    TextFieldCode,
    AutocompleteGrade,
    AutocompleteClass,
    AutocompleteStudent,
    DateIOSPicker,
  },
  data: () => ({
    ruleRequired: [(v) => !!v || 'Phần này không được trống'],
    grade: '',
    classData: '',
    student: '',
    description: '',
    type: '',
    time:'',
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
          data: {"Date": this.time},
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
        this.data = this.violation.data
      } else {
        this.grade = ''
        this.description = ''
        this.student = ''
        this.classData = ''
        this.type = ''
        this.time =''
        this.data = ''
      }
    },
  },
}
</script>
<style scoped>
</style>>

