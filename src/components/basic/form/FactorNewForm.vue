<template>
  <v-form class="pt-0" flat ref="form">
    <v-radio-group v-model="selectedFactorType" required :rules="rules" row class="shrink mt-0">
      <v-radio
        v-for="item in defaultFactorTypes"
        :key="item.type"
        :label="item.name"
        hide-details
        :value="item.type"
      ></v-radio>
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
const defaultFactorTypes = [
  { name: 'Miệng', type: 'oralTest' },
  { name: 'Thực hành', type: 'practiceTest' },
  { name: '15 phút', type: 'fifteenMinutesTest' },
  { name: '1 tiết', type: 'oneHourTest' },
  { name: 'Học kỳ', type: 'SemesterExam' }
]

export default {
  components: {},
  props: {
    subject: { type: Object, default: () => {} },
    state: Boolean
  },
  data() {
    return {
      minMark: '',
      maxMark: '',
      defaultFactorTypes: defaultFactorTypes,
      selectedFactorType: defaultFactorTypes[0].type,
      rules: [
        value => {
          return !_.map(this.factors, 'type').includes(value) || 'Môn học đã tồn tại đầu điểm này'
        }
      ]
    }
  },
  computed: {
    ...mapState('factor', ['factors'])
  },
  methods: {
    getData() {
      if (this.$refs.form.validate()) {
        const name = defaultFactorTypes.find(m => m.type === this.selectedFactorType).name
        return {
          title: name,
          type: this.selectedFactorType,
          quantity: this.maxMark,
          data: {
            shortName: name,
            minMark: this.minMark,
            maxMark: this.maxMark
          }
        }
      }
      return null
    }
  },
  watch: {
    state(state) {
      if (state) {
        this.selectedFactorType = defaultFactorTypes[0].type
      } else {
        this.$refs.form.reset()
      }
    }
  }
}
</script>
