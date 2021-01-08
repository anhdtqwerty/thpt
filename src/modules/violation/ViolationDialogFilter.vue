<template>
  <v-dialog
    v-if="$vuetify.breakpoint.smAndDown"
    v-model="dialog"
    persistent
    max-width="600px"
    fullscreen
  >
    <template v-slot:activator="{ on }">
      <v-icon depressed v-on="on">filter_alt</v-icon>
    </template>
    <v-card>
      <v-toolbar
              color="primary"
              dark
            >
        <v-toolbar-title class="ml-3">Lọc Tìm Kiếm</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn dark icon>
          <v-icon @click="cancel">close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <violation-filter ref="form" @onFilterChanged="onFilterChanged" />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import ViolationFilter from '@/modules/violation/ViolationFilter.vue'

export default {
  components: { ViolationFilter },
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
