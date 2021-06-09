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
        v-bind="$attrs"
        v-model="time"
        :label="label"
        readonly
        prepend-inner-icon="access_time"
        v-on="on"
      ></v-text-field>
    </template>
    <v-time-picker v-if="menu" v-model="time" color="#0D47A1" full-width @click:minute="saveTime"></v-time-picker>
  </v-menu>
</template>
<script>
export default {
  props: {
    input: String,
    label: String,
    defaultTime: {
      type: String,
      default: '09:00'
    }
  },
  data: () => ({
    time: '',
    menu: false
  }),
  methods: {
    getData() {
      return this.time
    },
    saveTime() {
      this.$refs.menu.save(this.time)
      this.$emit('change', this.time)
    }
  },
  created() {
    this.time = this.input || this.defaultTime
    this.$emit('change', this.time)
  },
  watch: {
    input(input) {
      this.time = input || this.defaultTime
    }
  }
}
</script>

<style scoped></style>
