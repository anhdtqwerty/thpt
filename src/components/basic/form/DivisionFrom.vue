<template>
  <v-form ref="form" flat class="pa-6">
    <p class="h6 font-weight-bold">Năm học ....(từ ngày....)</p>
    <v-text-field
      label="Tên ban mới"
      v-model="name"
      dense
      outlined
      required
    ></v-text-field>
    <v-autocomplete
      v-model="values"
      :items="items_grades"
      outlined
      dense
      label="Chọn khối"
    >
    </v-autocomplete>
    <v-autocomplete
      v-model="values"
      :items="items"
      outlined
      dense
      label="Môn học"
    >
    </v-autocomplete>
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
import TextFieldCode from '@/components/basic/input/TextFieldCode'
import { mapGetters } from 'vuex'
export default {
  components: {
    TextFieldCode,
  },
  data: () => ({
    valid: true,
    code: '',
    description: '',
    name: '',
  }),
  computed: {
    ...mapGetters('app', ['department']),
  },
  props: {},
  methods: {
    reset() {
      this.$refs.form.reset()
    },
  },
  created() {
    this.resetDefault()
  },
  watch: {},
}
</script>

<style scoped></style>
