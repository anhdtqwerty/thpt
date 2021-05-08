<template>
  <v-form ref="form" flat class="pt-5">
    <v-row>
      <v-col>
        <DateIOSPicker
          label="Ngày"
          v-model="time"
          outlined
          class="required"
          :rules="[$rules.required, $rules.date]"
          dense
        />
      </v-col>
      <v-col></v-col>
    </v-row>
    <v-row>
      <v-col>
        <AutocompleteGrade
          return-object
          label="Khối"
          class="required"
          :rules="[$rules.required]"
          outlined
          dense
          clearable
          @change="grade = $event"
        />
      </v-col>
      <v-col>
        <AutocompleteClass
          return-object
          label="Lớp"
          class="required"
          :rules="[$rules.required]"
          outlined
          dense
          clearable
          :filter="gradeId"
          @change="classData = $event"
        />
      </v-col>
    </v-row>
    <AutocompleteStudent
      return-object
      label="Học sinh"
      class="required"
      :rules="[$rules.required]"
      outlined
      dense
      clearable
      :filter="currentClasId"
      @change="student = $event"
    />
    <RadioViolation @change="type = $event" />
    <v-textarea
      class="required"
      :rules="[$rules.required]"
      v-model="description"
      label="Nội dung"
      outlined
      dense
    ></v-textarea>
  </v-form>
</template>
<script>
import AutocompleteGrade from '@/components/basic/input/AutocompleteGrade'
import AutocompleteClass from '@/components/basic/input/AutocompleteClass.vue'
import AutocompleteStudent from '@/components/basic/input/AutocompleteStudent.vue'
import DateIOSPicker from '@/components/basic/picker/DateIOSPicker.vue'
import RadioViolation from '@/modules/violation/RadioViolation.vue'
import { mapGetters } from 'vuex'
import { get } from 'lodash'

export default {
  components: {
    AutocompleteGrade,
    AutocompleteClass,
    AutocompleteStudent,
    DateIOSPicker,
    RadioViolation
  },
  data: () => ({
    grade: '',
    classData: '',
    student: '',
    description: '',
    type: '',
    time: ''
  }),
  computed: {
    ...mapGetters('app', ['department']),
    gradeId() {
      return { grade: get(this.grade, 'id') }
    },
    currentClasId() {
      return { currentClass: get(this.classData, 'id') }
    }
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
          date: this.time
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
        this.$refs.form.reset()
      }
    }
  }
}
</script>
<style scoped></style>>
