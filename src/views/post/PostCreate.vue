<template>
  <div>
    <div class="pa-4 d-flex justify-space-between align-center">
      <div>
        <Breadcrumbs
          headline="Gửi tin nhắn"
          :link="[{ text: 'Gửi tin nhắn', href: '../post-send' }]"
        />
      </div>
    </div>
    <v-card class="px-md-6 mx-md-4 elevation-1">
      <v-tabs v-model="tab">
        <v-tab :key="1">Toàn trường</v-tab>
        <v-tab :key="2">Khối</v-tab>
        <v-tab :key="3">Lớp</v-tab>
        <v-tab :key="4">Học sinh</v-tab>
        <v-tab :key="5">Khác</v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item :key="1">
          <AllSchoolPostCreate />
        </v-tab-item>
        <!-- <v-tab-item :key="2" value="tab-2">
          <slot-info-form v-if="slotId" :slotData="slotData" @cancel="cancel" @save="save" />
        </v-tab-item> -->
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script>
export default {
  components: {
    Breadcrumbs: () => import('@/components/layout/Breadcrumbs.vue'),
    AllSchoolPostCreate: () => import('@/modules/post/AllSchoolPostCreate.vue'),
  },
  data() {
    return {
      tab: null,
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
