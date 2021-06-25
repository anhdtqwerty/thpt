<template>
  <v-form ref="form" flat class="pt-5">
    <p class="font-weight-regular">Ngày: {{ violation.date | ddmmyyyy }}</p>
    <v-row class="pb-3">
      <v-col cols="6">
        <div class="text-caption my-0">Học sinh</div>
        <CardStudentName :isShowCode="false" :student="student" />
      </v-col>
      <v-col class="d-flex justify-space-between align-center" cols="6">
        <div>
          <div class="text-caption my-0">Ngày sinh</div>
          <span class="black--text">{{ student.dob | ddmmyyyy }}</span>
        </div>
        <div>
          <div class="text-caption my-0">Mã số</div>
          <span class="black--text">{{ student.code | getStudentCode }}</span>
        </div>
        <div>
          <div class="text-caption my-0">Lớp</div>
          <span class="black--text">{{ violation.class && violation.class.title }}</span>
        </div>
      </v-col>
    </v-row>
    <RadioViolation :violation="violation.type" @change="type = $event" />
    <v-textarea
      v-model="description"
      label="Nội dung"
      class="required"
      :rules="[$rules.required]"
      outlined
      dense
    ></v-textarea>
  </v-form>
</template>
<script>
import { mapGetters } from 'vuex'
import CardStudentName from '@/components/basic/card/CardStudentName.vue'
import RadioViolation from '@/modules/violation/RadioViolation.vue'

export default {
  components: {
    CardStudentName,
    RadioViolation
  },
  data: () => ({
    options: [
      { text: 'Kỷ luật', value: 'violation' },
      { text: 'Khen thưởng', value: 'commendation' }
    ],
    ruleRequired: [v => !!v || 'Phần này không được trống'],
    grade: '',
    classData: '',
    student: '',
    description: '',
    type: '',
    createdAt: ''
  }),
  computed: {
    ...mapGetters('app', ['department'])
    // avatar() {
    //   return _.get(this.student, 'avatar.url', '/default-avatar.png')
    // }
  },
  props: {
    violation: { type: Object, default: () => {} }
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
          type: this.type
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
    }
  },
  created() {
    this.resetDefault()
  }
}
</script>
