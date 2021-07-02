<template>
  <v-dialog :fullscreen="$vuetify.breakpoint.mobile" width="661" v-model="dialog">
    <v-card>
      <v-card-title>
        <v-toolbar color="#0D47A1" dark dense class="elevation-0 mb-6">
          <v-toolbar-title>THÊM HỌC KỲ MỚI</v-toolbar-title>
          <v-btn icon>
            <v-icon @click="cancel" dark>close</v-icon>
          </v-btn>
        </v-toolbar>
      </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-text-field
            v-model="title"
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
            :date.sync="startDate"
            outlined
            placeholder="Ngày bắt đầu"
          ></date-iso-picker>
          <date-iso-picker
            :rules="[rules.required]"
            :date.sync="endDate"
            outlined
            placeholder="Ngày kết thúc"
          ></date-iso-picker>
          <v-textarea v-model="notes" outlined placeholder="Ghi chú"></v-textarea>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :loading="isLoading" depressed color="#0D47A1" medium dark :disabled="isLoading" @click="save">
          <span>Lưu</span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'
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
        required: value => !!value || 'Required.'
      },
      generation: '',
      semester: '',
      startDate: '',
      endDate: '',
      notes: '',
      title: ''
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
    ...mapActions('semester', ['createSemester']),
    async save() {
      this.loading = true
      const data = {
        title: this.title,
        generation: this.generation,
        config: {
          startDate: this.startDate,
          endDate: this.endDate,
          notes: this.notes
        }
      }
      await this.createSemester({ ...data })
      this.$alert.success('Tạo học kỳ mới thành công')
      this.loading = false
      this.dialog = false
    },
    cancel() {
      this.dialog = false
      this.reset()
    },
    reset() {
      this.title = ''
      this.generation = ''
      this.startDate = ''
      this.endDate = ''
      this.notes = ''
    }
  },
  watch: {
    state(state) {
      this.dialog = true
    }
  }
}
</script>
