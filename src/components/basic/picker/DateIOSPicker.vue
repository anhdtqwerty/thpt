<template>
  <v-text-field
    v-bind="this.$attrs"
    ref="code"
    v-mask="mask"
    :rules="[v => !!v || 'Item is required']"
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
    data: moment().format('DD/MM/YYYY'),
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
        this.data = moment(this.date).format('YYYY-MM-DD')
      }
    }
  },
  computed: {
    display() {
      if (this.date) {
        return moment(this.date).format('DD/MM/YYYY')
      }
      return ''
    }
  },
  created() {
    this.reset()
  },
  watch: {
    date() {
      this.reset()
    }
  }
}
</script>
