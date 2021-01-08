<template>
  <page-layout class="dashboard-page">
    <div class="dashboard__overview-wrapper">
      <v-row no-gutters>
        <v-col
          class="dashboard__box-wrapper"
          cols="6"
          sm="6"
          md="3"
          v-for="item in overviewDataArray"
          :key="item.order"
        >
          <v-card class="px-md-6 mx-md-2 elevation-1 mb-2">
            <v-card-text class="databoard__content">
              <div class="dashboard__box__icon">
                <img :src="item.icon" alt="log size 24x24" />
              </div>
              <div>
                <div class="dashboard__box__title">{{ item.label }}</div>
                <div class="dashboard__box__value">
                  <div>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <span v-bind="attrs" v-on="on">
                          {{ item.value | convertNumberToMilion }}
                        </span>
                      </template>
                      <span>{{ item.value.toLocaleString() }}</span>
                    </v-tooltip>
                  </div>
                  <span class="dashboard__box__subvalue" v-if="item.total"
                    >/ {{ item.total }}</span
                  >
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <div class="dashboard__graph-wrapper">
      <v-card class="px-md-6 mx-md-2 elevation-1">
        <v-card-title class="v-card-title-custom">
          <card-title>Doanh thu</card-title>
          <v-select
            class="year-selecter"
            :items="years"
            :menu-props="{ maxHeight: '200' }"
            label="Năm"
            v-model="chartData.currentYear"
            outlined
            dense
          >
          </v-select>
        </v-card-title>
        <v-card-text>
          <apex-charts
            width="100%"
            height="500"
            type="bar"
            :options="chartData.options"
            :series="revenuesSeries"
          ></apex-charts>
        </v-card-text>
      </v-card>
    </div>
    <div class="dashboard__table-wrapper">
      <v-card class="px-md-6 mx-md-2 elevation-1">
        <v-card-title>
          <card-title> Học viên mới </card-title>
        </v-card-title>
        <v-card-text>
          <v-data-table
            hide-default-footer
            :headers="newStudentData.headers"
            :items="newStudentData.items"
            :items-per-page="5"
            class="elevation-0"
          >
            <template v-slot:item.status="{ item }">
              <v-chip v-if="item.status" label color="green" dark>
                {{ item.status }}
              </v-chip>
              <v-chip v-else label dark>
                {{ item.status }}
              </v-chip>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </div>
  </page-layout>
</template>
<script>
import moment from 'moment'
import CardTitle from '@/components/basic/card/CardTitle'
import ApexCharts from 'vue-apexcharts'
import PageLayout from '@/components/layout/PageLayout'
import {
  Student as StudentAPI,
  Course as CourseAPI,
  Bill as BillAPI,
  Teacher as TeacherAPI
} from '@/plugins/api'

import iconLibrary from '@/assets/local_library_24.png'
import iconContact from '@/assets/import_contacts_24.png'
import iconATM from '@/assets/local_atm_24.png'
import iconPeople from '@/assets/people_24.png'

const startOfMonth = moment()
  .startOf('month')
  .toISOString()
export default {
  components: {
    PageLayout,
    ApexCharts,
    CardTitle
  },
  filters: {
    convertNumberToMilion(value) {
      if (value / 1000000 > 1) {
        const number = Math.round(value / 1000000)
        return `${number.toLocaleString()} (triệu)`
      } else {
        return `${value.toLocaleString()}`
      }
    }
  },
  data() {
    return {
      overviewData: {
        students: {
          label: 'Học viên',
          value: 0,
          order: 1,
          total: 0,
          icon: iconLibrary
        },
        courses: {
          label: 'Khóa học',
          value: 0,
          order: 2,
          total: 0,
          icon: iconContact
        },
        revenues: { label: 'Doanh thu', value: 0, order: 3, icon: iconATM },
        teachers: { label: 'Giáo viên', value: 0, order: 4, icon: iconPeople }
      },
      chartData: {
        currentYear: new Date().getFullYear(),
        rawData: [],
        options: {
          chart: {
            id: 'basic-bar'
          },
          xaxis: {
            categories: [...Array(12).keys()].map(i => `Tháng ${i + 1}`)
          },
          yaxis: {
            labels: {
              formatter: value => {
                return value.toLocaleString()
              }
            }
          },
          fill: {
            colors: ['#0D47A1']
          },
          grid: {
            borderColor: '#DADADA',
            strokeDashArray: 4
          },
          dataLabels: {
            enabled: false
          }
        }
      },
      newStudentData: {
        headers: [
          { text: 'Tên học viên', value: 'name' },
          { text: 'Mã học viên', value: 'code' },
          { text: 'Khóa', value: 'generation' },
          { text: 'Nhóm', value: 'tags' },
          { text: 'Chuyên ngành', value: 'major' },
          { text: 'Trạng thái', value: 'status' },
          { text: 'Số điện thoại', value: 'phone' },
          { text: 'Email', value: 'email' }
        ],
        items: []
      }
    }
  },
  computed: {
    overviewDataArray() {
      return Object.values(this.overviewData).sort((a, b) => a.order - b.order)
    },
    years() {
      const date = new Date()
      const currentYear = date.getFullYear()
      const optionNumbers = 10
      const yearList = []
      for (let i = 0; i < 10; i++) {
        yearList.push(currentYear - i)
      }
      return yearList
    },
    revenuesSeries() {
      const name = 'Doanh thu'

      const dataInYear = this.chartData.rawData.filter(item => {
        return (
          new Date(item.createdAt).getFullYear() === this.chartData.currentYear
        )
      })

      const data =
        dataInYear.length > 0
          ? dataInYear.reduce((acc, item) => {
            const month = new Date(item.createdAt).getMonth()
            acc[month] += item.customerPaid ? item.customerPaid : 0
            return acc
          }, Array(12).fill(0))
          : []

      return [{ name, data }]
    }
  },
  async created() {
    this.$loading.active = true
    try {
      await this.triggerFetchOverviewData()
      await this.triggerFetchNewStudentData()
    } catch (err) {
      this.$loading.active = false
    } finally {
      this.$loading.active = false
    }
  },
  methods: {
    // [Start Transaction]
    async fetchActiveStudentCount() {
      try {
        const res = await StudentAPI.count({
          status: 'active'
        })
        return res
      } catch (error) {
        this.$alert.error('Can not count active student')
        return 0
      }
    },
    async fetchStudentCount() {
      try {
        const res = await StudentAPI.count()
        return res
      } catch (error) {
        this.$alert.error('Can not count student')
        return 0
      }
    },
    async fetchNewStudent() {
      try {
        const res = await StudentAPI.fetch({
          _limit: 5,
          _sort: 'createdAt:desc'
        })
        return res
      } catch (error) {
        this.$alert.error('Can not fetch new student')
        return []
      }
    },
    async fetchActiveCourseCount() {
      try {
        const res = await CourseAPI.count({
          status: 'active'
        })
        return res
      } catch (error) {
        this.$alert.error('Can not count active course')
        return 0
      }
    },
    async fetchCourseCount() {
      try {
        const res = await CourseAPI.count()
        return res
      } catch (error) {
        this.$alert.error('Can not count course')
        return 0
      }
    },
    async fetchAllBill() {
      try {
        const res = await BillAPI.fetch({
          _limit: -1,
          createdAt_gt: startOfMonth
        })
        return res
      } catch (err) {
        this.$alert.error('Can not fetch bill')
        return []
      }
    },
    async fetchTeacherCount() {
      try {
        const res = await TeacherAPI.count()
        return res
      } catch (error) {
        this.$alert.error('Can not count teacher')
        return 0
      }
    },
    // [End Transaction]
    // [Start Private]
    async triggerFetchOverviewData() {
      const overviewActiveStudentIndex = 0
      const overviewStudentIndex = 1
      const overviewActiveCourseIndex = 2
      const overviewCourseIndex = 3
      const overviewBillIndex = 4
      const overviewTeacherIndex = 5

      const values = await Promise.all([
        this.fetchActiveStudentCount(),
        this.fetchStudentCount(),
        this.fetchActiveCourseCount(),
        this.fetchCourseCount(),
        this.fetchAllBill(),
        this.fetchTeacherCount()
      ])
      this.handleStudentCount(
        values[overviewActiveStudentIndex],
        values[overviewStudentIndex]
      )
      this.handleTeacherCount(values[overviewTeacherIndex])
      this.handleCourseCount(
        values[overviewActiveCourseIndex],
        values[overviewCourseIndex]
      )
      this.handleBillsData(values[overviewBillIndex])
    },
    handleStudentCount(activeStudentCount, studentCount) {
      this.overviewData.students.total = studentCount.toLocaleString()
      this.overviewData.students.value = activeStudentCount.toLocaleString()
    },
    handleCourseCount(activeCourseCount, courseCount) {
      this.overviewData.courses.value = activeCourseCount.toLocaleString()
      this.overviewData.courses.total = courseCount.toLocaleString()
    },
    handleBillsData(billsData) {
      this.chartData.rawData = billsData
      const sumBill = billsData.reduce((acc, item) => {
        const amount = item.customerPaid || 0
        return acc + amount
      }, 0)
      this.overviewData.revenues.value = sumBill
    },
    handleTeacherCount(teacherCount) {
      this.overviewData.teachers.value = teacherCount.toLocaleString()
    },
    async triggerFetchNewStudentData() {
      const newStudentData = await this.fetchNewStudent()
      this.newStudentData.items = newStudentData.map(item => {
        return {
          name: item.name,
          code: item.code,
          generation: item.generation.code,
          tags: item.tags,
          major: item.majors[0] ? item.majors[0].code : '',
          status: item.status,
          phone: item.phone,
          email: item.email
        }
      })
    }
    // [End Private]
  }
}
</script>

<style lang="scss" scoped>
.dashboard__box-wrapper {
  padding: 6px 10px;
}
.dashboard__box__icon {
  width: 72px;
  min-width: 72px;
  height: 72px;
  border-radius: 50%;
  background: #ffecb3;
  margin-right: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 24px;
    height: 24px;
  }
}
.databoard__content {
  display: flex;
}
.dashboard__box__title {
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.4px;
  color: #9e9e9e;
  margin-bottom: 6px;
}
.dashboard__box__value {
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 20px;
  line-height: 28px;
  letter-spacing: 1px;
  color: #212121;
}
.dashboard__box__subvalue {
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  text-align: right;
  letter-spacing: 0.4px;

  color: #9e9e9e;
}
.dashboard__graph-wrapper,
.dashboard__table-wrapper {
  padding: 10px;
}
.v-card-title-custom {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.year-selecter {
  max-width: 133px;
}
::v-deep {
  .apexcharts-toolbar {
    display: none;
  }
}
@media screen and (max-width: 1200px) {
  .dashboard__box__icon {
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 15px;
  }
  .databoard__content {
    display: block;
  }
}
</style>
