<template>
  <div>
    <div class="pa-4 pa-md-2 d-flex justify-space-between align-center">
      <div>
        <Breadcrumbs
          headline="Quản lý môn"
          :link="[{ text: 'Quản lý môn', href: '../subjects' }]"
        />
      </div>
      <div class="flex-center">
        <v-btn @click="createSubject = !createSubject" dark color="primary">
          <v-icon left>add</v-icon>{{ addButtonText }}
        </v-btn>
      </div>
    </div>
    <new-subject-dialog :state="createSubject" />

    <v-card class="pa-2 pa-md-4 ma-md-2 elevation-1">
      <p class="text-uppercase text-h6" style="color: #0d47a1">
        Danh sách các môn
      </p>
      <v-data-table
        :headers="headers"
        :items="subjects"
        @click:row="onSelected"
      >
        <template v-slot:item.actions="{ item }">
          <div>
            <v-btn class="elevation-0" icon small @click="onRemove()">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </div>
        </template>
        <template v-slot:item.grade="{ item }">
          {{ item.grade.title }}
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
import NewSubjectDialog from '@/modules/subject/SubjectNewDialog.vue'

export default {
  components: {
    NewSubjectDialog,
    Breadcrumbs
  },
  props: {
    role: String
  },
  data() {
    return {
      headers: [
        { text: 'Tên môn', value: 'title', align: 'left', sortable: false },
        { text: 'Khối', value: 'grade' },
        { text: 'Phân ban', value: 'divisions' },
        { text: 'Hệ số tổng kết', value: 'markMultiply' },
        { text: 'Loại đánh giá', value: 'markType' },
        {
          text: 'Hành động',
          value: 'actions',
          align: 'center',
          sortable: false
        }
      ],
      createSubject: false,
      selected: {}
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
    }
  },
  async created() {
    await this.refresh({})
  },
  methods: {
    ...mapActions('subjects', ['fetchSubjects']),
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
    onRemove() {
      this.$dialog.confirm({
        title: 'Xóa phân ban',
        text: 'Bạn có chắc muốn phân ban này?',
        okText: 'Có',
        cancelText: 'Không',
        done: async () => {
          await this.removeGrade(this.selected.id)
        }
      })
    }
  },
  filters: {
    getDivision(divisions) {
      if (!divisions || !divisions.length) return ''
      return divisions.map(d => d.title).join(', ')
    }
  }
}
</script>
