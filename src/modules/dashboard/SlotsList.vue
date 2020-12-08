<template>
  <v-row class="fill-height">
    <v-col>
      <v-sheet>
        <v-toolbar flat color="white">
          <div style="color: #0D47A1" class="mr-4">
            {{ startWeek.format('DD/MM/YYYY') }}
            -
            {{ endWeek.format('DD/MM/YYYY') }}
          </div>
          <v-btn :disabled="loading" icon color="grey darken-2" @click="prev">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn :disabled="loading" icon color="grey darken-2" @click="next">
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <div style="text-align: right">
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="true"
              :return-value.sync="date"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  hide-details
                  outlined
                  :value="convertDateToString(date)"
                  readonly
                  dense
                  append-icon="keyboard_arrow_down"
                  v-bind="attrs"
                  v-on="on"
                  @click:append="on.click"
                ></v-text-field>
              </template>
              <v-date-picker v-model="date" type="month" no-title scrollable>
              </v-date-picker>
            </v-menu>
          </div>
        </v-toolbar>
      </v-sheet>
      <v-sheet>
        <week-calendar
          :config="{ start: startWeek, end: endWeek }"
          :events="events"
          @click:event="showEvent"
          :loading="loading"
        />
        <v-dialog
          :fullscreen="$vuetify.breakpoint.mobile"
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
          :max-width="320"
        >
          <slot-card
            :data="selectedEvent.data"
            @close="selectedOpen = false"
          ></slot-card>
        </v-dialog>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
import _ from 'lodash'
import moment from 'moment'
import SlotCard from '@/modules/dashboard/SlotCard.vue'
import WeekCalendar from '@/components/basic/calendar/WeekCalendar'
export default {
  components: {
    SlotCard,
    WeekCalendar
  },
  data: () => ({
    menu: '',
    date: moment().format('YYYY-MM'),
    focus: '',
    start: null,
    end: null,
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    startWeek: moment().startOf('week'),
    endWeek: moment().endOf('week')
  }),
  computed: {
    events() {
      return this.slots.map(s => {
        return {
          name: _.get(s, 'class.code'),
          start: moment(s.startTime).format(`YYYY-MM-DD`),
          color:
            moment(s.startTime).hour() < 12
              ? 'green'
              : moment(s.startTime).hour() < 18
              ? 'orange'
              : '#727272',
          data: s,
          timestamp: moment(s.startTime).format(`YYYY-MM-DD HH:mm`),
          timed: false
        }
      })
    }
  },
  watch: {
    date(val, old) {
      this.startWeek = moment(val, 'YYYY-MM').startOf('week')
      this.endWeek = this.startWeek.clone().endOf('week')
      this.updateRange({
        start: this.startWeek,
        end: this.endWeek
      })
    }
  },
  props: {
    slots: Array,
    count: Number,
    add: Boolean,
    remove: Boolean,
    headers: Array,
    loading: Boolean
  },
  methods: {
    next() {
      this.startWeek = this.startWeek.add(1, 'week').clone()
      this.endWeek = this.endWeek.add(1, 'week').clone()
      this.updateRange({
        start: this.startWeek,
        end: this.endWeek
      })
    },
    prev() {
      this.startWeek = this.startWeek.subtract(1, 'week').clone()
      this.endWeek = this.endWeek.subtract(1, 'week').clone()
      this.updateRange({
        start: this.startWeek,
        end: this.endWeek
      })
    },
    showEvent({ nativeEvent, event }) {
      this.selectedEvent = event
      this.selectedElement = nativeEvent.target
      this.selectedOpen = true
      nativeEvent.stopPropagation()
    },
    updateRange({ start, end }) {
      this.start = start
      this.end = end
      this.$emit('change', { start, end })
    },
    convertDateToString(date) {
      if (
        moment(this.startWeek).format(`MM YYYY`) ===
        moment(this.endWeek).format(`MM YYYY`)
      ) {
        return 'Tháng ' + moment(this.startWeek).format(`MM YYYY`)
      } else {
        return (
          'T' +
          moment(this.startWeek).format(`MM`) +
          ' và T' +
          moment(this.endWeek).format(`MM`) +
          ' ' +
          moment(this.startWeek).format(`YYYY`)
        )
      }
    },
    onClickGoToCurrent() {
      this.startWeek = moment().startOf('week')
      this.endWeek = moment().endOf('week')
      this.updateRange({
        start: this.startWeek,
        end: this.endWeek
      })
    }
  }
}
</script>
<style scoped></style>
