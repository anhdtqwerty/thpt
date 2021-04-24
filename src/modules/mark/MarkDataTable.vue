<template>
  <div class="d-flex table-container">
    <table class="mark-table">
      <thead>
        <tr>
          <th rowspan="2">STT</th>
          <th rowspan="2">Học sinh</th>
          <th rowspan="2">Ngày sinh</th>
          <th class="semseter-header" :colspan="12">{{ semester.title }}</th>
        </tr>
        <tr>
          <template v-for="factor in factors">
            <td :key="factor.id" :colspan="factor.quantity">
              {{ factor.title }}
            </td>
          </template>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, order) in marks" :key="item.id">
          <td>{{ order + 1 }}</td>
          <td><CardStudentName :student="item.student" link /></td>
          <td>{{ item.student.dob | ddmmyyyy }}</td>

          <template v-for="factor in factors">
            <td v-for="index in factor.quantity" :key="`${factor.id}-${index}`">
              {{ item.value }}
            </td>
          </template>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import CardStudentName from '@/components/basic/card/CardStudentName.vue'

export default {
  data() {
    return {}
  },
  components: { CardStudentName },
  props: {
    factors: Array,
    marks: Array,
    semester: Object
  },
  methods: {
    filterMarkByFactorAndSemeter: semesterType => factorId => marks => {
      return marks.filter(item => item.factorId === factorId)
    }
  },
  created() {}
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
