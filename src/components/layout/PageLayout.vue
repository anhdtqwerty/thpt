<template>
  <div class="page-layoutW">
      <div class="page__header">
        <div class="page__header--left">
          <div class="py-2">
          <h2>{{ pageTitle }}</h2>
          <breadcrumbs />
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
import Breadcrumbs from '@/components/basic/Breadcrumbs'
export default {
  components: {
    Breadcrumbs
  },
  props: {
    pageTitle: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scope>
  .page__header {
    display: flex;
    justify-content: space-between;
  }
</style>
