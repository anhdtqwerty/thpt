<template>
  <v-dialog v-model="dialog" width="620px" :fullscreen="$vuetify.breakpoint.smAndDown">
    <v-card>
      <v-card-title class="blue darken-4 white--text text-uppercase"
        >Thêm phân công giảng dạy
        <v-spacer />
        <v-icon color="white" @click="cancel">close</v-icon>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="pt-5">
        <TeachingNewForm ref="form" :state="dialog" />
        <v-spacer style="height:100px" />
      </v-card-text>
      <v-divider />
      <v-card-actions class="d-flex justify-space-between pa-6">
        <v-btn outlined class="grey--text" @click="cancel">HUỶ</v-btn>
        <v-btn color="primary" @click="save">LƯU</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import TeachingNewForm from '@/components/basic/form/TeachingNewForm'
import { mapActions } from 'vuex'
import { get } from 'lodash'

export default {
  components: {
    TeachingNewForm
  },
  props: {
    state: Boolean,
    teacher: Object
  },
  data() {
    return {
      dialog: false,
      loading: false,
      subject: '',
      classData: '',
      grade: null,
      id: ''
    }
  },
  computed: {},

  methods: {
    ...mapActions('teaching', ['createTeaching']),
    async save() {
      try {
        const data = this.$refs.form.getData()
        if (!data) return
        this.$loading.active = true
        await this.createTeaching(data)
        this.$alert.success('Cập nhật thành công')
        this.dialog = false
        this.$emit('done')
      } catch (error) {
        this.$alert.updateError()
      } finally {
        this.$loading.active = false
      }
    },
    cancel() {
      this.dialog = false
    },
    onFilterChanged() {
      this.$emit('onFilterChanged', {
        id: this.id,
        grade: this.grade,
        classData: this.classData,
        subject: this.subject.id
      })
    },
    gradeChanged(grade) {
      if (get(this.grade, 'academicLevel') !== get(grade, 'academicLevel')) {
        this.classData = null
      }
      this.grade = grade
    }
  },
  watch: {
    state(state) {
      this.dialog = true
    }
  }
}
</script>
