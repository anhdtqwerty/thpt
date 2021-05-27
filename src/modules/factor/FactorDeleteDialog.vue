<template>
  <v-dialog v-model="dialog" width="500px" :fullscreen="$vuetify.breakpoint.smAndDown">
    <v-card>
      <v-card-title color="red">Xoá đầu điểm này </v-card-title>
      <v-card-text>
        Đầu điểm này sẽ bị xoá khỏi cấu hình điểm của môn và các thông tin về điểm của môn học này sẽ bị thay đổi
      </v-card-text>
      <v-card-actions class="d-flex justify-space-between pa-6">
        <v-btn depressed class="red white--text" :loading="loading" @click="onDelete(item)">Xoá</v-btn>
        <v-btn depressed :loading="loading" @click="cancel()">Huỷ</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapActions, mapState } from 'vuex'

export default {
  components: {},
  props: {
    state: Boolean,
    item: Object
  },
  data() {
    return {
      dialog: false,
      loading: false
    }
  },
  computed: {
    ...mapState('subjects', ['subject'])
  },
  methods: {
    ...mapActions('factor', ['removeFactor']),
    async onDelete(item) {
      try {
        this.loading = true
        const semester2Id = this.subject.factors.find(f => f.type === item.type && f.semesterType === 'semester-2').id
        await this.removeFactor({ semester1Id: item.id, semester2Id })
      } catch (error) {
        this.$alert.addError()
      } finally {
        this.loading = false
      }
    },
    cancel() {
      this.dialog = false
    }
  },
  watch: {
    state(state) {
      this.dialog = state
    }
  }
}
</script>
