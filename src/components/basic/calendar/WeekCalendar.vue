<template>
  <div>
    <v-data-table
      v-if="!$vuetify.breakpoint.mobile"
      class="week-calendar"
      :headers="headers"
      :items="items"
      hide-default-footer
      :loading="loading"
    >
      <template v-for="i in ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']" v-slot:[`header.${i}`]="{ header }">
        <div class="calendar__day-name" :key="`day-name-${i}`">
          {{ header.text }}
        </div>
        <div class="calendar__day-value" :class="{ active: isCurrentDate(header.dateobj) }" :key="`day-value-${i}`">
          {{ header.dateAndMonth }}
        </div>
      </template>

      <template v-slot:[`item.group`]="{ item }">
        <div class="calendar__group">{{ item.group }}</div>
      </template>
      <template v-for="i in ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']" v-slot:[`item.${i}`]="{ item }">
        <div v-if="item[i] && item[i] instanceof Array && !loading" :key="i">
          <template v-for="(event, index) in item[i]">
            <v-chip
              class="mb-2"
              style="width: 100%"
              v-if="event.name"
              :key="index"
              label
              :color="event.color"
              dark
              small
              @click="e => onClickEvent(e, event)"
            >
              {{ event.name }}
            </v-chip>
          </template>
        </div>
      </template>
    </v-data-table>

    <div v-else>
      <div class="calendar__mobile-headers">
        <div
          class="calendar__mobile-header"
          :class="{ active: header.value === mobileControllData.currentTab }"
          @click="mobileControllData.currentTab = header.value"
          v-for="(header, index) in headers.slice(1)"
          :key="index"
        >
          <div class="calendar__day-name" :key="`day-name-${index}`">
            {{ header.text }}
          </div>
          <div
            class="calendar__day-value"
            :class="{ active: isCurrentDate(header.dateobj) }"
            :key="`day-value-${index}`"
          >
            {{ header.dateAndMonth }}
          </div>
        </div>
        <table class="calendar__mobile-content">
          <tr v-for="(item, index) in items" :key="index">
            <td class="calendar__group-cell">
              {{ item.group }}
            </td>
            <td>
              <template v-for="(event, index) in item[mobileControllData.currentTab]">
                <v-chip
                  class="mb-2"
                  style="width: 100%"
                  v-if="event.name"
                  :key="index"
                  label
                  :color="event.color"
                  dark
                  small
                  @click="e => onClickEvent(e, event)"
                >
                  {{ event.name }}
                </v-chip>
              </template>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
moment.locale('vi')

export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    config: {
      type: Object,
      default() {
        return {}
      }
    },
    events: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      mobileControllData: {
        currentTab: 'T2'
      }
    }
  },
  computed: {
    dayNameList() {
      let days = []
      let startDay = this.config.start.clone()
      let endDay = this.config.end.clone()
      while (startDay < endDay) {
        days.push(startDay)
        startDay = startDay.clone().add(1, 'day')
      }
      return days
    },
    items() {
      let timePeriod = [{ group: 'Sáng' }, { group: 'Chiều' }, { group: 'Tối' }]
      this.events.forEach(event => {
        let timestamp = moment(event.timestamp, `YYYY-MM-DD HH:mm`)
        let index = 0
        if (timestamp.hour() < 12) {
          index = 0
        } else if (timestamp.hour() < 18) {
          index = 1
        } else {
          index = 2
        }
        if (!timePeriod[index][timestamp.format('dd')]) {
          timePeriod[index][timestamp.format('dd')] = []
        }
        timePeriod[index][timestamp.format('dd')].push(event)
      })
      return timePeriod
    },
    headers() {
      const mainHeaders = this.dayNameList.map(item => {
        return {
          text: item.format('dddd'),
          value: item.format('dd'),
          date: item.format('D'),
          dateAndMonth: item.format('DD/MM'),
          dateobj: item,
          sortable: false
        }
      })
      mainHeaders.unshift({
        text: '',
        value: 'group',
        date: '',
        sortable: false
      })
      return mainHeaders
    }
  },
  methods: {
    isCurrentDate(date) {
      return moment().format('DD-MM-YYYY') === moment(date).format('DD-MM-YYYY')
    },
    onClickEvent(e, event) {
      this.$emit('click:event', {
        nativeEvent: e,
        event
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.week-calendar ::v-deep tr td {
  vertical-align: top;
  border-right: thin solid rgba(0, 0, 0, 0.12);
  padding-top: 8px !important;
  padding-bottom: 8px !important;
  .calendar__group {
    text-transform: uppercase;
    font-size: 14px;
    line-height: 16px;
    text-align: center;
  }
  &:first-child {
    vertical-align: middle;
  }
}
.week-calendar ::v-deep th {
  padding-top: 14px !important;
  padding-bottom: 14px !important;
  width: 127px;
  height: 126px;
  background: #ffecb3;
  border-right: 1px solid #ffffff;
  .calendar__day-name {
    text-transform: uppercase;
    text-align: center;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    margin-bottom: 12px;
  }
  .calendar__day-value {
    display: flex;
    margin: 0 auto;
    align-items: center;
    justify-content: center;
    height: 64px;
    width: 64px;
    font-style: normal;
    font-size: 12px;
    line-height: 14px;
    border-radius: 50%;
    &.active {
      background-color: #0d47a1;
    }
  }
  .calendar__cell {
    min-height: 64px;
    border-collapse: collapse;
  }
}
.uppercase {
  text-transform: uppercase;
}
.calendar__mobile-headers {
  display: flex;
  flex-wrap: wrap;
  .calendar__mobile-header {
    flex-grow: 1;
    text-align: center;
    height: 40px;
    background-color: #ffecb3;
    &.active {
      background-color: #0d47a1;
    }
    .calendar__day-name {
      text-transform: uppercase;
    }
    .calendar__day-value {
      font-weight: bold;
    }
    .calendar__day-name,
    .calendar__day-value {
      display: flex;
      height: 20px;
      justify-content: center;
      align-items: center;
      font-size: 12px;
      line-height: 11px;
    }
  }
  .calendar__mobile-content {
    width: 100%;
    border-collapse: collapse;
    .calendar__group-cell {
      width: 80px;
      max-width: 100px;
    }
    tr,
    td {
      border-collapse: collapse;
    }
    td {
      padding: 8px;
      border-right: thin solid rgba(0, 0, 0, 0.12);
      border-bottom: thin solid rgba(0, 0, 0, 0.12);
    }
  }
}
</style>
