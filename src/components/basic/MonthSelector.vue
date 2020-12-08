<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    :nudge-right="40"
    :return-value.sync="date"
    transition="scale-transition"
    min-width="290px"
    offset-y
  >
    <v-date-picker
      v-if="menu"
      v-model="date"
      type="month"
      @click:month="onChange"
      class="mt-4"
      min="2017-06"
      max="2019-10"
    ></v-date-picker>
  </v-menu>
</template>
<script>
export default {
  props: {
    input: String,
    state: Boolean
  },
  data: () => ({
    date: '2019-11',
    menu: false
  }),
  created () {
    this.date = this.input || '2019-11'
  },
  watch: {
    input (input) {
      this.date = input || '2019-11'
    },
    state (state) {
      this.menu = true
    }
  },
  methods: {
    onChange () {
      this.$refs.menu.save(this.date)
      this.$emit('change', this.date)
      this.menu = false
    }
  }
}
</script>

<style scoped>
</style>
