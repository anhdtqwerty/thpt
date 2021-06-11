<template>
  <div>
    <div class="pa-4 d-flex justify-space-between align-center">
      <div>
        <Breadcrumbs
          headline="Năm học"
          :link="[
            { text: 'Nâng cao', href: '../generation' },
            { text: 'Năm học', href: '/generation' }
          ]"
        />
      </div>
    </div>
    <v-card class="px-md-6 mx-md-4 elevation-1 py-4">
      <ul class="steps">
        <li class="active mr-2"><p>Mở năm học</p></li>
        <li class="undone mr-2"><p>Tổng kết học kỳ I</p></li>
        <li class="undone mr-2"><p>Tổng kết học kỳ II</p></li>
        <li class="undone"><p>Đóng năm học</p></li>
      </ul>

      <v-card v-if="!openGeneration" outlined class="d-flex flex-column justify-center my-8 mx-16 pa-4">
        <p class="text--secondary">
          Đây là thao tác cần thực hiện để khai báo thông tin cho năm học mới, cấu hình các mốc thời gian quan trọng
          trong năm, cũng như sắp xếp lại lớp học, học sinh trước khi vào năm học mới.
        </p>
        <p class="text--secondary">
          Nếu đây là lần đâu tiên hệ thống được đưa vào hoạt động, bạn sẽ cần thực hiện thao tác này để khởi tạo hệ
          thống, trước khi nhập các dữ liệu quan trọng khác.
        </p>

        <v-checkbox v-model="checkbox" label="Xác nhận thực hiện thao tác" />
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer />
          <v-btn
            :disabled="!checkbox"
            @click="openGeneration = true"
            depressed
            color="primary"
            class="px-6 mt-4  white--text"
            >Xác nhận</v-btn
          >
        </v-card-actions>
      </v-card>

      <OpenGeneration v-if="openGeneration" />
    </v-card>
  </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import OpenGeneration from '@/views/generation/OpenGeneration.vue'

export default {
  components: {
    Breadcrumbs,
    OpenGeneration
  },
  props: {
    role: String
  },
  data() {
    return {
      checkbox: false,
      openGeneration: false
    }
  },
  async created() {},
  computed: {},
  methods: {}
}
</script>
<style scoped>
.steps {
  list-style-type: none;
  padding: 0;
}
.steps li {
  display: inline-block;
  margin-bottom: 3px;
}
.steps li a,
.steps li p {
  background: #e5f4fd;
  padding: 8px 20px;
  color: #0077bf;
  display: block;
  font-size: 14px;
  font-weight: bold;
  position: relative;
  text-indent: 12px;
}
.steps li a:hover,
.steps li p:hover {
  text-decoration: none;
}
.steps li a:before,
.steps li p:before {
  border-bottom: 18px solid transparent;
  border-left: 12px solid #fff;
  border-top: 18px solid transparent;
  content: '';
  height: 0;
  position: absolute;
  left: 0;
  top: 50%;
  width: 0;
  margin-top: -18px;
}
.steps li a:after,
.steps li p:after {
  border-bottom: 18px solid transparent;
  border-left: 12px solid #e5f4fd;
  border-top: 18px solid transparent;
  content: '';
  height: 0;
  position: absolute;
  /*right: -12px;*/
  left: 100%;
  top: 50%;
  width: 0;
  margin-top: -18px;
  z-index: 1;
}
.steps li.active a,
.steps li.active p {
  background: #0077bf;
  color: #fff;
}
.steps li.active a:after,
.steps li.active p:after {
  border-left: 12px solid #0077bf;
}
.steps li.undone a,
.steps li.undone p {
  background: #eee;
  color: #333;
}
.steps li.undone a:after,
.steps li.undone p:after {
  border-left: 12px solid #eee;
}
.steps li.undone p {
  color: #aaa;
}
</style>
