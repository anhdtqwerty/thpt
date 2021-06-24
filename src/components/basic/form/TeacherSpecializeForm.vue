<template>
  <v-form ref="form" v-bind="this.$attrs">
    <v-row>
      <v-col class="pb-0" cols="12" md="6">
        <v-autocomplete
          :items="levelList"
          item-text="title"
          item-value="value"
          v-model="level"
          label="Trình độ"
          outlined
          dense
        />
      </v-col>
      <v-col class="pb-0" cols="12" md="6">
        <AutocompleteSubjectGroup
          return-object
          v-model="subjectGroup"
          label="Lĩnh vực"
          class="col-md-6 mr-4"
          dense
          hide-details
          outlined
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col class="pb-0" cols="12" md="6">
        <v-text-field v-model="trainingPlace" label="Nơi đào tạo" outlined dense />
      </v-col>
      <v-col class="pb-0" cols="12" md="6">
        <v-text-field
          v-model="majorDate"
          label="Năm vào ngành"
          type="number"
          :rules="[$rules.yearNotRequired]"
          outlined
          dense
        />
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { get } from 'lodash'
import AutocompleteSubjectGroup from '@/components/basic/input/AutocompleteSubjectGroup'

export default {
  components: {
    AutocompleteSubjectGroup
  },
  props: { teacher: Object, formState: Boolean },
  data: () => ({
    level: '',
    levelList: [
      {
        title: 'Đại học',
        value: 'university-level'
      },
      {
        title: 'Cao đẳng',
        value: 'college-level'
      }
    ],
    subjectGroup: null,
    trainingPlace: '',
    majorDate: ''
  }),
  created() {
    this.initData()
  },

  methods: {
    initData() {
      if (this.teacher) {
        this.level = get(this.teacher, 'metadata.level')
        this.subjectGroup = this.teacher.subjectGroup
        this.trainingPlace = get(this.teacher, 'metadata.trainingPlace')
        this.majorDate = get(this.teacher, 'metadata.majorDate')
      }
    },
    getData() {
      return {
        level: this.level,
        subjectGroup: this.subjectGroup,
        trainingPlace: this.trainingPlace,
        majorDate: this.majorDate
      }
    },
    validate() {
      return this.$refs.form.validate()
    },
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    }
  },
  watch: {
    formState(formState) {
      if (!formState) {
        this.initData()
      }
    }
  }
}
</script>
