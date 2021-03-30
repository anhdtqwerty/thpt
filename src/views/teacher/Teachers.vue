<template>
  <div>
    <div class="pa-4 d-flex justify-space-between align-center">
      <div>
        <Breadcrumbs
          headline="Giáo viên"
          :link="[{ text: 'Giáo viên', href: '../teachers' }]"
        />
      </div>
      <div class="flex-center">
        <v-btn
          v-if="$vuetify.breakpoint.mdAndUp"
          class="mr-2"
          outlined
          color="primary"
        >
          <v-icon left>mdi-file-excel</v-icon> Xuất Excel
        </v-btn>
        <v-btn
          depressed
          dark
          color="#0D47A1"
          @click.stop="createState = !createState"
        >
          <v-icon left>add</v-icon>{{ titleBtn }}
        </v-btn>
      </div>
    </div>

    <v-card outlined class="py-md-4 px-md-6 mx-md-4 mb-6 elevation-0">
      <teacher-filter @onFilterChanged="refresh"></teacher-filter>
    </v-card>

    <v-card outlined class="mx-md-4 elevation-0">
      <teacher-data-table ref="teacherDataTable" />
    </v-card>
    <new-teacher-dialog :state="createState" />
  </div>
</template>
<script>
import TeacherFilter from '@/modules/teacher/TeacherFilter.vue'
import NewTeacherDialog from '@/modules/teacher/TeacherNewDialog'
import TeacherDataTable from '@/modules/teacher/TeacherDataTable'
import Breadcrumbs from '@/components/layout/Breadcrumbs.vue'
import Vuetify from 'vuetify'
import Vue from 'vue'

Vue.use(Vuetify)

export default {
  components: {
    Breadcrumbs,
    TeacherFilter,
    NewTeacherDialog,
    TeacherDataTable
  },
  data() {
    return {
      createState: false,
      filterState: false,
    }
  },
  computed: {
    titleBtn() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
        case 'sm':
          return 'Thêm'
        default:
          return 'Thêm Giáo viên'
      }
    },
  },
  methods: {
    refresh(query) {
      this.$refs.teacherDataTable.refresh(query)
    },
  }
}
</script>
