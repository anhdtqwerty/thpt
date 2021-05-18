<template>
  <v-form ref="form" flat class="pa-6">
    <p class="caption">Đầu điểm cho môn: {{ subject.title }}</p>
    <v-text-field
      label="Tên đầu điểm *"
      v-model="title"
      dense
      outlined
      required
    ></v-text-field>
    <div class="d-flex">
      <v-text-field
        class="mr-4"
        label="Hệ số"
        v-model="multiply"
        dense
        type="quantity"
        outlined
        required
      ></v-text-field>
      <v-text-field
        label="Số lượng"
        v-model="quantity"
        dense
        type="number"
        outlined
        required
      ></v-text-field>
    </div>
    <v-select
      label="Học Kỳ"
      v-model="semesterType"
      :items="[
        { id: 'semester-1', title: 'Học kỳ 1' },
        { id: 'semester-2', title: 'Học kỳ 2' }
      ]"
      item-text="title"
      item-value="id"
      dense
      type="number"
      outlined
      required
    />
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
  data() {
    return {
      title: '',
      description: '',
      multiply: 1,
      quantity: 3,
      semesterType: 'semester-1',
      type: ''
    }
  },
  computed: {
    ...mapGetters('app', ['department'])
  },
  props: {
    factor: { type: Object, default: () => {} },
    subject: { type: Object, default: () => {} },
    editCode: { type: Boolean, default: false }
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
          type: this.type,
          description: this.description,
          semesterType: this.semesterType,
          multiply: this.multiply,
          quantity: this.quantity
        }
      }
    },
    resetDefault() {
      if (this.factor && this.factor.id) {
        this.title = this.factor.title
        this.type = this.factor.type
        this.multiply = this.factor.multiply
        this.semesterType = 'semester-1'
        this.description = this.factor.description
        this.quantity = this.factor.quantity
      }
    }
  },
  created() {
    this.resetDefault()
  },
  watch: {
    factor() {
      this.resetDefault()
    }
  }
}
</script>
