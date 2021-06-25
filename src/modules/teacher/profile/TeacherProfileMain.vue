<template>
  <div>
    <v-row>
      <v-col cols="6">
        <v-card outlined>
          <v-card-title>
            Công tác giảng dạy
          </v-card-title>
          <v-divider />
          <v-card-text>
            <h1 class="text-center" style="color: #46BE8A">{{ teachings.filter(t => t === teacher.id).length }}</h1>
            <p class="text-center py-3">Số lớp đang dạy</p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card outlined>
          <v-card-title>
            Công tác chủ nhiệm
          </v-card-title>
          <v-divider />
          <v-card-text>
            <h1 class="text-center" style="color: #46BE8A">
              {{ teacher.ownClasses ? teacher.ownClasses.length : 0 }}
            </h1>
            <p class="text-center py-3">Số lớp đang chủ nhiệm</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import { map } from 'lodash'
export default {
  components: {},
  data() {
    return {
      teachings: []
    }
  },
  computed: {
    ...mapState('teacher', ['teacher']),
    ...mapGetters('app', ['commonQuery'])
  },
  methods: { ...mapActions('teaching', ['fetchTeachings']) },
  async created() {
    const res = await this.fetchTeachings({ ...this.commonQuery })
    this.teachings = map(res, 'teacher.id')
  }
}
</script>
