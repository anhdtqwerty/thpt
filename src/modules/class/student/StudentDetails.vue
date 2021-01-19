<template>
  <v-card flat>
    <v-card-actions>
      <student-list-actions></student-list-actions>
    </v-card-actions>
    <v-card-title>
      <h1>{{ student.name }}</h1>
    </v-card-title>
    <v-card-text>
      <p class="font-weight-regular">
        Mã Học sinh: {{ student.code }}. <br />Mã Lớp: kodu-101. <br />Khóa Học:
        Kodu Nhập Môn
      </p>
      <h2>Tình Trạng điểm danh</h2>
      <br />
      <v-simple-table dense style="max-width:400px">
        <template v-slot:default>
          <tbody>
            <tr>
              <td>Đi học đúng giờ</td>
              <td><b class="font-weight-black">4/16</b> (25%)</td>
            </tr>
            <tr>
              <td>Đi học muộn</td>
              <td>8/16 (50%)</td>
            </tr>
            <tr>
              <td>Nghỉ học</td>
              <td class="font-weight-black" style="color:green">0/16 (0%)</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <br />
      <h2>Bảng Điểm</h2>
      <br />
      <v-simple-table dense>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Assignment 1(5%)</th>
              <th class="text-left">Progress Test 1(15%)</th>
              <th class="text-left">Assignment 2(5%)</th>
              <th class="text-left">Progress Test 2 (15%)</th>
              <th class="text-left">Assignment 3 (5%)</th>
              <th class="text-left">Thi cuối kỳ (40%)</th>
              <th class="text-left">Điểm Trung Bình</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <b class="font-weight-black">5/10</b>
              </td>
              <td>
                <b class="font-weight-black">4/10</b>
              </td>
              <td>
                <b class="font-weight-black">0/10</b>
              </td>
              <td>
                <b class="font-weight-black">7/10</b>
              </td>
              <td>
                <b class="font-weight-black">7/10</b>
              </td>
              <td>
                <b class="font-weight-black">8/10</b>
              </td>
              <td>
                <b class="font-weight-black" style="color:blue">6.5/10</b>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <br />
      <h2>Tổng kết</h2>
      <br />
      <p class="subtitle-1">
        Trạng thái:
        <b style="color: green">Passed</b>
        <br />Xếp loại:
        <b style="color: blue">Trung Bình</b>
      </p>
    </v-card-text>
  </v-card>
</template>

<script>
import StudentListActions from '@/modules/class/student/StudentListActions'
export default {
  components: {
    StudentListActions
  },
  props: {
    student: Object
  }
}
</script>

<style scoped>
tr,
td,
th {
  border: solid 1px gray;
}
</style>
