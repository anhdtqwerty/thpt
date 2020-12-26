<template>
  <div>
    <p class="font-weight-bold text-h5 ma-0">{{ headline }}</p>
    <v-breadcrumbs :items="links" style="pa-0 ma-0" icon=""><template v-slot:divider>
       <v-icon>mdi-chevron-right</v-icon>
      </template></v-breadcrumbs>
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
        href: ''
      }
    ]
  }),
  computed: {
    links () {
      return [...this.items, ...this.link]
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
