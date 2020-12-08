<template>
    <div class="text-center">
        <v-dialog v-model="dialog">
            <v-card>
                <v-card-title>
                </v-card-title>
                <v-card-text>
                    <email-auto-complete :email="data.email"/>
                    <v-text-field placeholder="Chủ đề" v-model="subject"></v-text-field>
                    <v-textarea name="input-7-1" full-width v-model="text"
                    ></v-textarea>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="send">Gửi</v-btn>
                    <v-btn color="red" text @click="cancel">Hủy</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import EmailAutoComplete from '@/modules/email/EmailAutoComplete'
import { mapActions } from 'vuex'

export default {
  components: {
    EmailAutoComplete
  },
  props: {
    data: { type: [Object], required: true, default: () => {} },
    state: Boolean
  },
  data () {
    return {
      dialog: false,
      subject: '',
      text: ''
    }
  },
  methods: {
    ...mapActions('noti', ['sendEmail', 'sendSMS']),
    send () {
      this.sendEmail({
        to: this.item,
        text: this.text,
        replyTo: 'anhdtcmc@gmail.com',
        subject: this.subject
      })
      this.dialog = false
    },
    cancel () {
      this.dialog = false
      this.reset()
    },
    reset () {
      this.subject = ''
      this.text = ''
    }
  },
  watch: {
    state (state) {
      this.dialog = true
    }
  }
}
</script>

<style scoped>

</style>
