<template>
  <v-card class="px-md-6 mx-md-4 elevation-1 mb-2">
    <v-card-text>
      <template>
        <div>
          <div>
            <v-btn color="success" @click="$emit('saveMarks', studentMarks)">Lưu</v-btn>
          </div>
          <div class="d-flex table-container pt-4">
            <table class="mark-table">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Học sinh</th>
                  <th>Ngày sinh</th>
                  <th :colspan="factor.quantity">Điểm {{ factor.title }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, order) in studentMarks" :key="item.student.id">
                  <td>{{ order + 1 }}</td>
                  <td>
                    <CardStudentName :student="item.student" link />
                  </td>
                  <td>{{ item.student.dob | ddmmyyyy }}</td>

                  <td v-for="mark in item.marks" :key="mark.index">
                    <v-text-field
                      v-if="factor.subject.markType === 'mark'"
                      outlined
                      dense
                      :rules="[$rules.markInput]"
                      v-model="mark.value"
                      type="number"
                    />
                    <v-select
                      v-else
                      :items="[
                        { text: 'Đạt', value: 1 },
                        { text: 'Không đạt', value: 0 }
                      ]"
                      v-model="mark.value"
                      outlined
                      dense
                      hide-details
                    ></v-select>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </template>
    </v-card-text>
  </v-card>
</template>
<script>
import CardStudentName from '@/components/basic/card/CardStudentName.vue'

export default {
  components: {
    CardStudentName
  },
  data() {
    return {
      studentMarks: []
    }
  },
  props: {
    marks: Array,
    factor: Object
  },
  methods: {
    onDataChanged() {
      if (this.marks && this.factor) {
        this.studentMarks = this.marks
      }
    }
  },

  created() {},
  watch: {
    marks(val) {
      this.onDataChanged()
    },
    factor(val) {
      this.onDataChanged()
    }
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
  color: #212121;
  border-collapse: collapse;
  width: 100%;
}
.table-container {
  overflow: auto;
  max-width: 100%;
}
</style>
