<template>
  <v-menu
    v-bind="this.$attrs"
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    :nudge-right="40"
    :return-value.sync="time"
    transition="scale-transition"
    offset-y
    max-width="290px"
    min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        v-model="time"
        :label="label"
        readonly
        prepend-icon="access_time"
        v-on="on"
        v-on:input="$emit('input', $event)"
        @change="$emit('change', time)"
      ></v-text-field>
    </template>
    <v-time-picker
      v-if="menu"
      v-model="time"
      color="#0D47A1"
      full-width
      @click:minute="$refs.menu.save(time)"
    ></v-time-picker>
  </v-menu>
</template>
<script>
export default {
  props: {
    input: String,
    label: String
  },
  data: () => ({
    time: '09:00',
    menu: false
  }),
  methods: {
    getData() {
      return this.time
    }
  },
  created() {
    this.time = this.input || '09:00'
  },
  watch: {
    input(input) {
      this.time = input || '09:00'
    }
  }
}
</script>

<style scoped></style>
