<template>
  <v-container>
    <h2 style="color:gray">Cài Đặt Giáo Viên</h2>
    <v-divider></v-divider>
    <div class="d-flex flex-row" style="flex-wrap: wrap">
      <div class="flex-grow-1">
        <v-checkbox
          v-model="policy['view-teacher-list']"
          :label="'Cho phép ' + role.description + ' xem danh sách giáo viên'"
        ></v-checkbox>
        <v-checkbox
          v-model="policy['crete-teacher']"
          :label="'Cho phép ' + role.description + ' tạo mới giáo viên'"
        ></v-checkbox>
        <v-checkbox
          v-model="policy['update-teacher-info']"
          :label="'Cho phép ' + role.description + ' cập nhật thông tin giáo viên'"
        ></v-checkbox>
        <v-checkbox
          v-model="policy['delete-teacher']"
          :label="'Cho phép ' + role.description + ' xóa giáo viên'"
        ></v-checkbox>
        <v-checkbox
          v-model="policy['lock-teacher']"
          :label="'Cho phép ' + role.description + ' khóa/mở khóa giáo viên'"
        ></v-checkbox>
      </div>
      <div class="flex-grow-1">
        <v-checkbox
          v-model="policy['update-teacher-salary']"
          :label="'Cho phép ' + role.description + ' cập nhật lương giáo viên'"
        ></v-checkbox>
      </div>
    </div>
    <v-card-actions class="mr-4">
      <v-btn color="error" text @click="cancel()">Huỷ</v-btn>
      <div class="flex-grow-1"></div>
      <v-btn color="primary" text style="margin: 0 20px" @click="reset()">Đặt lại</v-btn>
      <v-btn color="primary" @click="save()">Lưu</v-btn>
    </v-card-actions>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    input: {
      type: [Object]
    }
  },
  data () {
    return {
      policy: {
        'view-class': false,
        'add-student-to-class': false,
        'remove-class': false,
        'add-class': false,
        'update-class': false,
        'add-teacher-mentor-to-class': false,
        'update-class-status': false,
        'take-class-attendance': false
      }
    }
  },
  created: async function () {
    this.policy = this.input || this.getDefaultPolicies()
  },
  computed: {
    ...mapGetters('app', ['users']),
    ...mapGetters('role', ['role', 'roles'])
  },
  methods: {
    save () {
      this.$emit('save', this.policy)
    },
    cancel () {
      this.$emit('cancel')
    },
    reset () {
      this.policy = this.input
    },
    changeRole (index) {
      this.setRole(this.roles[index])
    },
    getDefaultPolicies () {
      return {
        'view-class': false,
        'add-student-to-class': false,
        'remove-class': false,
        'add-class': false,
        'update-class': false,
        'add-teacher-mentor-to-class': false,
        'update-class-status': false,
        'take-class-attendance': false
      }
    }
  },
  watch: {
    input (input) {
      this.policy = input || this.getDefaultPolicies()
    }
  }
}
</script>

<style scoped>
</style>
