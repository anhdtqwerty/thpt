<template>
  <v-card min-width="350px" flat>
    <v-card-text>
      <v-list-item-title class="headline mb-1">{{data.class.title}}</v-list-item-title>
      <v-list-item-subtitle>
        Mã Lớp:
        <router-link :to="'/class/' + data.class.id">
          {{data.class.code}}
        </router-link>
      </v-list-item-subtitle>
      <v-list-item-subtitle>Thời Gian: {{data.startTime | toTime}}</v-list-item-subtitle>
      <v-list-item-subtitle>Ghi Chú: {{data.descriptions}}</v-list-item-subtitle>
    </v-card-text>
    <v-card-actions>
      <v-btn text color="accent-4" :to="'/class/' + data.class.id">Xem</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'
export default {
  data: () => ({
    loading: false,
    selection: 1
  }),
  props: { data: Object },
  created () {},
  computed: {
    ...mapState('constant', ['slotStatus', 'slotTypes'])
  },
  methods: {
    reserve () {
      this.loading = true
      setTimeout(() => (this.loading = false), 2000)
    }
  },
  filters: {
    toTime (time) {
      return moment(time).format('hh:mm Ngày DD-MM')
    }
  }
}
</script>
