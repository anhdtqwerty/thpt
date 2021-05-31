<template>
  <v-radio-group v-bind="this.$attrs" @change="$emit('change', type)" v-model="type" row class="shrink mt-0">
    <p class="mr-2 my-0">Mục:</p>
    <v-radio label="Khen thưởng" hide-details value="commendation"></v-radio>
    <v-radio label="Kỷ luật" hide-details value="violation"></v-radio>
  </v-radio-group>
</template>

<script>
export default {
  data: () => ({
    type: ''
  }),
  props: {
    violation: {
      type: String,
      default: 'commendation'
    }
  },
  created() {
    this.type = this.violation
    this.$emit('change', this.type)
  }
}
</script>
