<template>
  <v-radio-group v-bind="this.$attrs" @change="$emit('change', gender)" v-model="gender" row class="shrink mt-0">
    <v-radio label="Nam" hide-details value="male"></v-radio>
    <v-radio label="Nữ" hide-details value="female"></v-radio>
    <v-radio label="Khác" hide-details value="other"></v-radio>
  </v-radio-group>
</template>

<script>
export default {
  data: () => ({
    gender: ''
  }),
  props: {
    defaultGender: {
      gender: String,
      default: 'male'
    }
  },
  created() {
    this.gender = this.defaultGender
    this.$emit('change', this.gender)
  }
}
</script>
