<template>
  <div class="text-center">
    <v-dialog fullscreen v-model="dialog">
      <v-card>
        <!-- toolbar -->
        <v-toolbar
          color="rgba(255, 179, 0, 1)"
          dense
          class="elevation-0 white--text"
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
          <autocomplete-staff
            v-model="name"
            item-text=""
            item-value=""
            label="Họ tên"
            class="ma-2"
            outlined
            clearable
            single-line
            dense
          ></autocomplete-staff>
          <v-autocomplete
            v-model="status"
            :items="statusList"
            chips
            small-chips
            clear-icon="mdi-close"
            clearable
            deletable-chips
            label="Trạng Thái"
            outlined
            single-line
            dense
            multiple
            class="ma-2"
          ></v-autocomplete>
        </v-form>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="mr-2"
            medium
            depressed
            color="amber dark-1 white--text"
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
import AutocompleteStaff from '@/components/basic/input/AutocompleteStaff'

export default {
  components: {
    AutocompleteStaff
  },
  data() {
    return {
      query: '',
      loading: 0,
      name: '',
      status: '',
      dialog: false,
      statusList: ['active', 'block']
    }
  },
  props: {
    state: Boolean
  },
  computed: {
    isLoading() {
      return this.loading > 0
    }
  },
  methods: {
    cancel() {
      this.dialog = false
      this.reset()
      this.$refs.form.reset()
    },
    reset() {
      this.name = ''
      this.status = ''
    },
    ...mapActions('staff', ['updateStudent']),
    onFilterChanged() {
      this.$emit('onFilterChanged', {
        name: this.name,
        status: this.status
      })
      this.dialog = false
      this.reset()
      this.$refs.form.reset()
    }
  },
  watch: {
    state(state) {
      this.dialog = true
    }
  }
}
</script>

<style></style>
