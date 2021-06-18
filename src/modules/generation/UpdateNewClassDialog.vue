<template>
  <v-dialog :fullscreen="$vuetify.breakpoint.smAndDown" v-model="dialog" width="500" scrollable>
    <v-card>
      <v-card-title class="primary white--text text-uppercase">
        Sửa lớp mới
        <v-spacer></v-spacer>
        <v-btn dark icon>
          <v-icon @click="cancel">close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider />
      <v-form ref="form" flat class="pa-6">
        <div class="d-flex">
          <AutocompleteGrade
            v-model="grade"
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
            @change="gradeChanged"
          />
          <AutocompleteDivision
            return-object
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
        </div>
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
          <span slot="prepend-inner" class="mt-1">{{ gradeText }}</span>
        </v-text-field>
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
    classData: {
      type: [Object],
      required: true,
      default: () => {}
    },
    state: Boolean
  },
  data: () => ({
    grade: {},
    division: {},
    title: '',
    dialog: false,
    className: ''
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
    ...mapActions('Generation', ['updateNewClass']),

    gradeChanged(grade) {
      if (get(this.grade, 'academicLevel') !== get(grade, 'academicLevel')) {
        this.division = null
      }
      this.grade = grade
    },
    reset() {
      this.$refs.form.reset()
    },
    validate() {
      return this.$refs.form.validate()
    },
    resetDefault() {
      if (this.classData.id) {
        this.grade = this.classData.grade
        this.division = this.classData.division
        this.title = this.classData.title
        this.className = this.classData.title.replace(this.gradeText, '')
      }
    },
    cancel() {
      this.dialog = false
      this.reset()
    },
    async save() {
      if (!this.$refs.form.validate()) return

      const params = {
        division: this.division.id,
        grade: this.grade.id,
        title: this.gradeText + textHelpers.removeSpaces(this.className)
      }
      console.log('param', params, this.division)
      try {
        this.$loading.active = true
        await this.updateNewClass({
          id: this.classData.id,
          ...params,
          //   department: this.department.id,
          // generation: this.currentGeneration.id,
          status: 'running'
        })
        this.$alert.updateSuccess()
        this.$refs.form.reset()
        this.dialog = false
      } catch (error) {
        this.$alert.updateError()
      } finally {
        this.$loading.active = false
      }
    }
  },
  created() {
    this.resetDefault()
  },
  watch: {
    classData() {
      this.resetDefault()
    },
    state(state) {
      this.dialog = true
    }
  }
}
</script>

<style scoped></style>
