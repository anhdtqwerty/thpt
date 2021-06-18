<template>
  <v-container>
    <h2 style="color:gray">Cài Đặt Lớp Học</h2>
    <v-divider></v-divider>
    <div class="d-flex flex-row" style="flex-wrap: wrap">
      <div class="flex-grow-1">
        <v-checkbox
          v-model="policy['view-class-list']"
          :label="'Cho phép ' + role.description + ' xem danh sách sách lớp'"
        ></v-checkbox>
        <v-checkbox
          v-model="policy['crete-class']"
          :label="'Cho phép ' + role.description + ' tạo mớiviên lớp học'"
        ></v-checkbox>
        <v-checkbox
          v-model="policy['update-class-info']"
          :label="'Cho phép ' + role.description + ' cập nhật thông tin lớp học'"
        ></v-checkbox>
        <v-checkbox v-model="policy['delete-class']" :label="'Cho phép ' + role.description + ' xóa lớp'"></v-checkbox>
        <v-checkbox
          v-model="policy['cancel-class']"
          :label="'Cho phép ' + role.description + ' Dừng lớp, Hủy lớp'"
        ></v-checkbox>
      </div>
      <div class="flex-grow-1">
        <v-checkbox
          v-model="policy['add-student-to-class']"
          :label="'Cho phép ' + role.description + ' thêm học sinh vào lớp'"
        ></v-checkbox>
        <v-checkbox
          v-model="policy['take-class-attendance']"
          :label="'Cho phép ' + role.description + ' điểm danh'"
        ></v-checkbox>
        <v-checkbox
          v-model="policy['add-teacher-mentor-to-class']"
          :label="'Cho phép ' + role.description + ' cài đặt giáo viên '"
        ></v-checkbox>
        <v-checkbox
          v-model="policy['update-class-status']"
          :label="'Cho phép ' + role.description + ' Cập nhật trạng thái lớp học '"
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
  data() {
    return {
      policy: {
        'view-class': false,
        'add-student-to-class': false,
        'remove-class': false,
        'add-class': false,
        'update-class': false,
        'add-teacher-mentor-to-class': false,
        'update-class-status': false
      }
    }
  },
  created: async function() {
    this.policy = this.input || this.getDefaultPolicies()
  },
  computed: {
    ...mapGetters('role', ['role', 'roles'])
  },
  methods: {
    save() {
      this.$emit('save', this.policy)
    },
    cancel() {
      this.$emit('cancel')
    },
    reset() {
      this.policy = this.input
    },
    changeRole(index) {
      this.setRole(this.roles[index])
    },
    getDefaultPolicies() {
      return {
        'view-class': false,
        'add-student-to-class': false,
        'remove-class': false,
        'add-class': false,
        'update-class': false,
        'add-teacher-mentor-to-class': false,
        'update-class-status': false
      }
    }
  },
  watch: {
    input(input) {
      this.policy = input || this.getDefaultPolicies()
    }
  }
}
</script>

<style scoped></style>
