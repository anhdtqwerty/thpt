<template>
  <v-form class="pt-0" flat ref="form">
    <v-radio-group v-model="selectedFactorType" required :rules="rules" row class="shrink mt-0">
      <v-radio label="Miệng" hide-details :value="factorType.oralTest"></v-radio>
      <v-radio label="Thực hành" hide-details :value="factorType.practiceTest"></v-radio>
      <v-radio label="Kiểm tra 15'" hide-details :value="factorType.fifteenMinutesTest"></v-radio>
      <v-radio label="Kiểm tra 1 tiết" hide-details :value="factorType.oneHourTest"></v-radio>
      <v-radio label="Thi học kỳ" hide-details :value="factorType.SemesterExam"></v-radio>
    </v-radio-group>
    <div class="d-flex pt-5">
      <v-text-field
        label="Số điểm tối thiểu trên học sinh"
        class="required col-md-6 mr-4"
        :rules="[$rules.required]"
        v-model="minMark"
        dense
        outlined
        required
      ></v-text-field>
      <v-text-field
        label="Số điểm tối đa trên học sinh"
        class="required col-md-6"
        :rules="[$rules.required]"
        v-model="maxMark"
        dense
        outlined
        required
      ></v-text-field>
    </div>
  </v-form>
</template>
<script>
import { mapState } from 'vuex'
import _ from 'lodash'

const defaultFactorType = {
  oralTest: 'Miệng',
  practiceTest: 'Thực hành',
  fifteenMinutesTest: '15 phút',
  oneHourTest: '1 tiết',
  SemesterExam: 'Học kỳ'
}

export default {
  components: {},
  data() {
    return {
      factorType: defaultFactorType,
      minMark: '',
      maxMark: '',
      selectedFactorType: Object.values(defaultFactorType)[0],
      rules: [
        value => {
          return !_.map(this.factors, 'title').includes(value) || 'Môn học đã tồn tại đầu điểm này'
        }
      ]
    }
  },
  computed: {
    ...mapState('factor', ['factors'])
  },
  props: {
    subject: { type: Object, default: () => {} }
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
          title: this.selectedFactorType,
          data: {
            shortName: this.selectedFactorType,
            minMark: this.minMark,
            maxMark: this.maxMark
          }
        }
      }
      return null
    },
    resetDefault() {
      this.minMark = ''
      this.maxMark = ''
      this.selectedFactorType = Object.values(defaultFactorType)[0]
    }
  },
  created() {
    this.resetDefault()
  }
}
</script>
