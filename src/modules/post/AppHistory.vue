<template>
  <div>
    <v-card class="my-4 pa-4" outlined>
      <AppHistoryFilter @onFilterChanged="onFilterChanged" />
    </v-card>
    <v-card class="my-4" outlined>
      <AppHistoryDataTable ref="table" />
    </v-card>
  </div>
</template>

<script>
import AppHistoryFilter from '@/modules/post/AppHistoryFilter.vue'
import AppHistoryDataTable from '@/modules/post/AppHistoryDataTable.vue'

export default {
  components: {
    AppHistoryFilter,
    AppHistoryDataTable
  },
  data() {
    return {}
  },
  mounted() {},
  computed: {},
  methods: {
    onFilterChanged(query) {
      this.$refs.table.refresh(query)
    }
  }
}
</script>

<style lang="scss" scoped></style>
