<template>
  <v-dialog
    v-if="$vuetify.breakpoint.smAndDown"
    v-model="dialog"
    persistent
    max-width="600px"
    fullscreen
  >
    <template v-slot:activator="{ on }">
      <v-icon depressed v-on="on">mdi-filter-outline</v-icon>
    </template>
    <v-card>
      <v-toolbar dense class="elevation-0 #0D47A1 white--text py-auto">
        <v-toolbar-title class="ml-3">Lọc Tìm Kiếm</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn dark icon>
          <v-icon @click="cancel">close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <class-filter ref="form" @onFilterChanged="onFilterChanged" />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import ClassFilter from '@/modules/class/ClassFilter.vue'

export default {
  components: { ClassFilter },
  props: {},
  data: () => ({
    dialog: false
  }),
  methods: {
    cancel() {
      this.dialog = false
      this.$refs.form.reset()
    },
    onFilterChanged(data) {
      this.dialog = data.dialog
      const { dialog, ...query } = data
      this.$emit('onFilterChanged', query)
    }
  }
}
</script>
<style scoped></style>
