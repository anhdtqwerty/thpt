<template>
  <div class="text-center">
    <v-dialog fullscreen v-model="dialog">
      <v-card>
        <!-- toolbar -->
        <v-toolbar color="#0D47A1" dense dark class="elevation-0">
          <v-toolbar-title>LỌC TÌM KIẾM</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon @click="cancel" class="white--text">close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-divider />

        <!-- form -->
        <v-form class="pa-4" ref="form">
          <autocomplete-generation
            v-model="generation"
            placeholder="Năm học"
            outlined
            dense
            clearable
          ></autocomplete-generation>
        </v-form>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="mr-2"
            medium
            depressed
            color="#0D47A1"
            dark
            @click.prevent="onFilterChanged"
            :disabled="isLoading"
          >
            <v-icon left>filter_alt</v-icon>
            <span>Lọc</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import AutocompleteGeneration from '@/components/basic/input/AutocompleteGeneration'

export default {
  components: {
    AutocompleteGeneration,
  },
  data() {
    return {
      query: '',
      loading: 0,
      name: '',
      dialog: false,
      generation: '',
    }
  },
  props: {
    state: Boolean,
  },
  computed: {
    isLoading() {
      return this.loading > 0
    },
  },
  methods: {
    cancel() {
      this.dialog = false
      this.reset()
      this.$refs.form.reset()
    },
    reset() {
      this.generation = ''
    },
    ...mapActions('staff', ['updateStudent']),
    onFilterChanged() {
      this.$emit('onFilterChanged', { generation: this.generation })
      this.dialog = false
      this.reset()
      this.$refs.form.reset()
    },
  },
  watch: {
    state(state) {
      this.dialog = true
    },
  },
}
</script>
