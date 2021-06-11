<template>
  <div>
    <v-dialog v-model="dialog" width="600px" :fullscreen="$vuetify.breakpoint.smAndDown">
      <v-card>
        <v-card-title class="primary white--text"
          ><v-toolbar-title>Chi tiết nội dung</v-toolbar-title>
          <v-spacer />
          <v-icon color="white" @click="dialog = false">close</v-icon>
        </v-card-title>
        <v-divider></v-divider>
        <div class="pa-6">
          {{ text }}
        </div>
        <v-divider />
        <v-card-actions class="d-flex justify-space-between pr-6">
          <v-spacer />
          <v-btn depressed color="primary" @click="dialog = false">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <span>
      {{ text && textDisplay }}
      <span
        v-if="text && text.length > maxLength"
        class="blue--text caption"
        style="cursor: pointer"
        @click="dialog = true"
      >
        Xem thêm
      </span>
    </span>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    text: String,
    maxLength: { type: Number, default: 150 }
  },
  data() {
    return {
      textDisplay: '',
      dialog: false
    }
  },
  computed: {},
  methods: {
    showReadMore() {}
  },
  watch: {
    text: {
      handler(val) {
        if (val) {
          if (val.length > this.maxLength) {
            this.textDisplay = val.substring(0, this.maxLength) + '...'
          } else {
            this.textDisplay = val
          }
        } else {
          this.textDisplay = val
        }
      },
      immediate: true
    }
  }
}
</script>

<style scoped></style>
