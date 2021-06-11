<template>
  <div>
    <div class="pa-4 d-flex justify-space-between align-center">
      <div>
        <Breadcrumbs headline="Trang chủ" :link="[{ text: 'Dashboard', href: '../dashboard' }]" />
      </div>
    </div>

    <!-- department info -->
    <v-card class="ma-4" outlined>
      <v-row>
        <v-col cols="6">
          <v-col class="pl-4" cols="12">
            <h2>{{ currentGeneration.name }}</h2>
          </v-col>
          <v-col class="pl-4" cols="12">
            {{ currentSemester.title }}
          </v-col>
        </v-col>
        <v-col cols="6">
          <v-row class="ma-4 justify-space-between">
            <v-col style="background-color: #BBDEFB" class="d-flex flex-column align-end" md="3">
              <div style="font-size: 24px">{{ classNo }}</div>
              <div class="text-caption">Lớp</div>
            </v-col>
            <v-col style="background-color: #BBDEFB" class="d-flex flex-column align-end" md="3">
              <div style="font-size: 24px">{{ studentNo }}</div>
              <div class="text-caption">Học sinh</div>
            </v-col>
            <v-col style="background-color: #BBDEFB" class="d-flex flex-column align-end" md="3">
              <div style="font-size: 24px">{{ teacherNo }}</div>
              <div class="text-caption">Giáo viên</div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>

    <!-- attendance violation -->
    <v-row class="my-4 mx-1">
      <v-col cols="6">
        <v-card outlined>
          <v-card-title class="pr-0">
            <v-icon color="primary">mdi-calendar-account</v-icon>
            <span class=" ml-2 text-subtitle-2">Điểm danh hôm qua</span>
            <v-spacer></v-spacer>
            <v-btn color="primary" text>Xem chi tiết</v-btn>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="pa-0">
            <v-row class="py-6">
              <v-col class="pl-6 text-center" cols="3">
                <span class="col-1">500</span>
                <br />
                <span class="text-subtitle">Học sinh đi đúng giờ</span>
              </v-col>
              <v-col class="text-center" cols="1">
                <v-divider class="my-2" vertical></v-divider>
              </v-col>
              <v-col class="text-center" cols="3">
                <span class="col-2">20</span> <br />
                <span class="text-subtitle">Học sinh đi muộn</span>
              </v-col>
              <v-col class="text-center" cols="1">
                <v-divider class="my-2" vertical></v-divider>
              </v-col>
              <v-col class="text-center" cols="3">
                <span class="col-3th">10</span> <br />
                <span class="text-subtitle">Học sinh vắng/quên quẹt thẻ</span>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card outlined>
          <v-card-title class="pr-0">
            <v-icon color="primary">mdi-star</v-icon>
            <span class="ml-2 text-subtitle-2">Khen thưởng kỷ luật tuần</span>
            <v-spacer></v-spacer>
            <v-btn color="primary" text to="/complimented">Xem chi tiết</v-btn>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="pa-0">
            <v-row class="py-6">
              <v-col class="text-center" cols="4">
                <span class="col-1">50</span>
                <br />
                <span class="text-subtitle">Khen thưởng</span>
              </v-col>
              <v-divider class="my-2" vertical></v-divider>
              <v-col class="text-center" cols="4">
                <span class="col-2">50</span> <br />
                <span class="text-subtitle">Kỷ luật</span>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- feedback -->
    <v-col cols="12">
      <v-card outlined>
        <v-card-title class="pr-0">
          <v-icon color="primary">mdi-forum</v-icon>
          <span class="ml-2 text-subtitle-2">Phản hồi phụ huynh gần đây</span>
          <v-spacer></v-spacer>
          <v-btn color="primary" text>Xem thêm</v-btn>
        </v-card-title>
      </v-card>
    </v-col>

    <!-- notification -->
    <v-col cols="12">
      <v-card outlined>
        <v-card-title class="pr-0">
          <v-icon color="primary">mdi-bell-ring</v-icon>
          <span class="ml-2 text-subtitle-2">Thông báo nhà trường gần đây</span>
          <v-spacer></v-spacer>
          <v-btn color="primary" text to="/post-history">Xem thêm</v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pa-0">
          <DashboardNotifications />
        </v-card-text>
      </v-card>
    </v-col>
  </div>
</template>
<script>
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import { mapActions, mapState } from 'vuex'
import DashboardNotifications from '@/modules/dashboard/DashboardNotifications.vue'

export default {
  components: {
    Breadcrumbs,
    DashboardNotifications
  },
  computed: {
    ...mapState('app', ['department', 'currentGeneration', 'currentSemester']),
    ...mapState('Dashboard', ['classNo', 'studentNo', 'teacherNo'])
  },
  async created() {
    await this.fetchDepartmentData()
  },
  methods: {
    ...mapActions('Dashboard', ['fetchDepartmentData'])
  }
}
</script>

<style scoped>
.col-1 {
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
  color: #46be8a;
}
.col-2 {
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
  color: #ffab40;
}
.col-3th {
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
  color: #fd6b6b;
}
</style>
