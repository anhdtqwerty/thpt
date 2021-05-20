<template>
  <div class="pa-4 d-flex justify-space-between align-center">
    <div>
      <Breadcrumbs headline="Lịch sử gửi tin nhắn" :link="[{ text: 'Lịch sử gửi tin', href: '../post-history' }]" />
    </div>
  </div>
</template>

<script>
import Breadcrumbs from '@/components/layout/Breadcrumbs.vue'

export default {
  components: {
    Breadcrumbs
  },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss" scoped></style>
