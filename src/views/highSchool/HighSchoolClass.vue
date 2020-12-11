<template>
  <page-layout page-title="Khối 10" class="high-school-class">
    <template v-slot:action>
      <add-class-dialog>
        <template v-slot:activator="{ on }">
          <v-btn color="primary" v-on="on">
            <v-icon>mdi-plus</v-icon>
            <span>Thêm lớp học</span>
          </v-btn>
        </template>
      </add-class-dialog>
    </template>
    <v-card>
      <v-card-text class="px-5">
        <div class="text-right">
          <setting-table-header
            :default-headers="originHeaders"
            @change="headers = $event"
          />
          <KebapMenu v-if="!$vuetify.breakpoint.xs">
            <v-list>
              <v-list-item>
                <export-excel :custom-header="headers" api="/classes/" />
              </v-list-item>
            </v-list>
          </KebapMenu>
        </div>
        <v-row>
          <v-col cols="12" md="10">
            <grid-filter
              ref="filter"
              class="group-input"
              :meta="filterData"
              col-number="3"
              hide-action
              hide-details
            ></grid-filter>
          </v-col>
          <v-col class="align-center d-flex justify-end" cols="12" md="2">
            <v-btn color="primary" @click="onClickFilterButton">
              <v-icon small>mdi-filter</v-icon>
              <span>Lọc</span>
            </v-btn>
          </v-col>
        </v-row>

        <v-data-table :headers="headers" :items="items" :loading="loading">
        </v-data-table>
      </v-card-text>
    </v-card>
  </page-layout>
</template>

<script>
import PageLayout from '@/components/layout/PageLayout'
import GridFilter from '@/components/basic/filter/GridFilter'
import { mapActions, mapState, mapGetters } from 'vuex'
import SettingTableHeader from '@/components/basic/table/SettingHeaders'
import ExportExcel from '@/components/basic/ExportExcel'
import KebapMenu from '@/components/basic/menu/KebapMenu.vue'
import AddClassDialog from '@/modules/highSchool/class/AddHighSchooClassDialog'
export default {
  components: {
    PageLayout,
    GridFilter,
    SettingTableHeader,
    KebapMenu,
    ExportExcel,
    AddClassDialog
  },
  data() {
    return {
      originHeaders: [
        {
          text: 'Tên lớp',
          value: 'className',
          align: 'left',
          sortable: false,
          show: true
        },
        {
          text: 'Phân ban',
          value: 'division',
          align: 'left',
          sortable: false,
          show: true
        },
        {
          text: 'Giáo viên chủ nhiệm',
          value: 'teacher',
          align: 'left',
          sortable: false,
          show: true
        },
        {
          text: 'Trạng thái',
          value: 'status',
          align: 'left',
          sortable: false,
          show: true
        },
        {
          text: 'Ghi chú',
          value: 'note',
          align: 'left',
          sortable: false,
          show: true
        }
      ],
      headers: [],
      totalClass: 0,
      options: {},
      loading: false,
      filterQuery: {}
    }
  },
  computed: {
    ...mapState('division', ['divisions']),
    ...mapState('grade', ['grades']),
    ...mapGetters('teacher', ['teachers']),
    ...mapGetters('class', ['classes']),
    items() {
      const classData = this.classes.map(item => ({
        className: item.title,
        division: item.major.title,
        teacher: item.teachers.map(teacher => teacher.name).join(','),
        status: item.status,
        note: item.description
      }))
      return classData
    },
    filterData() {
      return {
        inputs: [
          {
            type: 'dropdown',
            config: {
              key: 'division',
              label: 'Khối',
              defaultValue: '',
              rules: [],
              itemText: 'title',
              itemValue: '_id',
              items: this.divisions || []
            }
          },
          {
            type: 'dropdown',
            config: {
              key: 'grade',
              label: 'Phân ban',
              defaultValue: '',
              rules: [],
              itemText: 'title',
              itemValue: '_id',
              items: this.grades || []
            }
          },
          {
            type: 'dropdown',
            config: {
              key: 'teacher',
              label: 'Giáo viên',
              defaultValue: '',
              itemText: 'name',
              itemValue: '_id',
              rules: [],
              items: this.teachers
            }
          },
          {
            type: 'dropdown',
            config: {
              key: 'teacher',
              label: 'Giáo viên',
              defaultValue: '',
              itemText: 'name',
              itemValue: '_id',
              rules: [],
              items: this.teachers
            }
          }
        ]
      }
    }
  },
  mounted() {
    this.loading = true
    Promise.all([
      this.fetchDivision(),
      this.fetchGrades(),
      this.fetchTeachers(),
      this.fetchClasses()
    ]).then(() => {
      this.loading = false
    })
  },
  methods: {
    ...mapActions('division', ['fetchDivision']),
    ...mapActions('grade', ['fetchGrades']),
    ...mapActions('teacher', ['fetchTeachers']),
    ...mapActions('class', ['fetchClasses']),
    onClickFilterButton() {
      const filterData = this.$refs['filter'].getFormData()
      console.log(filterData)
    }
  }
}
</script>

<style lang="scss" scoped></style>
