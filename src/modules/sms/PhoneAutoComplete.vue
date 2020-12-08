<template>
    <v-autocomplete
            v-model="phones" :items="phones" dense chips small-chips deletable-chips label="Người Nhận" multiple disabled
    ></v-autocomplete>
</template>

<script>
export default {
  props: {
    phones: {
      type: [Array], default: () => []
    }
  }
}
</script>
<style scoped>

</style>
