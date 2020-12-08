<template>
  <v-dialog
    v-model="dialog"
    width="600px"
    :fullscreen="$vuetify.breakpoint.smAndDown"
  >
    <v-card>
      <v-card-title color="#0D47A1" class="white--text"
        >{{ classData.title }}
        <v-spacer />
        <v-icon color="white" @click="cancel">close</v-icon>
      </v-card-title>
      <v-divider></v-divider>
      <class-info-form
        v-if="classData.id"
        :classData="classData"
        ref="form"
        @save="save"
      ></class-info-form>
      <v-row class="pr-6 pb-6 mt-n7" no-gutters>
        <v-spacer></v-spacer>
        <v-btn
          class="px-6"
          depressed
          color="primary"
          :loading="loading"
          @click="save"
          >Lưu</v-btn
        >
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
import ClassInfoForm from '@/components/basic/form/ClassInfoForm'
import { mapActions, mapState } from 'vuex'

export default {
  components: {
    ClassInfoForm
  },
  props: {
    state: Boolean,
    classData: Object,
    slots: Array
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
    ...mapActions('class', ['updateClass']),
    async save() {
      this.loading = true
      const data = this.$refs.form.getData()
      await this.updateClass({ id: this.classData.id, ...data })
      this.loading = false
      this.dialog = false
      this.$alert.success('Cập nhật thành công!')
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
