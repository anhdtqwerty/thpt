<template>
  <v-radio-group @change="$emit('change', level)" v-model="level" hide-details row class="shrink mt-0">
    <v-radio label="Cấp 1" hide-details value="primary"></v-radio>
    <v-radio label="Cấp 2" hide-details value="secondary"></v-radio>
    <v-radio label="Cấp 3" hide-details value="high"></v-radio>
  </v-radio-group>
</template>

<script>
export default {
  data: () => ({
    level: ''
  }),
  computed: {},
  props: {
    defaultLevel: {
      level: String,
      default: 'secondary'
    }
  },
  created() {
    this.level = this.defaultLevel
    this.$emit('change', this.level)
  }
}
</script>
