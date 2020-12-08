<template>
  <div>
    <Breadcrumbs
      headline="Bảo Lưu"
      :link="[{ text: 'Danh sách lớp', href: '../classes' }]"
    />

    <v-data-table
      flat
      item-key="id"
      class="elevation-1"
      v-model="selected"
      :options.sync="studentTableOptions"
      :server-items-length="totalItems"
      :headers="headers"
      :items="students"
      :items-per-page="10"
      :footer-props="{
        itemsPerPageOptions: [10, 15, 20, 30]
      }"
      dense
    >
      <v-layout slot="top"> </v-layout>
      <template v-slot:item.status="{ item }">
        <v-chip v-if="item.status" small dark :color="getColor(item.status)">{{
          item.status | getStatus
        }}</v-chip>
      </template>
      <template v-slot:item.name="{ item }">
        <card-student-name :student="item" link />
      </template>
      <template v-slot:item.generation="{ item }">
        <span style="white-space: nowrap;">{{
          item.generation ? item.generation.code : ''
        }}</span>
      </template>
      <template v-slot:item.classes="{ item }">
        <span
          style="white-space: nowrap;"
          v-for="(clazz, index) in item.classes"
          :key="clazz.id + item.id"
        >
          <router-link :to="'/class/' + clazz.id">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <span v-on="on">{{ clazz.code }}</span>
              </template>
              <span>{{ clazz.title || clazz.code }}</span>
            </v-tooltip>
          </router-link>
          <span v-if="index < item.classes.length - 1">{{ ', ' }}</span>
        </span>
      </template>
      <template v-slot:item.majors="{ item }">
        <span v-for="(major, index) in item.majors" :key="major.id">
          <router-link :to="'/major/' + major.id">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <span v-on="on">{{ major.code }}</span>
              </template>
              <span>{{ major.title }}</span>
            </v-tooltip>
          </router-link>
          <span v-if="index < item.majors.length - 1">{{ ', ' }}</span>
        </span>
      </template>
      <template v-slot:item.gender="{ item }">{{
        item.gender === 'male'
          ? 'Nam'
          : item.gender === 'female'
          ? 'Nữ'
          : 'Khác'
      }}</template>
      <template v-slot:item.action="{ item }">
        <v-btn text icon @click="onStudentSelected(item)">
          <v-icon dense>mdi-pencil</v-icon>
        </v-btn>
      </template>
      <template v-slot:item.tuition="{ item }">
        <span style="white-space: nowrap;">{{
          getTuitionStatus(item.leads)
        }}</span>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import CardStudentName from '@/components/basic/card/CardStudentName.vue'
import Breadcrumbs from '@/components/layout/Breadcrumbs.vue'
export default {
  components: {
    CardStudentName,
    Breadcrumbs
  },
  props: {
    role: String
  },
  data() {
    return {
      headers: [
        { text: 'Tên', value: 'name', align: 'left', sortable: false },
        { text: 'Khóa', value: 'generation', align: 'left', sortable: false },
        { text: 'Nhóm', value: 'tags', align: 'left', sortable: false },
        { text: 'Email', value: 'email', align: 'left', sortable: false },
        {
          text: 'Số Điện Thoại',
          value: 'phone',
          align: 'left',
          sortable: false
        },
        { text: 'Trạng Thái', value: 'status', align: 'left', sortable: false }
      ],
      selected: [],
      draw: false,
      search: '',
      status: null,
      statuses: [
        { text: 'Active', value: 'false' },
        { text: 'Blocked', value: 'true' }
      ],
      range: { from: null, to: null },
      previewUserId: null,
      ready: false,
      studentTableOptions: {}
    }
  },
  mounted() {
    this.clean()
    this.searchOptionsChanged({ status: 'reserved' })
  },
  computed: {
    ...mapState('app', ['department']),
    ...mapState('students', ['totalItems', 'students'])
  },
  methods: {
    ...mapActions('students', [
      'requestPageSettings',
      'searchStudents',
      'clean'
    ]),
    updateDraw(draw) {
      this.draw = draw
    },
    getColor(status) {
      if (status === 'active') return 'green'
      if (status === 'reserved') return 'orange'
      else return 'gray'
    },
    searchOptionsChanged(searchOptions) {
      this.searchStudents({ ...searchOptions, status: 'reserved' })
    },

    getTuitionStatus(leads) {
      if (!leads) return ''
      return leads.map(lead => lead.liabilities).reduce((a, b) => a + b, 0) >= 0
        ? ''
        : 'Nợ'
    }
  },
  watch: {
    studentTableOptions: {
      handler(newOptions, oldOptions) {
        const itemPerPageChanged =
          newOptions.itemsPerPage !== oldOptions.itemsPerPage
        const pageChanged = newOptions.page !== oldOptions.page
        if (pageChanged || itemPerPageChanged) {
          this.requestPageSettings({
            page: newOptions.page,
            itemsPerPage: newOptions.itemsPerPage
          })
        }
      },
      deep: true
    }
  },
  filters: {
    getStatus(status) {
      if (status === 'reserved') return 'Bảo Lưu'
      if (status === 'active') return 'Hoạt Động'
      return status
    }
  }
}
</script>
<style scoped>
td {
  white-space: nowrap !important   ;
}
</style>
