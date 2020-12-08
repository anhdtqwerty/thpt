<template>
  <div>
    <p class="text-h5 font-weight-bold pa-0 ma-0">{{ head }}</p>
    <v-breadcrumbs class="pa-0 ma-0" :items="items"
      ><template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
  </div>
</template>
<script>
export default {
  props: {
    head: String,
  },
  computed: {
    items() {
      return this.$route.matched.map((item) => {
        const title = item.meta && item.meta.title ? item.meta.title : ''
        const path = item.path ? item.path : '/'
        return {
          text: title,
          disabled: false,
          href: path,
        }
      })
    },
  },
}
</script>
<style>
</style>
