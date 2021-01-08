<template>
  <div>
    <p class="font-weight-bold text-h5 ma-0"><v-icon class="pa-0 ma-0" >mdi-arrow-left</v-icon>{{ headline }}</p>
    <v-breadcrumbs :items="links" icon=""><template v-slot:divider>
       <v-icon class="pa-0 ma-0">mdi-chevron-right</v-icon>
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
        href: '/dashboard'
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
.v-breadcrumbs__divider{
    padding: 0;
} 
</style>
