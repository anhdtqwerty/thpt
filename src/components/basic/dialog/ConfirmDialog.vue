<template>
  <v-dialog v-model="dialog" width="400px" :fullscreen="$vuetify.breakpoint.smAndDown">
    <v-card>
      <v-card-title>{{ title }}</v-card-title>
      <v-card-text>
        {{ message }}
      </v-card-text>
      <v-card-actions class="d-flex justify-space-between pa-6">
        <v-btn color="cancel" width="100px" @click="cancel" outlined>{{ cacelText }}</v-btn>
        <v-btn color="primary" width="100px" class="elevation-0" @click="ok">{{ okText }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  components: {},
  props: {
    state: Boolean,
    title: String,
    message: String,
    cacelText: {
      type: String,
      default: 'Hủy'
    },
    okText: {
      type: String,
      default: 'Xác nhận'
    }
  },
  data() {
    return {
      dialog: false
    }
  },
  methods: {
    async ok() {
      this.$emit('ok')
      this.dialog = false
    },
    cancel() {
      this.$emit('cancel')
      this.dialog = false
    }
  },
  watch: {
    state(state) {
      this.dialog = true
    }
  }
}
</script>
