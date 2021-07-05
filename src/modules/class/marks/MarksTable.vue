<template>
  <div>
    <v-data-table disableSort v-if="classData" :headers="headers" :items="data">
      <template v-slot:[`item.student`]="{ item }">
        <user-item :data="item.student" :to="'student/' + item.student.id"></user-item>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click.stop="add(item)">edit</v-icon>
      </template>
      <template v-slot:[`item.total`]="{ item }">
        <b class="subtitle-1 font-weight-bold">{{ item.total }}</b>
      </template>
    </v-data-table>
    <v-skeleton-loader
      v-else
      class="mx-auto"
      max-width="300"
      type="table-heading, table-thead, table-tbody, table-tfoot"
    ></v-skeleton-loader>
    <mark-edit-dialog :state="dialog" :student="selected.student" :markTemplate="markTemplate"></mark-edit-dialog>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import UserItem from '@/modules/user/UserItem'
import MarkEditDialog from '@/modules/class/marks/MarkEditDialog'
import { get } from 'lodash'
export default {
  components: { UserItem, MarkEditDialog },
  props: {
    classData: Object
  },
  created() {},
  data() {
    return {
      dialog: false,
      markDialog: false,
      selected: {}
    }
  },
  computed: {
    ...mapGetters('classDetail', ['students']),
    ...mapState('classDetail', ['marks']),
    data() {
      return this.students.map(s => {
        const mark = get(this.marks, `${s.id}`, {})
        return {
          mark,
          student: s,
          ...get(mark, 'data', []).reduce(
            (acc, cur) => ({
              ...acc,
              [cur.code + '']: cur.value
            }),
            {}
          ),
          total: mark.value || 0
        }
      })
    },
    markTemplate() {
      return get(this.classData, 'course.mark', [])
    },
    headers() {
      return [
        {
          text: 'Học Sinh',
          align: 'left',
          sortable: false,
          value: 'student'
        },
        {
          text: 'Nhập Điểm',
          sortable: false,
          value: 'actions'
        },
        ...get(this.classData, 'course.mark', get(this.classData, 'metadata.mark', [])).map(m => ({
          text: m.title,
          value: m.code + ''
        })),
        {
          text: 'Tổng Kết',
          sortable: false,
          value: 'total'
        }
      ]
    }
  },
  methods: {
    add(item) {
      this.selected = item
      this.dialog = !this.dialog
    }
  },
  filters: {
    total(mark) {
      return Math.round((mark.total / mark.div) * 100) / 100
    }
  }
}
</script>
