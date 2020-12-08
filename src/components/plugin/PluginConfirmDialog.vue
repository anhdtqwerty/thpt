<template>
  <v-dialog v-model="dialog.state" max-width="500px">
    <v-card class="pb-4">
      <v-card-title
        class="py-3 text-subtitle-1 text-uppercase font-weight-regular #0D47A1 white--text"
        >{{ dialog.title }}<v-spacer />
        <v-icon color="white" @click="cancel">close</v-icon></v-card-title
      >
      <v-divider />
      <v-card-text class="px-6 mt-4 mx-auto" style="width:450px">
        <v-row>
          <v-col cols="2">
            <v-img
              width="60px"
              height="60px"
              src="@/assets/warning_24px.svg"
              class="mt-1"
            />
          </v-col>
          <v-col cols="10" class="pl-4">
            <div v-if="dialog.text" class="text-subtitle-1 font-weight-bold">
              {{ dialog.text }}
            </div>
          </v-col>
        </v-row>
        <slot></slot>
      </v-card-text>
      <v-card-actions class="justify-space-between mt-n4 pr-8">
        <v-spacer></v-spacer>
        <v-btn
          small
          v-show="!dialog.hideCancel"
          @click="cancel"
          color="white"
          class="ma-0 mr-2 elevation-0 text-subtitle-1 font-weight-bold"
          >{{ dialog.cancelText }}</v-btn
        >
        <v-btn
          small
          v-show="!dialog.hideOk"
          color="white"
          @click="done"
          class="ma-0 elevation-0 primary--text text-subtitle-1 font-weight-bold"
          >{{ dialog.okText }}</v-btn
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
