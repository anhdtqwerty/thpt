<template>
  <v-dialog
    :fullscreen="$vuetify.breakpoint.mobile"
    width="661"
    v-model="dialog"
  >
    <v-card>
      <v-toolbar color="#0D47A1" dark dense class="elevation-0 px-2 mb-6">
        <v-toolbar-title>THÊM HỌC KỲ MỚI</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon @click="cancel" dark>close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-form class="pa-4" ref="form">
        <v-text-field
          v-model="semester"
          placeholder="Tên học kỳ"
          outlined
          clearable
          dense
          :rules="[rules.required]"
        ></v-text-field>
        <autocomplete-generation
          v-model="generation"
          placeholder="Năm học"
          dense
          outlined
          clearable
          :rules="[rules.required]"
        ></autocomplete-generation>
        <date-iso-picker
          :rules="[rules.required]"
          outlined
          placeholder="Ngày bắt đầu"
          v-model="startDate"
        ></date-iso-picker>
        <date-iso-picker
          :rules="[rules.required]"
          outlined
          placeholder="Ngày kết thúc"
          v-model="endDate"
        ></date-iso-picker>
        <v-textarea v-model="notes" outlined placeholder="Ghi chú"></v-textarea>
      </v-form>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          class="mr-2"
          :loading="isLoading"
          depressed
          color="#0D47A1"
          medium
          dark
          :disabled="isLoading"
        >
          <span>Lưu</span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
// import { mapActions, mapState, mapGetters } from 'vuex'
import AutocompleteGeneration from '@/components/basic/input/AutocompleteGeneration.vue'
import DateIsoPicker from '@/components/basic/picker/DateIOSPicker'

export default {
  components: { AutocompleteGeneration, DateIsoPicker },
  data() {
    return {
      dialog: false,
      loading: 0,
      show: false,
      rules: {
        required: (value) => !!value || 'Required.',
      },
      generation: '',
      semester: '',
      startDate: '',
      endDate: '',
      notes: '',
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
    },
    reset() {
      this.semester = ''
      this.generation = ''
      this.startDate = ''
      this.endDate = ''
      this.notes = ''
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
