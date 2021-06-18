<template>
  <v-dialog :fullscreen="$vuetify.breakpoint.smAndDown" v-model="dialog" width="600" scrollable>
    <v-card>
      <v-card-title class="primary white--text text-uppercase">
        Gửi tin nhắn đến người nhận
        <v-spacer></v-spacer>
        <v-btn dark icon>
          <v-icon @click="cancel">close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider />
      <v-card-text>
        <v-form ref="form" class="py-4">
          <div>
            <v-row>
              <v-col cols="12" sm="3">
                <h3>Nhóm nhận tin</h3>
              </v-col>
              <v-col cols="12" sm="9">
                <div>{{ postToOverview }}</div>
                <div>{{ postToDetail }}</div>
              </v-col>
            </v-row>
            <v-divider class="my-4" />
            <v-row>
              <v-col cols="12" sm="3">
                <h3>Dạng tin nhắn</h3>
              </v-col>
              <v-col cols="12" sm="9">
                <div>Điểm danh (Vắng/ quên quẹt thẻ)</div>
              </v-col>
            </v-row>
            <v-divider class="my-4" />
            <v-row>
              <v-col cols="12" sm="3">
                <h3>Gửi qua</h3>
              </v-col>
              <v-col cols="12" sm="9">
                <v-radio-group v-model="senderMethod" class="ma-0" hide-details>
                  <div class="d-flex flex-wrap">
                    <v-radio class="mr-4" v-for="m in senderMethods" :key="m.type" :label="m.title" :value="m.type" />
                  </div>
                </v-radio-group>
              </v-col>
            </v-row>
          </div>
        </v-form>
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-btn class="px-4" outlined light depressed @click="cancel">Hủy</v-btn>
        <v-spacer></v-spacer>
        <v-btn class="ma-2" dark depressed color="primary" @click="create">Gửi </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import { ContactBook } from '../../plugins/api'

export default {
  name: 'PostCreateDialog',
  props: {
    state: Boolean,
    postTos: Object
  },
  data() {
    return {
      dialog: false,
      senderMethod: 'auto',
      senderMethods: [
        { type: 'auto', title: 'Tự động theo đăng ký' },
        { type: 'app', title: 'App' },
        { type: 'sms', title: 'SMS' }
      ]
    }
  },
  methods: {
    async create() {
      this.$dialog.confirm({
        title: 'Xác nhận gửi tin',
        text: `Hệ thống sẽ gửi tin nhắn tới các học sinh vắng hoặc quên quẹt thẻ ở các lớp  mà bạn đã chọn. Bạn có chắc chắn gửi tin nhắn này ?`,
        okText: 'Xác nhận',
        cancelText: 'Hủy',
        done: async () => {
          const { classes } = this.postTos || {}

          const params = {
            staffId: this.profile.id,
            classes: classes,
            type: 'diligence',
            senderMethod: this.senderMethod,
            config: 'daily'
          }

          try {
            this.$loading.active = true
            await ContactBook.sendDiligence(params)
            this.$alert.success('Đã gửi tin nhắn điểm danh, vui lòng xem chi tiết trong lịch sử gửi tin')
            this.dialog = false
            this.$emit('done')
          } catch (error) {
            this.$alert.error(`Đã có lỗi xảy ra trong quá trình gửi tin nhắn! Lỗi: ${error}`)
          } finally {
            this.$loading.active = false
          }
        }
      })

      // const groups = chunk(classes, 5)
      // for (let subClasses of groups) {
      //   await Promise.all(subClasses.map(c => ({ ...params, class: c.id })).map(p => Post.create(p)))
      // }
    },
    cancel() {
      this.dialog = false
      this.$emit('cancel')
    },
    reset() {}
  },
  computed: {
    ...mapGetters('auth', ['user', 'profile']),
    postToOverview() {
      const { students, classes, grades, allSchool } = this.postTos || {}
      if (students) return `${students.length} học sinh`
      if (classes) return `${classes.length} lớp`
      if (grades) return `${grades.length} khối`
      if (allSchool) return `Toàn trường`
      return 'Không xác định'
    },
    postToDetail() {
      const { students, classes, grades } = this.postTos || {}
      if (students) return '( ' + students.map(s => s.name).join(', ') + ' )'
      if (classes) return '( ' + classes.map(s => s.title).join(', ') + ' )'
      if (grades) return '( ' + grades.map(s => s.title).join(', ') + ' )'
      return ``
    }
  },
  watch: {
    state(state) {
      this.dialog = true
    }
  }
}
</script>

<style scoped></style>
