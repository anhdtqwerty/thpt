<template>
  <v-radio-group v-bind="this.$attrs" @change="$emit('change', type)" v-model="type" row class="shrink mt-0">
    <!-- <p class="mr-2 my-0">Hình thức nghỉ</p> -->
    <v-radio label="Có phép" hide-details value="yes"></v-radio>
    <v-radio label="Không phép" hide-details value="no"></v-radio>
  </v-radio-group>
</template>

<script>
export default {
  data: () => ({
    type: ''
  }),
  props: {
    diligence: {
      type: String,
      default: 'yes'
    }
  },
  created() {
    this.type = this.diligence
    this.$emit('change', this.type)
  }
}
</script>
