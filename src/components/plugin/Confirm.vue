<template>
  <v-layout v-if="active" row justify-center>
    <v-dialog :value="active" persistent max-width="290">
      <v-card>
        <v-card-title>{{title}}</v-card-title>
        <v-card-text v-if="message">{{message}}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green" text @click.native="confirm">OK</v-btn>
          <v-btn color="red" text @click.native="cancel">Hủy</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  data: () => ({
    title: '',
    message: '',
    active: false,
    resolver: null
  }),
  methods: {
    show (title, message) {
      this.title = title
      this.message = message
      this.active = true
      return new Promise((resolve, reject) => {
        this.resolver = resolve
      })
    },
    confirm () {
      this.active = false
      this.resolver(true)
    },
    cancel () {
      this.active = false
      this.resolver(false)
    }
  }
}
</script>

<style>
</style>
