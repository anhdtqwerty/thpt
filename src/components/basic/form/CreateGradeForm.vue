<template>
  <v-form ref="form" flat class="pa-6">
    <v-text-field
      label="Tên khối mới"
      v-model="title"
      dense
      outlined
      required
      :rules="ruleRequired"
    ></v-text-field>
    <v-textarea
      ref="description"
      v-model="description"
      label="Ghi chú"
      outlined
      dense
    ></v-textarea>
  </v-form>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  components: {},
  data: () => ({
    valid: true,
    description: '',
    ruleRequired: [v => !!v || 'Tên Khôi không được để trống'],
    title: ''
  }),
  computed: {
    ...mapGetters('app', ['department'])
  },
  props: {
    grade: { type: Object, default: () => {} },
    editCode: { type: Boolean, default: false }
  },
  methods: {
    reset() {
      this.$refs.form.reset()
    },
    validate() {
      return this.$refs.form.validate()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
    getData() {
      return {
        title: this.title,
        description: this.description
      }
    },
    refresh() {
      if (this.division) {
        this.description = this.division.description
        this.title = this.division.title
      }
    }
  },
  created() {
    this.reset()
  }
}
</script>
