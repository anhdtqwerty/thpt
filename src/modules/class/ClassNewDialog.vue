<template>
  <v-dialog
    v-model="dialog"
    width="600px"
    :fullscreen="$vuetify.breakpoint.smAndDown"
  >
    <v-card>
      <v-card-title color="#0D47A1" class="white--text"
        >Thêm lớp học
        <v-spacer />
        <v-icon color="white" @click="cancel">close</v-icon>
      </v-card-title>
      <v-divider></v-divider>
      <class-new-form
        ref="form"
        :classData="{}"
        :major="major"
        :course="course"
      />
      <v-card-actions>
        <v-spacer />
        <v-btn
          depressed
          color="success"
          class="mr-4 mt-n4 mb-2 white--text"
          @click="save"
          ><v-icon color="white" left> mdi-plus </v-icon>Thêm</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import ClassNewForm from '@/components/basic/form/ClassNewForm.vue'
import { mapActions, mapState } from 'vuex'

export default {
  components: {
    ClassNewForm
  },
  props: {
    state: Boolean,
    major: Object,
    course: Object
  },
  data() {
    return {
      dialog: false
    }
  },
  computed: {
    ...mapState('app', ['roles', 'department']),
    ...mapState('auth', ['user'])
  },
  methods: {
    ...mapActions('class', ['createClass']),
    async save() {
      const data = this.$refs.form.getData()
      await this.createClass({
        ...data,
        department: this.department.id,
        status: 'opened'
      })
      this.dialog = false
    },
    cancel() {
      this.$refs.form.reset()
      this.dialog = false
    }
  },

  watch: {
    state(state) {
      this.dialog = true
    }
  }
}
</script>
