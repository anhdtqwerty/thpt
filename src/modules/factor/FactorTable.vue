<template>
  <v-data-table
    v-bind="this.$attrs"
    flat
    dense
    item-key="id"
    disableSort
    v-model="selected"
    :items-per-page="-1"
    :headers="headers"
    :items="factors"
    class="mt-3"
  >
    <template v-slot:item.status="{ item }"> </template>
    <template v-slot:item.gender="{ item }">{{}}</template>
    <template v-slot:item.action="{ item }">
      <v-btn text icon @click="updateFactor(item)">
        <v-icon dense small>mdi-pencil</v-icon>
      </v-btn>
      <v-btn text icon @click="removeFactor(item)">
        <v-icon dense small>mdi-delete</v-icon>
      </v-btn>
    </template>
  </v-data-table>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
const defaultHeaders = [
  { text: 'Tên đầu điểm', value: 'title' },
  { text: 'Hệ số', value: 'multiply' },
  { text: 'Cột điểm', value: 'quantity' },
  { text: 'Mô tả', value: 'description' },
  { text: 'Hành động', value: 'action' }
]
export default {
  components: {},
  data() {
    return {
      headers: defaultHeaders,
      selected: [],
      mark: {},
      dialog: false,
      search: '',
      status: null,
      range: { from: null, to: null },
      previewUserId: null,
      ready: false,
      factorTableOptions: {}
    }
  },
  computed: {
    ...mapState('app', ['department']),
    ...mapState('factor', ['factors'])
  },
  methods: {}
}
</script>
