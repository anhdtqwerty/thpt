<template>
  <v-container>
    <h2 style="color:gray">Cài Đặt Học Sinh</h2>
    <v-divider></v-divider>
    <div class="d-flex flex-row" style="flex-wrap: wrap">
      <div class="flex-grow-1">
        <v-checkbox
          v-model="policy['view-student-list']"
          :label="'Cho phép ' + role.description + ' xem danh sách học sinh'"
        ></v-checkbox>
        <v-checkbox
          v-model="policy['crete-student']"
          :label="'Cho phép ' + role.description + ' tạo mới học sinh'"
        ></v-checkbox>
        <v-checkbox
          v-model="policy['update-student-info']"
          :label="'Cho phép ' + role.description + ' cập nhật thông tin học sinh'"
        ></v-checkbox>
        <v-checkbox
          v-model="policy['delete-student']"
          :label="'Cho phép ' + role.description + ' xóa học sinh'"
        ></v-checkbox>
        <v-checkbox
          v-model="policy['lock-student']"
          :label="'Cho phép ' + role.description + ' khóa/mở khóa học sinh'"
        ></v-checkbox>
      </div>
      <div class="flex-grow-1">
        <v-checkbox
          v-model="policy['update-student-tuition']"
          :label="'Cho phép ' + role.description + ' cập nhật học phí'"
        ></v-checkbox>
        <v-checkbox
          v-model="policy['add-student-to-class']"
          :label="'Cho phép ' + role.description + ' thêm/xóa học sinh vào lớp (xếp lớp)'"
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
        'view-students': false,
        'add-new-student': false,
        'update-student': false,
        'delete-student': false,
        'block-student': false,
        'recover-student': false,
        'update-student-status': false,
        'lock-student': false
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
        'view-students': false,
        'add-new-student': false,
        'update-student': false,
        'delete-student': false,
        'block-student': false,
        'recover-student': false,
        'update-student-status': false,
        'lock-student': false
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
