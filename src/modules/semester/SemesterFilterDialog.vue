<template>
  <div class="text-center">
    <v-dialog fullscreen v-model="dialog">
      <v-card>
        <!-- toolbar -->
        <v-toolbar
          color="#0D47A1"
          dense
          dark
          class="elevation-0"
        >
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
            filled
            dense
            clearable
          ></autocomplete-generation>
          <autocomplete-semester
            v-model="semester"
            placeholder="Học kỳ"
            filled
            dense
            clearable
          ></autocomplete-semester>
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
import AutocompleteSemester from '@/components/basic/input/AutocompleteSemester'

export default {
  components: {
    AutocompleteGeneration,
    AutocompleteSemester
  },
  data() {
    return {
      query: '',
      loading: 0,
      name: '',
      dialog: false,
      semester: '',
      generation: ''
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
      this.name = ''
    },
    ...mapActions('staff', ['updateStudent']),
    onFilterChanged() {
      this.$emit('onFilterChanged', {
        id: this.name,
      })
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

<style>
</style>
