<template>
  <v-data-table
    v-model="selecteds"
    :headers="headers"
    :items="classes"
    item-key="title"
    show-select
    class="elevation-1"
    :footer-props="{
      'items-per-page-text': 'Lớp mỗi trang',
      'items-per-page-all-text': 'Tất cả'
    }"
  >
    <div slot="top">
      <div>
        <v-card flat class="px-4 pt-4 mt-4" outlined>
          <p class="text--secondary">
            Đây là thao tác gửi tin nhắn thông tin học sinh vắng mặt/ quên quẹt thẻ trong ngày. Hệ thống sẽ tổng hợp lại
            và gửi thông tin tương ứng của mỗi học sinh tới ứng dụng Sổ liên lạc điện tử của phụ huynh.
          </p>
          <p class="text--secondary">
            Vui lòng kiểm tra thời khóa biểu và danh sách lớp dưới đây trước khi tiến hành thao tác này.
          </p>
        </v-card>
        <v-card outlined flat class="ma-1 mt-4 pa-4 elevation-1">
          <div class="d-flex">
            <AutocompleteGrade
              return-object
              class="mr-2"
              item-text="title"
              item-value="id"
              label="Khối"
              required
              dense
              outlined
              auto-select-first
              hide-details
              clearable
              @change="gradeChanged"
            />
            <AutocompleteDivision
              v-model="division"
              item-text="title"
              item-value="id"
              label="Ban"
              return-object
              required
              dense
              clearable
              outlined
              :filter="divisionFilter"
            />
            <v-btn class="ml-2" color="primary" outlined @click="search">Tìm kiếm</v-btn>
          </div>
        </v-card>
        <div class="d-flex justify-space-between ps-4 py-2">
          <span :class="selecteds.length ? 'text--primary' : 'text--disabled'">
            {{ selecteds.length ? 'Đã chọn ' + selecteds.length + ' lớp' : 'Chưa chọn' }}
          </span>
          <v-btn
            small
            color="primary"
            :disabled="!selecteds.length"
            @click="$emit('sendDiligenceSMS', { classes: selecteds })"
          >
            Gửi tin nhắn
          </v-btn>
        </div>
      </div>
    </div>
  </v-data-table>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import AutocompleteGrade from '@/components/basic/input/AutocompleteGrade'
import AutocompleteDivision from '@/components/basic/input/AutocompleteDivision'
import { get } from 'lodash'

export default {
  components: { AutocompleteGrade, AutocompleteDivision },
  data() {
    return {
      selecteds: [],
      grade: null,
      headers: [
        { text: 'Lớp', value: 'title', sortable: false },
        { text: 'Đi muộn', value: 'late', sortable: false },
        { text: 'Vắng / quên quẹt thẻ', value: 'absent', sortable: false }
      ],
      division: null,
      loading: false
    }
  },
  computed: {
    ...mapState('postCreate', ['classes']),

    divisionFilter() {
      return { academicLevel: get(this.grade, 'academicLevel') }
    }
  },
  methods: {
    ...mapActions('postCreate', ['fetchClassData']),
    gradeChanged(grade) {
      if (get(this.grade, 'academicLevel') !== get(grade, 'academicLevel')) {
        this.division = null
      }
      this.grade = grade
    },
    search() {
      this.fetchClassData({ grade: get(this.grade, 'id'), division: get(this.division, 'id') })
    }
  }
}
</script>

<style lang="scss" scoped></style>
