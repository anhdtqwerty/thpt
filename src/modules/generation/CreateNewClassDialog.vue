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
      <v-form ref="form" flat class="px-6 pt-6">
        <v-row>
          <v-col cols="12" md="6">
            <AutocompleteGrade
              return-object
              class="required mr-2"
              item-text="title"
              item-value="id"
              label="Khối"
              required
              dense
              outlined
              auto-select-first
              :rules="[$rules.required]"
              :filters="{ gradeNumber_in: [6, 10] }"
              @change="gradeChanged"
            />
          </v-col>
          <v-col cols="12" md="6">
            <AutocompleteDivision
              class="required mr-2"
              v-model="division"
              item-text="title"
              item-value="id"
              label="Ban"
              required
              dense
              outlined
              auto-select-first
              :rules="[$rules.required]"
              :filter="divisionFilter"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              ref="title"
              v-model="title"
              label="Tên lớp"
              placeholder="Nhập tên lớp"
              outlined
              required
              dense
              class="required"
              :rules="[$rules.required]"
            >
              <span slot="prepend-inner" class="mt-1">{{ gradeText }}</span>
            </v-text-field>
          </v-col>
        </v-row>
      </v-form>
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
import { get } from 'lodash'
import AutocompleteGrade from '@/components/basic/input/AutocompleteGrade'
import AutocompleteDivision from '@/components/basic/input/AutocompleteDivision'
import { textHelpers } from '@/helpers/TextHelper.js'
import { mapActions } from 'vuex'

export default {
  components: {
    AutocompleteGrade,
    AutocompleteDivision
  },
  props: {
    state: Boolean,
    classData: Object
  },
  data: () => ({
    grade: {},
    division: {},
    title: '',
    dialog: false,
    newClasses: []
  }),
  computed: {
    divisionFilter() {
      return { academicLevel: get(this.grade, 'academicLevel') }
    },
    gradeText() {
      return get(this.grade, 'gradeNumber', '')
    }
  },
  methods: {
    ...mapActions('Generation', ['createNewClass']),

    gradeChanged(grade) {
      if (get(this.grade, 'academicLevel') !== get(grade, 'academicLevel')) {
        this.division = null
      }
      this.grade = grade
    },
    reset() {
      this.$refs.form.reset()
    },
    cancel() {
      this.dialog = false
      this.reset()
    },
    async save() {
      if (!this.$refs.form.validate()) return

      const params = {
        division: this.division,
        grade: this.grade,
        title: this.gradeText + textHelpers.removeSpaces(this.title)
      }
      try {
        this.$loading.active = true
        await this.createNewClass({
          ...params,
          // department: this.department.id,
          // generation: this.currentGeneration.id,
          status: 'running'
        })
        this.$alert.addSuccess()
        this.$refs.form.reset()
        this.dialog = false
      } catch (error) {
        console.error(error)
        this.$alert.addError()
      } finally {
        this.$loading.active = false
      }
    }
  },
  created() {},
  watch: {
    state(state) {
      this.dialog = true
    }
  }
}
</script>

<style scoped></style>
