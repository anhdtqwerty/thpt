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
                    <v-radio class="mr-4" v-for="p in postTypes" :key="p.type" :label="p.title" :value="p.type" />
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
            <v-textarea outlined label="Nội dung tin nhắn" v-model="content"></v-textarea>
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
      postTypes: [
        { type: 'notification', title: 'Thông báo' },
        { type: 'violation', title: 'KTKL' },
        { type: 'mark', title: 'Sổ điểm' },
        { type: 'tuitionFee', title: 'Học phí' },
        { type: 'diligence', title: 'Chuyên cần' },
        { type: 'schedule', title: 'Thời khóa biểu' },
        { type: 'onlineStudy', title: 'Học tập online' },
        { type: 'other', title: 'Khác' }
      ],
      senderMethods: [
        { type: 'auto', title: 'Tự đông theo đăng ký' },
        { type: 'app', title: 'App' },
        { type: 'sms', title: 'SMS' }
      ]
    }
  },
  methods: {
    async create() {
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
        this.$alert.success('Gửi tin nhắn thành công')
        this.reset()
      } catch (error) {
      } finally {
        this.$loading.active = false
      }
    },
    cancel() {
      this.dialog = false
      this.$emit('cancel')
    },
    reset() {
      this.content = ''
    }
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
