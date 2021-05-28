<template>
  <div>
    <v-card class="my-4 pa-4" outlined>
      <SmsHitoryFilter @onFilterChanged="onFilterChanged" />
    </v-card>
    <v-card class="my-4" outlined>
      <SmsHistoryDatatable ref="table" />
    </v-card>
  </div>
</template>

<script>
import SmsHitoryFilter from '@/modules/post/SmsHitoryFilter.vue'
import SmsHistoryDatatable from '@/modules/post/SmsHistoryDatatable.vue'

export default {
  components: {
    SmsHitoryFilter,
    SmsHistoryDatatable
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
