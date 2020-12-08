<template>
  <v-dialog v-model="dialog" max-width="600px">
    <template v-slot:activator="{ on }">
       <slot name="activator" :on="on" />
    </template>
    <v-card>
      <v-toolbar dark color="primary" dense class="elevation-0 darken-1 white--text py-auto">
        <v-toolbar-title class="ml-3">Thêm mới lớp học</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn dark icon>
          <v-icon @click="cancel">close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text class="py-5">
        <class-form ref="form" />
        <div class="text-right">
          <v-btn @click="create" color="primary">
            <v-icon>mdi-plus</v-icon>
            <span>Thêm</span>
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import ClassForm from '@/components/basic/form/highSchool/ClassInfoForm'
import { mapActions } from 'vuex'
export default {
  props: {},
  components: {
    ClassForm
  },
  data: () => ({
    dialog: false
  }),
  methods: {
    ...mapActions('class', ['createClass']),
    async create () {
      this.$refs.form.validate()
      if (!this.$refs.form.valid) return
      const data = this.$refs.form.getFormData()
      await this.createClass({
        ...data
      })
      this.dialog = false
    },
    cancel () {
      this.$refs.form.reset()
      this.dialog = false
    }
  }
}
</script>
<style scoped>
</style>
