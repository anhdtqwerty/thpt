<template>
  <v-text-field
    v-bind="this.$attrs"
    ref="code"
    label="Mã"
    v-mask="mask"
    :rules="[v => !!v || 'Item is required']"
    v-on:input="$emit('input', $event)"
  ></v-text-field>
</template>

<script>
import { mask } from 'vue-the-mask'

export default {
  props: {
    patern: String
  },
  directives: {
    mask
  },
  created () {
    this.mask = this.patern ? this.patern : 'XX-XX'
  },
  data: () => ({
    mask: 'XX-XX',
    value: ''
  })
}
</script>

<style scoped>
</style>
