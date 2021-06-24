<template>
  <v-row no-gutters v-if="student">
    <v-col cols="12" md="4" class="text-center">
      <user-avatar-picker :user="student" type="student" />
      <h2>{{ student.name }}</h2>
      <table class="info-student-general mx-6">
        <tr>
          <td>Mã số</td>
          <td>{{ student.code }}</td>
        </tr>
        <tr>
          <td>Lớp</td>
          <td>10A</td>
        </tr>
        <tr>
          <td>Trạng thái</td>
          <td>{{ student.status }}</td>
        </tr>
      </table>
    </v-col>

    <v-col cols="12" md="8" class="info-student">
      <v-row no-gutters class="flex-column">
        <h3>1. Thông tin cơ bản</h3>
        <table>
          <tr>
            <td>Họ và tên</td>
            <td>{{ student.name }}</td>
          </tr>
          <tr>
            <td>Ngày sinh</td>
            <td>{{ student.dob }}</td>
          </tr>
          <tr>
            <td>Giới tính</td>
            <td>{{ student.gender }}</td>
          </tr>
          <tr>
            <td>Quê quán</td>
            <td>{{ student.data.frequentlyAddress }}</td>
          </tr>
          <tr>
            <td>Dân tộc</td>
            <td>{{ student.data.ethnic }}</td>
          </tr>
        </table>
      </v-row>
      <v-row no-gutters class="flex-column">
        <h3>2. Thông tin liên lạc</h3>
        <table>
          <tr>
            <td>Địa chỉ</td>
            <td>{{ student.data.currentLive }}</td>
          </tr>
          <tr>
            <td>Tỉnh/Thành phố</td>
            <td>{{ student.data.province }}</td>
          </tr>
          <tr>
            <td>Quận</td>
            <td>{{ student.data.district }}</td>
          </tr>
          <tr>
            <td>Số điện thoại</td>
            <td>{{ student.phone }}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{{ student.email }}</td>
          </tr>
        </table>
      </v-row>
      <v-row no-gutters class="flex-column">
        <h3>3. Ghi chú về học sinh</h3>
        <div>Ghi chú</div>
        <div>{{ student.notes }}</div>
        <table>
          <tr>
            <td>Ngày vào đội</td>
            <td>{{ student.data.youngJoinedDate }}</td>
          </tr>
          <tr>
            <td>Ngày vào đoàn</td>
            <td>{{ student.data.communistJoinedDate }}</td>
          </tr>
          <tr>
            <td>Hoàn cảnh</td>
            <td>{{ student.data.situation }}</td>
          </tr>
        </table>
      </v-row>
      <v-row no-gutters class="flex-column">
        <h3>4. Thông tin gia đình</h3>
        <h4>Thông tin về bố (Người giám hộ)</h4>
        <table>
          <tr>
            <td>Họ và tên bố</td>
            <td>{{ student.data.dadName }}</td>
          </tr>
          <tr>
            <td>Nghề nghiệp</td>
            <td>{{ student.data.dadJob }}</td>
          </tr>
          <tr>
            <td>Cơ quan</td>
            <td>{{ student.data.dadCompany }}</td>
          </tr>
          <tr>
            <td>Số điện thoại</td>
            <td>{{ student.data.dadPhone }}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{{ student.data.dadEmail }}</td>
          </tr>
        </table>

        <h4>Thông tin về mẹ (Người giám hộ)</h4>
        <table>
          <tr>
            <td>Họ và tên mẹ</td>
            <td>{{ student.data.momName }}</td>
          </tr>
          <tr>
            <td>Nghề nghiệp</td>
            <td>{{ student.data.momJob }}</td>
          </tr>
          <tr>
            <td>Cơ quan</td>
            <td>{{ student.data.momCompany }}</td>
          </tr>
          <tr>
            <td>Số điện thoại</td>
            <td>{{ student.data.momPhone }}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{{ student.data.momEmail }}</td>
          </tr>
        </table>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import UserAvatarPicker from '@/components/basic/picker/UserAvatarPicker'

export default {
  components: {
    UserAvatarPicker
  },
  props: {
    student: Object
  }
}
</script>

<style lang="scss" scoped>
.info-student-general {
  width: 100%;
  text-align: left;
}
.info-student-general td:nth-child(1) {
  width: 70%;
}
.info-student-general td:nth-child(2) {
  font-weight: bold;
}
.info-student td:nth-child(odd) {
  width: 50%;
  text-align: left;
  color: gray;
}
.info-student h3 {
  margin: 10px 0;
}
.info-student h4 {
  margin: 5px 0;
}
.info-student td {
  height: 35px;
  font-size: 14px;
}
</style>
