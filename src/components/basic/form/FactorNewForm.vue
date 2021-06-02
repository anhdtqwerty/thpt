<template>
  <v-form class="pt-0" flat ref="form">
    <v-radio-group required v-model="selectedFactorType" :rules="rules" row class="shrink mt-0" mandatory>
      <v-radio
        v-for="item in defaultFactors"
        :key="item.type"
        :label="item.title"
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
import { mapState, mapGetters } from 'vuex'
import { map } from 'lodash'

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
      selectedFactorType: '',
      rules: [
        value => {
          return !map(this.factors, 'type').includes(value) || 'Môn học đã tồn tại đầu điểm này'
        }
      ]
    }
  },
  computed: {
    ...mapState('factor', ['factors']),
    ...mapGetters('subjects', ['defaultFactors'])
  },
  methods: {
    getData() {
      if (this.$refs.form.validate()) {
        const selectedType = this.defaultFactors.find(m => m.type === this.selectedFactorType)
        return {
          title: selectedType.title,
          type: selectedType.type,
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
