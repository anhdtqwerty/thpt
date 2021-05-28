<template>
  <div>
    <div class="pa-4 d-flex justify-space-between align-center">
      <div>
        <Breadcrumbs headline="Lịch sử gửi tin nhắn" :link="[{ text: 'Lịch sử gửi tin', href: '../post-history' }]" />
      </div>
    </div>
    <v-card class="px-md-6 mx-md-4 elevation-1">
      <v-tabs v-model="tab">
        <v-tab :key="1">APP</v-tab>
        <v-tab :key="2">SMS</v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item :key="1">
          <AppHistory />
        </v-tab-item>
        <v-tab-item :key="2">
          <SmsHistory />
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script>
import Breadcrumbs from '@/components/layout/Breadcrumbs.vue'
import AppHistory from '@/modules/post/AppHistory.vue'
import SmsHistory from '@/modules/post/SmsHistory.vue'

export default {
  components: {
    Breadcrumbs,
    AppHistory,
    SmsHistory
  },
  data() {
    return {
      tab: 0
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped></style>
