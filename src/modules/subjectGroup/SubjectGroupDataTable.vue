<template>
  <v-card class="mx-md-4 elevation-1">
    <v-data-table
      :headers="headers"
      :items="subjectGroups"
      :footer-props="{
        'items-per-page-text': 'Bộ môn mỗi trang',
        'items-per-page-all-text': 'Tất cả'
      }"
    >
      <template v-slot:[`footer.page-text`]="items">
        {{ items.pageStart }} - {{ items.pageStop }} trên tổng
        {{ items.itemsLength }}
      </template>
      <template v-slot:[`item.academicLevel`]="{ item }">
        <span>{{ item.academicLevel.type | getAcademicLevel }}</span>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <SubjectGroupListAction v-if="!(item.config && item.config.default)" :selected="item" />
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import SubjectGroupListAction from '@/modules/subjectGroup/SubjectGroupListAction.vue'

export default {
  components: { SubjectGroupListAction },
  props: {
    subjectGroups: Array
  },
  data() {
    return {
      headers: [
        {
          text: 'Bộ môn',
          value: 'title',
          align: 'left',
          sortable: false,
          show: true,
          width: 300
        },
        {
          text: 'Cấp học',
          value: 'academicLevel',
          align: 'center',
          sortable: false,
          show: true
        },
        {
          text: 'Hành động',
          value: 'actions',
          align: 'center',
          sortable: false,
          show: true,
          width: 100
        }
      ]
    }
  },

  async created() {}
}
</script>

<style scoped></style>
