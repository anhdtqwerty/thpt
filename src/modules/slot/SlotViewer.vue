<template>
    <v-menu
            v-model="selectedOpen"
            :close-on-content-click="false"
            :activator="selectedElement"
            full-width
            offset-x
    >
        <v-card
                color="grey lighten-4"
                min-width="350px"
                flat
        >
            <v-toolbar
                    :color="selectedEvent.color"
                    dark
            >
                <v-btn icon>
                    <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon>
                    <v-icon>mdi-heart</v-icon>
                </v-btn>
                <v-btn icon>
                    <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
            </v-toolbar>
            <v-card-text>
                <span v-html="selectedEvent.details"></span>
            </v-card-text>
            <v-card-actions>
                <v-btn
                        text
                        color="secondary"
                        @click="selectedOpen = false"
                >
                    Cancel
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-menu>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  data: () => ({
    today: '2019-01-01',
    focus: '2019-01-01',
    type: 'month',
    typeToLabel: {
      month: 'Month',
      week: 'Week',
      day: 'Day',
      '4day': '4 Days'
    },
    start: null,
    end: null,
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false
  }),
  computed: {
    ...mapState('app', ['roles', 'department', 'user']),
    ...mapState('slot', ['slots', 'slot']),
    ...mapState('auth', ['user'])
  },
  methods: {
    ...mapActions('slot', ['setSlot'])
  }
}
</script>

<style scoped>

</style>
