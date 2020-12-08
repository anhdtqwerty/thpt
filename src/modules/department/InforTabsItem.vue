<template>
  <v-card flat>
    <v-card-title class="card__title--custom">
      <span class="card-title">Thông Tin Cơ Bản</span>
      <div v-if="!$vuetify.breakpoint.mobile" class="card__action">
        <v-btn class="button--long" color="primary" text @click="cancel"
          >Huỷ</v-btn
        >
        <v-btn class="button--long" color="primary" @click="save">Lưu</v-btn>
      </div>
    </v-card-title>
    <v-card-text>
      <v-text-field
        outlined
        label="Chi Nhánh"
        v-model="title"
        placeholder="Nhập tên chi nhánh "
      ></v-text-field>
      <v-textarea
        outlined
        label="Mô tả"
        v-model="description"
        placeholder="Nhập mô tả chi nhánh"
      ></v-textarea>
      <v-text-field
        outlined
        label="Hình Ảnh"
        v-model="title"
        placeholder="Nhập link hình ảnh của chi nhánh "
      ></v-text-field>
    </v-card-text>
    <v-card-actions v-if="$vuetify.breakpoint.mobile">
      <v-spacer></v-spacer>
      <v-btn class="button--long" color="primary" text @click="cancel">
        Huỷ
      </v-btn>
      <v-btn class="button--long" color="primary" @click="save"> Lưu </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    department: { type: [Object], required: true, default: () => {} },
  },
  data() {
    return {
      title: '',
      description: '',
      metadata: {},
    }
  },
  methods: {
    save() {
      this.$emit('save', {
        title: this.title,
        description: this.description,
        metadata: this.metadata,
      })
    },
    cancel() {
      this.title = this.department.title
      this.description = this.department.description
      this.metadata = this.department.metadata
      this.$emit('cancel')
    },
    reset() {
      this.title = this.department.title
      this.description = this.department.description
      this.metadata = this.department.metadata
    },
  },
  created: function () {
    this.title = this.department.title
    this.description = this.department.description
    this.metadata = this.department.metadata
  },
  watch: {
    department(department) {
      this.title = department.title
      this.description = department.description
      this.metadata = department.metadata
    },
  },
}
</script>

<style lang="scss" scoped>
.card__title--custom {
  display: flex;
  justify-content: space-between;
}
.button--long {
  min-width: 96px !important;
  margin-right: 20px;
}
</style>
