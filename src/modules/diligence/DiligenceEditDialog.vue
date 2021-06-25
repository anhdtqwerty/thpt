<template>
  <v-dialog :fullscreen="$vuetify.breakpoint.smAndDown" v-model="dialog" width="581" scrollable>
    <v-card>
      <v-card-title class="primary white--text text-uppercase">
        Sửa ngày nghỉ
        <v-spacer></v-spacer>
        <v-btn dark icon>
          <v-icon @click="cancel">close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider />
      <v-card-text>
        <v-form ref="form" class="py-4">
          <v-row>
            <v-col class="d-flex align-center py-0" cols="12">
              <v-subheader class="py-0 px-0">Ngày nghỉ</v-subheader>
              <div class="mb-0">111</div>
            </v-col>
            <v-col class="d-flex align-center py-0" cols="12">
              <v-subheader class="px-0">Hình thức nghỉ</v-subheader>
              <div class="mb-0">
                <RadioAbsentType />
              </div>
            </v-col>
          </v-row>
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
import { mapActions, mapState, mapGetters } from 'vuex'
import RadioAbsentType from '@/modules/diligence/RadioAbsentType.vue'

export default {
  components: { RadioAbsentType },
  data() {
    return {
      dialog: false,
      currentClass: null
    }
  },
  props: {
    state: Boolean,
    item: Object
  },
  computed: {
    ...mapState('app', ['roles', 'department', 'currentGeneration']),
    ...mapGetters('app', ['roleIdByName', 'roles'])
  },
  methods: {
    ...mapActions('students', ['updateStudent']),
    async save() {
      if (!this.$refs.form.validate()) return
      try {
        this.$loading.active = true
        this.reset()
      } catch (error) {
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
    }
  }
}
</script>

<style scoped>
.v-subheader {
  width: 30%;
}
</style>
