<template>
  <v-form ref="form" flat class="pa-6">
    <div class="mb-4">Thêm phòng học:</div>
    <v-text-field
      v-model="title"
      label="Phòng Học"
      required
      outlined
      dense
    ></v-text-field>
    <v-textarea
      ref="notes"
      v-model="notes"
      label="Mô Tả"
      outlined
      dense
    ></v-textarea>
  </v-form>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    room: { type: Object, default: () => {} }
  },
  data: () => ({
    valid: true,
    notes: '',
    title: ''
  }),
  computed: {
    ...mapGetters('app', ['department'])
  },
  methods: {
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
    getData() {
      if (this.$refs.form.validate()) {
        return {
          title: this.title,
          notes: this.notes,
          department: this.department.id
        }
      }
    },
    resetDefault() {
      if (this.room) {
        this.title = this.room.title
        this.notes = this.room.notes
      } else {
        this.title = ''
        this.notes = ''
      }
    }
  },
  created() {
    this.resetDefault()
  },
  watch: {
    room(room) {
      this.resetDefault()
    }
  }
}
</script>

<style scoped></style>
