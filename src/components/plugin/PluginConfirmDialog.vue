<template>
  <v-dialog v-model="dialog.state" max-width="500px">
    <v-card class="pb-2">
      <v-card-title
        class=" text-subtitle-1 text-uppercase font-weight-regular primary white--text"
        >{{ dialog.title }}<v-spacer />
        <v-icon color="white" @click="cancel">close</v-icon></v-card-title
      >
      <v-divider />
      <v-card-text class="mt-4" style="width:450px">
        <v-row class="d-flex justify-space-around align-center mt-4">
          <v-icon color="orange" x-large>mdi-alert</v-icon>
          <p v-if="dialog.text" class="">
            {{ dialog.text }}
          </p>
        </v-row>
        <slot></slot>
      </v-card-text>
      <v-card-actions class="justify-space-between">
        <v-spacer></v-spacer>
        <v-btn
          v-show="!dialog.hideCancel"
          @click="cancel"
          class="ma-0 mr-2"
          depressed
          text
          outlined
          >{{ dialog.cancelText || 'Hủy' }}</v-btn
        >
        <v-btn
          v-show="!dialog.hideOk"
          @click="done"
          class="ma-0"
          depressed
          text
          color="primary"
          >{{ dialog.okText || 'Xác Nhận' }}</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: this.$dialog.confirmData
    }
  },
  methods: {
    done() {
      this.dialog.done()
      this.cancel()
    },
    cancel() {
      this.$dialog.cancel()
    }
  }
}
</script>
