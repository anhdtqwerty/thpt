<template>
  <v-container>
    <h2 style="color:gray">Cài Đặt Nhân Viên</h2>
    <v-divider></v-divider>
    <div class="d-flex flex-row" style="flex-wrap: wrap">
      <div class="flex-grow-1">
        <v-checkbox
          v-model="policy['view-staff-list']"
          :label="'Cho phép ' + role.description + ' xem danh sách nhân viên'"
        ></v-checkbox>
        <v-checkbox
          v-model="policy['crete-staff']"
          :label="'Cho phép ' + role.description + ' tạo mới nhân viên'"
        ></v-checkbox>
        <v-checkbox
          v-model="policy['update-staff-info']"
          :label="'Cho phép ' + role.description + ' cập nhật thông tin nhân viên'"
        ></v-checkbox>
        <v-checkbox
          v-model="policy['delete-staff']"
          :label="'Cho phép ' + role.description + ' xóa nhân viên'"
        ></v-checkbox>
        <v-checkbox
          v-model="policy['lock-staff']"
          :label="'Cho phép ' + role.description + ' khóa/mở khóa nhân viên'"
        ></v-checkbox>
      </div>
      <div class="flex-grow-1">
        <v-checkbox
          v-model="policy['view-class-statistical']"
          :label="'Cho phép ' + role.description + ' xem thống kê lớp học'"
        ></v-checkbox>
        <v-checkbox
          v-model="policy['view-student-statistical']"
          :label="'Cho phép ' + role.description + ' xem thống kê học sinh'"
        ></v-checkbox>
        <v-checkbox
          v-model="policy['view-cost-statistical']"
          :label="'Cho phép ' + role.description + ' xem thống kê chi phí cơ sở'"
        ></v-checkbox>
        <v-checkbox
          v-model="policy['view-bill-report']"
          :label="'Cho phép ' + role.description + ' xem báo cáo lương hàng tháng'"
        ></v-checkbox>
        <v-checkbox
          v-model="policy['update-staff-salary']"
          :label="'Cho phép ' + role.description + ' cập nhật lương nhân viên'"
        ></v-checkbox>
        <v-checkbox
          v-model="policy['view-staff-attendance']"
          :label="'Cho phép ' + role.description + ' Xem Chấm Công cơ sở'"
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
        'view-staff-list': false,
        'crete-staff': false,
        'update-staff-info': false,
        'delete-staff': false,
        'lock-staff': false,
        'view-class-statistical': false,
        'view-student-statistical': false,
        'view-bill-report': false,
        'update-staff-salary': false,
        'view-staff-attendance': false
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
        'view-staff-list': false,
        'crete-staff': false,
        'update-staff-info': false,
        'delete-staff': false,
        'lock-staff': false,
        'view-class-statistical': false,
        'view-student-statistical': false,
        'view-bill-report': false,
        'update-staff-salary': false,
        'view-staff-attendance': false
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
