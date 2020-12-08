<template>
  <div>
    <h1 class="font-weight-bold">{{ headline }}</h1>
    <v-breadcrumbs :items="links" style="pa-0 ma-0"></v-breadcrumbs>
    <h1 class="text-subtitle-1">{{ caption }}</h1>
  </div>
</template>

<script>
export default {
  props: {
    headline: String,
    caption: String,
    link: Array
  },
  data: () => ({
    items: [
      {
        text: 'Trang chủ',
        disabled: false,
        href: 'bill'
      }
    ]
  }),
  computed: {
    items () {
      return this.$route.matched.map((item) => {
        const title = item.meta && item.meta.title ? item.meta.title : ''
        const path = item.path ? item.path : '/'
        return {
          text: title,
          disabled: false,
          href: path
        }
      })
    }
  }
}
</script>
<style scoped>
.v-breadcrumbs {
  padding: 0;
  margin: 0;
}
</style>
