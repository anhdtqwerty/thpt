<template>
  <div class="text-center">
    <v-dialog fullscreen v-model="dialog">
      <v-card>
        <v-toolbar dense class="elevation-0" color="#0D47A1" dark>
          <v-toolbar-title>LỌC TÌM KIẾM</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon @click="cancel">close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-divider />

        <!-- form -->
        <v-form class="pa-4" ref="form">
          <autocomplete-teacher
            v-model="name"
            item-text=""
            item-value=""
            label="Họ tên"
            class="ma-2"
            filled
            clearable
            single-line
            dense
          ></autocomplete-teacher>
        </v-form>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn outlined color="#0D47A1" @click="onFilterChanged">
            <v-icon left dark>mdi-filter-outline</v-icon>Lọc
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import moment from 'moment'
import AutocompleteTeacher from '@/components/basic/input/AutocompleteTeacher'

export default {
  components: {
    AutocompleteTeacher,
  },
  data() {
    return {
      query: '',
      loading: 0,
      name: '',
      dialog: false,
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
