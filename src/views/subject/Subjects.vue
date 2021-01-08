<template>
  <div>
    <div class="pa-4 d-flex justify-space-between align-center">
      <div>
        <Breadcrumbs
          headline="Quản lý môn"
          :link="[{ text: 'Nâng cao', href: '../divisions' },{ text: 'Môn học', href: '../subjects' }]"
        />
      </div>
      <div class="flex-center">
        <v-btn @click="createSubject = !createSubject" dark color="primary">
          <v-icon left>add</v-icon>{{ addButtonText }}
        </v-btn>
      </div>
    </div>
    <SubjectNewDialog :state="createSubject" />

    <v-card class="px-md-6 mx-md-4 elevation-1">
      <v-data-table
        :headers="headers"
        :items="subjects"
        @click:row="onSelected"
      >
        <div slot="top" class="d-flex mb-2">
          <v-spacer></v-spacer>
          <div>
            <drop-menu
              :default-headers="headers"
              @change="headers = $event"
              v-if="$vuetify.breakpoint.mdAndUp"
            ></drop-menu>
          </div>
        </div>
        <template v-slot:item.actions="{ item }">
          <div>
            <v-btn class="elevation-0" icon small @click="onRemove(item.id)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </div>
        </template>
        <template v-slot:item.grade="{ item }">
          {{ item.grade | getGrade }}
        </template>
        <template v-slot:item.divisions="{ item }">
          {{ item.divisions | getDivision }}
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import DropMenu from '@/modules/student/menu/Menu.vue'
import SubjectNewDialog from '@/modules/subject/SubjectNewDialog'

export default {
  components: {
    SubjectNewDialog,
    Breadcrumbs,
    DropMenu,
  },
  props: {
    role: String,
  },
  data() {
    return {
      headers: [
        {
          text: 'Tên môn',
          value: 'title',
          align: 'left',
          sortable: false,
          show: true,
        },
        { text: 'Khối', value: 'grade', show: true },
        { text: 'Phân ban', value: 'divisions', show: true },
        { text: 'Hệ số tổng kết', value: 'markMultiply', show: true },
        { text: 'Loại đánh giá', value: 'markType', show: true },
        {
          text: 'Hành động',
          value: 'actions',
          align: 'center',
          sortable: false,
          show: true,
        },
      ],
      createSubject: false,
      selected: {},
    }
  },

  computed: {
    ...mapState('app', ['department']),
    ...mapState('subjects', ['subjects']),
    addButtonText() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
        case 'sm':
          return 'Thêm'
        default:
          return 'Thêm môn'
      }
    },
  },
  async created() {
    await this.refresh({})
  },
  methods: {
    ...mapActions('subjects', ['fetchSubjects', 'removeSubject']),
    updateDraw(draw) {
      this.draw = draw
    },
    async refresh() {
      console.log('refresh')
      await this.fetchSubjects()
    },
    onSubjectSelected(subject) {
      this.setSubject(subject)
    },
    onSelected(subject) {
      this.$router.push(`./subject/${subject.id}`)
    },
    onRemove(id) {
      this.$dialog.confirm({
        title: 'Xóa phân ban',
        text: 'Bạn có chắc muốn xóa môn này?',
        okText: 'Có',
        cancelText: 'Không',
        done: async () => {
          await this.removeSubject(id)
        },
      })
    },
  },
  filters: {
    getDivision(divisions) {
      if (!divisions || !divisions.length) return ''
      return divisions.map((d) => d.title).join(', ')
    },
    getGrade(grade) {
      if (!grade) return ''
      return grade.title
    },
  },
}
</script>
