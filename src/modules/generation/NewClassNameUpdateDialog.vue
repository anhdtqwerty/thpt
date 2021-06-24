<template>
  <v-dialog :fullscreen="$vuetify.breakpoint.smAndDown" v-model="dialog" width="500" scrollable>
    <v-card>
      <v-card-title class="primary white--text text-uppercase">
        Sửa tên lớp mới
        <v-spacer></v-spacer>
        <v-btn dark icon>
          <v-icon @click="cancel">close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider />
      <v-card-text>
        <v-form ref="form" class="pt-4">
          <p>Lớp hiện tại: {{ item.currentClass && item.currentClass.title }}</p>

          <v-text-field
            v-model="className"
            label="Tên lớp"
            placeholder="Nhập tên lớp"
            outlined
            required
            dense
            class="required"
            :rules="[$rules.required]"
          >
            <span slot="prepend-inner" class="mt-1">{{ item.newClass && item.newClass.newGradeNumber }}</span>
          </v-text-field>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn class="px-4" outlined light depressed @click="cancel">Hủy</v-btn>
        <v-spacer></v-spacer>
        <v-btn class="ma-2" dark depressed color="#0D47A1" @click="save">Lưu</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  components: {},
  data() {
    return {
      dialog: false,
      currentClass: null,
      newName: '',
      className: ''
    }
  },
  props: {
    state: Boolean,
    item: Object
  },
  computed: {},
  created() {},
  methods: {
    ...mapActions('Generation', ['updateClass']),
    async save() {
      if (!this.$refs.form.validate()) return
      try {
        this.$loading.active = true
        await this.updateClass({
          id: this.item.currentClass.id,
          newClass: { ...this.item.newClass, newClassTitle: this.item.newClass.newGradeNumber + this.className.trim() }
        })
        this.$alert.updateSuccess()
        this.reset()
      } catch (error) {
        this.$alert.updateError()
      } finally {
        this.$loading.active = false
      }

      this.dialog = false
    },
    reset() {
      this.$refs.form.reset()
    },
    cancel() {
      this.dialog = false
      this.reset()
    }
  },
  watch: {
    state(state) {
      this.dialog = true
    },
    item(value) {
      this.className = value.newClass.newClassTitle.replace(value.newClass.newGradeNumber, '')
    }
  }
}
</script>
