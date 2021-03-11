<template>
  <v-form ref="form" flat class="pt-5">
    <p class="font-weight-regular">Ngày: {{ formatDate(this.violation) }}</p>
    <v-row class="py-3">
      <v-col cols="6">
        <card-student-name :student="this.student" link />
      </v-col>
      <v-col cols="4">
        <div>Ngày sinh</div>
        <h4>{{ this.student.dob }}</h4 >
      </v-col>
      <v-col cols="2">
        <div>Lớp</div>
        <h4>{{ this.classData.title }}</h4>
      </v-col>
    </v-row>

    <v-radio-group v-model="type" row class="shrink mt-0">
      <p class="mr-2 my-0">Mục:</p>
      <v-radio label="Kỷ luật" hide-details value="violation"></v-radio>
      <v-radio label="Khen thưởng" hide-details value="commendation"></v-radio>
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
import moment from 'moment'
import { get } from 'lodash'
import CardStudentName from '@/components/basic/card/CardStudentName.vue'

export default {
  components: {
    TextFieldCode,
    AutocompleteGrade,
    AutocompleteClass,
    AutocompleteStudent,
    CardStudentName,
  },
  data: () => ({
    options: [
      { text: 'Kỷ luật', value: 'violation' },
      { text: 'Khen thưởng', value: 'commendation' },
    ],
    ruleRequired: [(v) => !!v || 'Phần này không được trống'],
    grade: '',
    classData: '',
    student: '',
    description: '',
    type: '',
    createdAt: '',
  }),
  computed: {
    ...mapGetters('app', ['department']),
    avatar() {
      return _.get(this.student, 'avatar.url', '/default-avatar.png')
    },
  },
  props: {
    violation: { type: Object, default: () => {} },
  },
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
      if (this.$refs.form.validate()) {
        return {
          grade: this.grade,
          description: this.description,
          student: this.student,
          classData: this.class,
          type: this.type,
        }
      }
    },
    resetDefault() {
      if (this.violation) {
        this.grade = this.violation.grade
        this.description = this.violation.description
        this.student = this.violation.student
        this.classData = this.violation.class
        this.type = this.violation.type
      } else {
        this.grade = ''
        this.description = ''
        this.student = ''
        this.classData = ''
        this.type = ''
      }
    },
    formatDate(item) {
      return get(item, 'createdAt', '')
        ? moment(item.createdAt).format('DD/MM/YYYY')
        : ''
    },
  },
  created() {
    this.resetDefault()
  },
}
</script>