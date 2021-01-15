<template>
  <div class="page-layoutW">
    <div class="page__header">
      <div class="page__header--left">
        <div class="pa-4 d-flex justify-space-between align-center">
          <div>
            <Breadcrumbs
              headline="Dashboard"
              :link="[{ text: 'Dashboard', href: '../dashboard' }]"
            />
          </div>
        </div>
      </div>
      <div class="page__header--right">
        <div class="page__action">
          <slot name="action" />
        </div>
      </div>
    </div>
    <slot />
  </div>
</template>

<script>
import Breadcrumbs from '@/components/layout/Breadcrumbs.vue'
export default {
  components: {
    Breadcrumbs,
  },
  props: {
    pageTitle: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scope>
.page__header {
  display: flex;
  justify-content: space-between;
}
</style>
