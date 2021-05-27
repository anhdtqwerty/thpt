<template>
  <v-form ref="form" class="pt-1" flat>
    <div class="d-flex">
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
        type="number"
        required
      ></v-text-field>
    </div>
  </v-form>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      minMark: '',
      maxMark: ''
    }
  },
  computed: {},
  props: {
    state: Boolean,
    factor: { type: Object, default: () => {} }
  },
  methods: {
    reset() {
      this.$refs.form.reset()
    },
    getData() {
      if (this.$refs.form.validate()) {
        let factorClone = JSON.parse(JSON.stringify(this.factor))
        if (factorClone && factorClone.data != null) {
          factorClone.data.minMark = this.minMark
          factorClone.data.maxMark = this.maxMark
        } else return { ...factorClone, data: { minMark: this.minMark, maxMark: this.maxMark } }
        return factorClone
      }
      return null
    },
    resetDefault() {
      if (this.factor && this.factor.data) {
        this.minMark = this.factor.data.minMark
        this.maxMark = this.factor.data.maxMark
      }
    }
  },
  created() {
    this.resetDefault()
  },
  watch: {
    factor() {
      this.resetDefault()
    },
    state(state) {
      if (state) {
        this.resetDefault()
      } else {
        this.reset()
      }
    }
  }
}
</script>
