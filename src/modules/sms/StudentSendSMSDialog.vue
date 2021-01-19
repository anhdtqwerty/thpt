<template>
  <div class="text-center">
    <v-dialog
      :fullscreen="$vuetify.breakpoint.smAndDown"
      width="500"
      v-model="dialog"
      scrollable
    >
      <v-card>
        <v-card-title class="primary white--text">
          Gửi tin nhắn <v-spacer></v-spacer>
          <v-btn dark icon>
            <v-icon @click="cancel">close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <p class="text-caption mt-4">
            Đã chọn {{ data.length }} Số liên lạc
          </p>
          <div class="d-flex">
            <v-checkbox
              class="my-0 mr-3 py-0"
              label="SMS"
            ></v-checkbox>
            <v-checkbox
              class="my-0 mr-3 py-0"
              label="App"
            ></v-checkbox>
            <v-checkbox
              class="my-0 mr-3 py-0"
              label="Tự động"
            ></v-checkbox>
          </div>
          <v-radio-group v-model="radioGroup" row>
            <v-radio class="mr-3" label="VPKL"></v-radio>
            <v-radio class="mr-3" label="Điểm"></v-radio>
            <v-radio class="mr-3" label="Thông báo"></v-radio>
            <v-radio class="mr-3" label="Điểm danh"></v-radio>
          </v-radio-group>
          <div class="mt-4">
            <v-textarea counter outlined></v-textarea>
          </div>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn depressed color="primary" @click="send">Gửi</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
  },
  props: {
    data: { type: Array, required: true, default: () => [] },
    state: Boolean,
  },
  data() {
    return {
      dialog: false,
      subject: '',
      text: '',
      progress: 1,
      radioGroup: ''
    }
  },
  computed: {
    ...mapGetters('noti', ['sms']),
  },
  methods: {
    ...mapActions('noti', ['sendEmail', 'sendSMS']),
    ...mapActions('auth', ['user']),
    send() {
      console.log({
        phone: this.data.phone,
        message: this.text,
        receiver: this.data.id,
      })
      this.sendSMS({
        phone: this.data.phone,
        message: this.text,
        receiver: this.data.id,
      })
      this.dialog = false
    },
    cancel() {
      this.dialog = false
      this.reset()
    },
    reset() {
      this.subject = ''
      this.text = ''
    },
  },
  watch: {
    state(state) {
      this.dialog = true
    },
  },
}
</script>
