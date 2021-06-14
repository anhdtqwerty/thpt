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
                <v-radio-group v-model="postType" class="ma-0" hide-details>
                  <div class="d-flex flex-wrap">
                    <v-radio class="mr-4" v-for="p in postTypes" :key="p.type" :label="p.title" :value="p.value" />
                  </div>
                </v-radio-group>
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
            <v-divider class="my-4" />
            <v-textarea
              outlined
              label="Nội dung tin nhắn"
              v-model="content"
              class="required mb-0"
              :rules="[$rules.required]"
            ></v-textarea>
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
import utils from '@/plugins/utils'
import { chunk, get } from 'lodash'
import { Post } from '@/plugins/api'
import { mapGetters } from 'vuex'

export default {
  name: 'PostCreateDialog',
  props: {
    state: Boolean,
    postTos: Object
  },
  data() {
    return {
      dialog: false,
      content: '',
      postType: 'notification',
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
      if (!this.$refs.form.validate()) return
      this.$dialog.confirm({
        title: 'Xác nhận gửi tin',
        text: `Bạn có chắc chắn muốn gửi nội dung trên tới tất cả các sổ liên lạc điện tử đang được chọn ?`,
        okText: 'Xác nhận',
        cancelText: 'Hủy',
        done: async () => {
          try {
            this.$loading.active = true

            const params = {
              staff: this.profile.id,
              content: this.content,
              keywords: utils.clearUnicode(this.content),
              type: this.postType,
              senderMethod: this.senderMethod,
              config: 'immediately'
            }
            const { students, classes, grades, allSchool } = this.postTos || {}

            if (students) {
              const groups = chunk(students, 5)
              for (let subStudents of groups) {
                await Promise.all(subStudents.map(s => ({ ...params, student: s.id })).map(p => Post.create(p)))
              }
            } else if (classes) {
              const groups = chunk(classes, 5)
              for (let subClasses of groups) {
                await Promise.all(subClasses.map(c => ({ ...params, class: c.id })).map(p => Post.create(p)))
              }
            } else if (grades) {
              const groups = chunk(grades, 5)
              for (let subGrades of groups) {
                await Promise.all(subGrades.map(g => ({ ...params, grade: g.id })).map(p => Post.create(p)))
              }
            } else if (allSchool) {
              const departmentId = get(this.user.department, 'id')
              if (departmentId) {
                await Post.create({ ...params, department: departmentId })
              }
            }
            this.dialog = false
            this.$emit('done')
            this.$alert.success('Đã gửi tin nhắn, xem chi tiết tại màn hình lịch sử gửi tin')
            this.reset()
          } catch (error) {
          } finally {
            this.$loading.active = false
          }
        }
      })
    },
    cancel() {
      this.reset()
      this.dialog = false
      this.$emit('cancel')
    },
    reset() {
      this.content = ''
      this.$refs.form.resetValidation()
    }
  },
  computed: {
    ...mapGetters('auth', ['user', 'profile']),
    ...mapGetters('constant', ['postTypes']),

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
