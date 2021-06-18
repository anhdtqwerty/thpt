<template>
  <v-card class="mx-md-4 elevation-1">
    <v-data-table :headers="headers" :items="divisions" hide-default-footer>
      <template v-slot:[`item.academicLevel`]="{ item }">
        <span>{{ item.academicLevel.type | getAcademicLevel }}</span>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <DivisionActions v-if="!(item.config && item.config.default)" :selected="item" />
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import DivisionActions from '@/modules/division/DivisionListActions.vue'

export default {
  components: {
    DivisionActions
  },
  props: {
    divisions: Array
  },
  data() {
    return {
      headers: [
        {
          text: 'Phân ban',
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
  computed: {},
  async created() {},
  methods: {}
}
</script>

<style scoped></style>
