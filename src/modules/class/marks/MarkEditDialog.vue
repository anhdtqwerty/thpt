<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="450px">
      <v-card v-if="student">
        <v-toolbar dense class="elevation-0 white--text" color="#0D47A1">
          <v-toolbar-title>{{ student.name }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon dark @click="cancel">close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-divider />
        <v-card-text class="mt-6">
          <div class="text-h6 mb-6">Nhập điểm cho học viên:</div>
          <v-text-field
            v-for="item in markTemplate"
            v-model="tem[item.code]"
            :key="item.code"
            :label="item.title"
            outlined
          ></v-text-field>
        </v-card-text>
        <v-card-actions class="mt-n7 pr-6 pb-8">
          <v-spacer></v-spacer>
          <v-btn class="px-6" color="primary" @click="save()">Lưu</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import _ from 'lodash'
export default {
  props: {
    state: Boolean,
    student: Object,
    markTemplate: Array
  },
  computed: {
    ...mapState('classDetail', ['marks', 'classData'])
  },
  data: () => ({
    dialog: false,
    tem: {}
  }),
  created() {
    this.refresh()
  },
  methods: {
    ...mapActions('classDetail', ['createMark']),
    save() {
      this.createMark({
        data: {
          student: _.get(this.student, 'id'),
          ...this.marks[this.student.id],
          class: this.classData.id,
          course: _.get(this.classData, 'course.id'),
          major: _.get(this.classData, 'major.id'),
          department: _.get(this.classData, 'department.id'),
          data: this.markTemplate.map(t => ({
            ...t,
            code: t.code + '',
            value: this.tem[t.code]
          })),
          value: this.calTotal(),
          status: 'learning'
        }
      })
      this.dialog = false
    },
    refresh() {
      if (!this.student) return
      this.tem = _.get(this.marks, `${this.student.id}.data`, []).reduce(
        (acc, cur) => {
          return {
            ...acc,
            [cur.code]: cur.value
          }
        },
        {}
      )
    },
    cancel() {
      this.dialog = false
    },
    calTotal() {
      const mark = Object.values(this.markTemplate).reduce(
        (acc, cur) => {
          return {
            total: (acc.total += this.tem[cur.code] * cur.multiplier),
            div: (acc.div += cur.multiplier)
          }
        },
        { total: 0, div: 0 }
      )
      return Math.round((mark.total / mark.div) * 100) / 100
    }
  },
  watch: {
    state(state) {
      this.dialog = true
    },
    student(student) {
      this.refresh()
    }
  }
}
</script>
