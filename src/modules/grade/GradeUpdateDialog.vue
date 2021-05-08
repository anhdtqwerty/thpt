<template>
  <v-dialog v-model="dialog" width="600px" :fullscreen="$vuetify.breakpoint.smAndDown" scrollable>
    <v-card>
      <v-card-title class="blue darken-4 white--text text-uppercase"
        >Sửa {{ grade.title }}
        <v-spacer />
        <v-icon color="white" @click="cancel">close</v-icon>
      </v-card-title>
      <v-card-text>
        <v-divider></v-divider>
        <GradeForm :grade="grade" ref="form" />
      </v-card-text>
      <v-card-actions>
        <v-row class="pa-2" no-gutters>
          <v-spacer></v-spacer>
          <v-btn class="px-6 mx-4 blue--text" color="#E3F2FD" dark depressed @click="cancel">Hủy</v-btn>
          <v-btn class="px-6" dark depressed color="#0D47A1" :loading="loading" @click="save">Lưu</v-btn>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import GradeForm from '@/components/basic/form/GradeForm.vue'
import { mapActions, mapState } from 'vuex'

export default {
  components: {
    GradeForm
  },
  props: {
    state: Boolean,
    grade: { type: Object, default: () => {} }
  },
  data() {
    return {
      dialog: false,
      loading: false
    }
  },
  computed: {
    ...mapState('app', ['roles', 'department']),
    ...mapState('auth', ['user'])
  },

  methods: {
    ...mapActions('grade', ['updateGrade']),
    async save() {
      if (!this.$refs.form.validate()) return
      try {
        this.loading = true
        const data = this.$refs.form.getData()
        await this.updateGrade({ id: this.grade.id, ...data })
        this.$alert.updateSuccess()
        this.dialog = false
      } catch (error) {
        this.$alert.updateError()
      } finally {
        this.loading = false
      }
    },
    cancel() {
      this.dialog = false
      this.$refs.form.resetDefault()
    }
  },
  watch: {
    state(state) {
      this.dialog = true
    }
  }
}
</script>
