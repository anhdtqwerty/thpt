<template>
  <v-form class="pt-0" flat ref="form">
    <v-radio-group required v-model="selectedFactorType" :rules="rules" row class="shrink mt-0" mandatory>
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
        type="number"
      ></v-text-field>
      <v-text-field
        label="Số điểm tối đa trên học sinh"
        class="required col-md-6"
        :rules="[$rules.required]"
        v-model="maxMark"
        dense
        outlined
        required
        type="number"
      ></v-text-field>
    </div>
  </v-form>
</template>
<script>
import { mapState } from 'vuex'
import _ from 'lodash'
const defaultFactorTypes = [
  { name: 'Miệng', type: 'oralTest', multiply: 1 },
  { name: 'Thực hành', type: 'practiceTest', multiply: 1 },
  { name: '15 phút', type: 'fifteenMinutesTest', multiply: 1 },
  { name: '1 tiết', type: 'oneHourTest', multiply: 2 },
  { name: 'Học kỳ', type: 'semesterExam', multiply: 3 }
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
        const selectedType = defaultFactorTypes.find(m => m.type === this.selectedFactorType)
        return {
          title: name,
          type: this.selectedFactorType,
          quantity: this.maxMark,
          multiply: selectedType.multiply,
          data: {
            shortName: selectedType.name,
            minMark: this.minMark,
            maxMark: this.maxMark
          }
        }
      }
      return null
    }
  },
  mounted() {
    this.$refs.form.reset()
  },

  watch: {
    state(state) {
      if (!state) {
        this.$refs.form.reset()
      }
    }
  }
}
</script>
