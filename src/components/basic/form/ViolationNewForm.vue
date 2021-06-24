<template>
  <v-form ref="form" flat class="pt-5">
    <v-row>
      <v-col>
        <DateIOSPicker
          label="Ngày"
          :date.sync="time"
          outlined
          class="required"
          :rules="[$rules.required, $rules.date, $rules.dateFromNow]"
          dense
        />
      </v-col>
      <v-col></v-col>
    </v-row>
    <v-row>
      <v-col>
        <AutocompleteGrade
          v-model="grade"
          return-object
          label="Khối"
          class="required"
          :rules="[$rules.required]"
          outlined
          dense
          @change="gradeChanged"
        />
      </v-col>
      <v-col>
        <AutocompleteClass
          v-model="classData"
          return-object
          label="Lớp"
          class="required"
          :rules="[$rules.required]"
          outlined
          dense
          clearable
          :filter="gradeId"
          @change="student = null"
        />
      </v-col>
    </v-row>
    <AutocompleteStudent
      :syncedValue.sync="student"
      return-object
      label="Học sinh"
      class="required"
      :rules="[$rules.required]"
      outlined
      dense
      clearable
      :filter="currentClasId"
    />
    <RadioViolation :value="type" @change="type = $event" mandatory />
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
import { mapGetters, mapState } from 'vuex'
import { get } from 'lodash'
import moment from 'moment'

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
    student: {},
    description: '',
    type: '',
    time: moment().toISOString()
  }),
  computed: {
    ...mapGetters('app', ['department']),
    ...mapState('app', ['currentGeneration', 'currentSemester']),

    gradeId() {
      return { grade: get(this.grade, 'id') }
    },
    currentClasId() {
      return { currentClass: get(this.classData, 'id') }
    }
  },
  props: {},
  methods: {
    reset() {
      this.grade = null
      this.classData = null
      this.student = null
      this.description = null
      this.time = moment().toISOString()
      this.type = 'commendation'

      this.$refs.form.resetValidation()
    },
    gradeChanged(grade) {
      this.grade = grade
      this.classData = null
      this.student = null

      this.$refs.form.resetValidation()
    },
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
          date: this.time,
          semester: this.currentSemester.id,
          generation: this.currentGeneration.id
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
        this.reset()
      }
    }
  }
}
</script>
<style scoped></style>>
