<template>
  <v-text-field
    v-bind="this.$attrs"
    ref="code"
    v-mask="mask"
    v-on:input="$emit('input', $event)"
    v-model="data"
  ></v-text-field>
</template>

<script>
import moment from 'moment'
import { mask } from 'vue-the-mask'
export default {
  props: {
    date: String
  },
  directives: {
    mask
  },
  data: () => ({
    data: '',
    menu: false,
    mask: 'XX/XX/XXXX'
  }),

  methods: {

    updated(value) {
      if (value) {
        this.$emit('update:date', moment(this.data, 'DD/MM/YYYY').toISOString())
      } else {
        this.$emit('update:date', '')
      }
      this.menu = false
    },
    reset() {
      if (this.date) {
        this.data = ''
      }
    }
  },
  created() {
    this.reset()
  },
  watch: {
    data(value) {
      this.updated(this.data)
    }
  }
}
</script>
