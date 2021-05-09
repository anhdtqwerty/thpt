<template>
  <v-form ref="form" flat class="pt-5">
    <v-text-field
      label="Tên khối mới"
      v-model="title"
      dense
      outlined
      class="required"
      :rules="[$rules.required]"
    ></v-text-field>
    <v-textarea ref="description" v-model="description" label="Ghi chú" outlined dense></v-textarea>
  </v-form>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  components: {},
  data: () => ({
    valid: true,
    description: '',
    ruleRequired: [v => !!v || 'Tên Khối không được để trống'],
    title: ''
  }),
  computed: {
    ...mapGetters('app', ['department'])
  },
  props: {},
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
    }
  }
}
</script>
