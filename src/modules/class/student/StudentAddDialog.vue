<template>
  <v-dialog v-model="dialog" scrollable width="800">
    <v-card>
      <v-card-title class="primary white--text mb-4">
        Thêm học viên</v-card-title
      >
      <v-layout>
        <v-flex xs12 sm3 md3>
          <student-filter @onFilterChanged="searchStudent"></student-filter>
        </v-flex>
        <v-flex xs12 sm9 md9>
          <v-data-table
            dense
            v-model="selected"
            show-select
            :headers="headers"
            :items="students"
            :items-per-page="10"
          >
            <v-layout slot="top">
              <v-flex xs12 sm8 md8 class="mb-2">
                <div class="flex-center">
                  <v-btn
                    small
                    class="mr-2"
                    depressed
                    @click="addStudentToClass"
                    :disabled="selected.length === 0"
                    :loading="loading"
                  >
                    <v-icon left>add</v-icon>Thêm Vào Lớp
                  </v-btn>
                </div>
              </v-flex>
              <v-flex xs12 sm4 md4 class="d-flex flex-row-reverse">
                <!-- <drop-menu></drop-menu> -->
              </v-flex>
            </v-layout>
          </v-data-table>
        </v-flex>
      </v-layout>
    </v-card>
  </v-dialog>
</template>

<script>
import { Student } from '@/plugins/api'
import StudentFilter from '@/modules/class/student/StudentFilter.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    StudentFilter
  },
  props: {
    lastSelectedStudents: Array,
    state: Boolean
  },
  data() {
    return {
      loading: false,
      dialog: false,
      searchResults: [],
      students: [],
      selected: [],
      headers: [
        {
          text: 'Tên',
          align: 'start',
          sortable: false,
          value: 'name'
        },
        { text: 'Mã', value: 'code' },
        { text: 'Nhóm', value: 'tags' },
        { text: 'Email', value: 'email' },
        { text: 'Phone', value: 'Phone' }
      ]
    }
  },
  computed: {
    ...mapGetters('classDetail', ['classData'])
  },
  methods: {
    ...mapActions('classDetail', ['updateClass']),
    async searchStudent(filter) {
      this.selected = []
      this.students = await Student.fetch({
        ...filter,
        id_nin: this.lastSelectedStudents.map(s => s.id)
      })
    },
    async addStudentToClass() {
      this.loading = true
      await this.updateClass({
        id: this.classData.id,
        students: [
          ...new Set([
            ...this.classData.students,
            ...this.selected.map(s => s.id)
          ])
        ]
      })
      this.loading = false
      this.dialog = false
    }
  },
  watch: {
    state(state) {
      this.selectedStudents = []
      this.dialog = true
    }
  }
}
</script>
