<template>
  <div class="flex-center">
    <v-btn v-if="multipleAction" color="error" class="mr-2" depressed @click.stop="onRemove" >
      <v-icon left>delete</v-icon>Xóa
    </v-btn>

    <v-btn v-if="multipleAction" class="mr-2" depressed @click.stop="onTuition" outlined>
      <v-icon left>add</v-icon>Tạo Học Phí
    </v-btn>
    <StudentEditTags v-if="selected.length > 0" :students="selected" />
    <v-btn v-if="multipleAction" class="mr-2" depressed @click.stop="onReserve" outlined>
      <v-icon left>mdi-clock-fast</v-icon>Bảo Lưu
    </v-btn>
    <v-btn v-if="multipleAction" class="mr-2" depressed @click.stop="onActivate" outlined>
      <v-icon left>check</v-icon>Kích Hoạt
    </v-btn>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import StudentEditTags from '@/modules/student/StudentEditTags.vue'
import _ from 'lodash'
export default {
  components: {
    StudentEditTags,
  },
  props: {
    disabled: Boolean,
    filter: Boolean,
    selected: { type: Array, default: () => [] }
  },
  data () {
    return {
      mailDialogState: false,
      smsDialogState: false,
      smsEditingState: false,
      sending: null
    }
  },
  computed: {
    ...mapState('student', ['students']),
    sendingName () {
      const { name } = this.students.find(
        student => student.phone === this.sending
      )
      return name
    },
    multipleAction () {
      return !_.isEmpty(this.selected)
    }
  },
  methods: {
    ...mapActions('students', ['removeStudents', 'updateStudents']),
    ...mapActions('noti', ['sendEmails', 'sendSMS']),
    ...mapActions('sale', ['setStudents']),
    disableStudent () {
      this.updateStudents(
        this.selected.map(item => {
          return { ...item, status: 'block' }
        })
      )
    },
    enableStudent () {
      this.updateStudents(
        this.selected.map(item => {
          return { ...item, status: 'active' }
        })
      )
    },
    onRemove () {
      this.$dialog.confirm({
        title: 'Xóa Học Sinh',
        text: 'Bạn Có chắc muốn xóa học sinh này.?',
        okText: 'Có',
        cancelText: 'Không',
        done: async () => {
          await this.removeStudents(this.selected)
          this.$emit('removed')
        }
      })
    },
    onReserve () {
      this.$dialog.confirm({
        title: 'Bảo Lưu Học sinh',
        text: 'Bạn có muốn bảo lưu những học sinh này ?',
        okText: 'Có',
        cancelText: 'Không',
        done: async () => {
          await this.updateStudents(
            this.selected.map(s => ({ id: s.id, status: 'reserved' }))
          )
          this.$emit('removed')
        }
      })
    },
    onTuition () {
      this.setStudents(this.selected)
      this.$router.push('./sales')
    },
    onActivate () {
      this.$dialog.confirm({
        title: 'Bảo Lưu Học sinh',
        text: 'Bạn có muốn Chuyển trạng thái học viên này về đang hoạt động ?',
        okText: 'Có',
        cancelText: 'Không',
        done: async () => {
          await this.updateStudents(
            this.selected.map(s => ({ id: s.id, status: 'active' }))
          )
          this.$emit('removed')
        }
      })
    }
  }
}
</script>
