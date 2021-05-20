<template>
  <div class="d-flex table-container">
    <table class="mark-table">
      <thead>
        <tr>
          <th rowspan="2">STT</th>
          <th rowspan="2">Học sinh</th>
          <th rowspan="2">Ngày sinh</th>
          <th class="semseter-header" :colspan="colspan || 30">{{ semester.title }}</th>
        </tr>
        <tr>
          <td v-for="factor in factors" :key="factor.id" :colspan="factor.quantity || 1">
            {{ factor.title }}
          </td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, order) in studentMarks" :key="item.id">
          <td>{{ order + 1 }}</td>
          <td class="px-2 py-0" style="text-align: left"><CardStudentName :student="item.student" link /></td>
          <td>{{ item.student.dob | ddmmyyyy }}</td>

          <td v-for="mark in item.marks" :key="mark.id">
            <span v-if="subject.markType === 'mark'">
              {{ mark.value }}
            </span>
            <span v-else>
              <span v-if="mark.value === 1">
                Đạt
              </span>
              <span v-if="mark.value === 0">
                Không Đạt
              </span>
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import CardStudentName from '@/components/basic/card/CardStudentName.vue'
import { first } from 'lodash'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      colspan: 0
    }
  },
  components: { CardStudentName },
  computed: {
    ...mapState('subjects', ['subject'])
  },
  props: {
    factors: Array,
    studentMarks: Array,
    semester: Object
  },
  methods: {},
  created() {
    if (this.studentMarks) this.colspan = first(this.studentMarks).marks.length
  }
}
</script>

<style lang="scss" scoped>
.mark-table {
  td,
  tr,
  th {
    border: 1px solid #e0e0e0;
  }
  td,
  th {
    padding: 14px 20px;
    text-align: center;
  }
  .semseter-header {
    font-size: 20px;
    color: #0d47a1;
    text-transform: uppercase;
  }
  color: #212121;
  border-collapse: collapse;
  width: 100%;
}
.table-container {
  overflow: auto;
  max-width: 100%;
}
</style>
