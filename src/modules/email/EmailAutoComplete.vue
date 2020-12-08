<template>
    <v-autocomplete
      v-model="email" :item="email" dense :label="email" multiple disabled
    ></v-autocomplete>
</template>

<script>
export default {
  props: {
    email: {
      type: String,
    }
  },
}
</script>
<style scoped>

</style>
