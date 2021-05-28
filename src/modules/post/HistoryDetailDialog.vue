<template>
  <v-dialog :fullscreen="$vuetify.breakpoint.smAndDown" v-model="dialog" width="600" height="600" scrollable>
    <v-card v-if="history.id">
      <v-card-title class="primary white--text">
        Chi tiết tin gửi
        <v-spacer></v-spacer>
        <v-btn dark icon>
          <v-icon @click="dialog = false">close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider />
      <v-card-text>
        <v-row class="mt-4">
          <v-col class="py-0 pr-14" cols="12">
            <v-row>
              <v-col class="d-flex align-center py-0" cols="12">
                <v-subheader class="px-0">Ngày gửi</v-subheader>
                <div style="width: 70%" class="mb-0 black--text">{{ history.createdAt | ddmmyyyyhhmm }}</div>
              </v-col>
              <v-col class="d-flex align-center py-0" cols="12">
                <v-subheader class="px-0">Dạng tin</v-subheader>
                <div style="width: 70%" class="mb-0 black--text">{{ history.postType | getPostType }}</div>
              </v-col>
              <v-col class="d-flex align-center py-0" cols="12">
                <v-subheader class="px-0">Người gửi</v-subheader>
                <div style="width: 70%" class="mb-0 black--text">{{ history.staff && history.staff.name }}</div>
              </v-col>
              <v-col class="d-flex align-center py-0" cols="12">
                <v-subheader class="px-0">Loại tin gửi</v-subheader>
                <div style="width: 70%" class="mb-0 black--text">
                  {{ history.senderMethod.toUpperCase() }} - {{ history.config | getConfig }}
                </div>
              </v-col>
              <v-col class="d-flex align-center py-0" cols="12">
                <v-subheader class="px-0">Đối tượng nhận</v-subheader>
                <div style="width: 70%" class="mb-0 black--text">{{ history | getReceiver }}</div>
              </v-col>
              <v-col class="d-flex align-center py-0" cols="12">
                <v-subheader class="px-0">Người nhận</v-subheader>
                <div style="width: 70%" class="mb-0">
                  <v-row>
                    <v-col cols="6">
                      <div class="text-caption my-0  black--text">Phụ huynh em</div>
                      <CardStudentName :student="history.student" link />
                    </v-col>
                    <v-col class="d-flex justify-space-between align-center" cols="6">
                      <div>
                        <div class="text-caption my-0">Lớp</div>
                        <span class="black--text">{{ history.class && history.class.title }}</span>
                      </div>
                      <div v-if="history.senderMethod === 'sms'">
                        <div class="text-caption my-0">Số điện thoại nhận</div>
                        <span class="black--text">{{ history.phone }}</span>
                      </div>
                    </v-col>
                  </v-row>
                </div>
              </v-col>
              <v-col class="d-flex align-center py-0" cols="12">
                <v-subheader class="px-0">Nội dung</v-subheader>
                <div style="width: 70%" class="mb-0 black--text">{{ history.content }}</div>
              </v-col>
              <v-col class="d-flex align-center py-0" cols="12">
                <v-subheader class="px-0">Trạng thái</v-subheader>
                <v-chip
                  small
                  class="white--text"
                  v-if="history.status"
                  :color="history.status | getSendNotiStatusColor"
                  label
                >
                  {{ history.status | getSendNotiStatus }}
                </v-chip>
              </v-col>
              <v-col v-if="history.status === 'error'" class="d-flex align-center py-0" cols="12">
                <v-subheader class="px-0">Thông tin</v-subheader>
                <div style="width: 70%" class="mb-0 black--text">{{ history.result }}</div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn class="ma-2" color="cancel" @click="dialog = false" outlined>Huỷ</v-btn>
        <v-spacer></v-spacer>
        <v-btn v-if="history.status === 'error'" @click="$emit('resend')" class="ma-2" color="primary">Gửi lại</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import CardStudentName from '@/components/basic/card/CardStudentName'

export default {
  components: { CardStudentName },
  props: {
    state: Boolean,
    history: Object
  },
  data() {
    return {
      dialog: false
    }
  },
  methods: {},
  computed: {},
  watch: {
    state(state) {
      this.dialog = true
    }
  },
  filters: {
    getReceiver(history) {
      if (history.post) return history.post.receivers
      return history.student.name
    }
  }
}
</script>

<style>
p {
  color: black;
}
.v-subheader {
  width: 30%;
}
</style>
