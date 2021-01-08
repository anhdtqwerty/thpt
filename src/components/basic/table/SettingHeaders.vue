<template>
  <div class="setting-table-header-wrapper">
    <v-menu
      class="setting-table-header"
      left
      bottom
      nudge-right="36"
      nudge-bottom="36"
      absolute
      attach
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon class="hidden-xs-only" dark v-bind="attrs" v-on="on">
          <v-icon small color="grey">mdi-settings</v-icon>
        </v-btn>
      </template>
      <div class="setting__board px-4 py-3">
        <div class="setting__cols" v-for="i in colNumber" :key="i">
          <v-checkbox
            class="ma-0 pa-0"
            hide-details
            v-for="header in originHeaders.slice(
              (i - 1) * itemPerCol,
              (i - 1) * itemPerCol + itemPerCol
            )"
            :key="header.text"
            v-model="header.show"
            :label="header.text"
          >
          </v-checkbox>
        </div>
      </div>
    </v-menu>
    <v-dialog
      v-model="dialog"
      fullscreen
      persistent
      :overlay="false"
      transition="dialog-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          icon
          color="grey"
          class="hidden-sm-and-up"
          dark
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-settings</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="white--text font-weight-regular"
          >CÀI ĐẶT CỘT HIỂN THỊ</v-card-title
        >
        <v-row no-gutters>
          <v-col cols="6" class="py-0" v-for="i in colNumber" :key="i">
            <v-checkbox
              class="nowrap py-2"
              hide-details
              v-for="header in originHeaders.slice(
                (i - 1) * itemPerCol,
                (i - 1) * itemPerCol + itemPerCol
              )"
              :key="header.text"
              v-model="header.show"
              :label="header.text"
            >
            </v-checkbox>
          </v-col>
        </v-row>
        <div class="d-flex justify-end">
          <v-card-actions>
            <v-btn class="my-16" large dark @click="dialog = false">
              OK
            </v-btn>
          </v-card-actions>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    defaultHeaders: {
      type: Array,
      default() {
        return []
      }
    },
    value: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      itemPerCol: 4,
      originHeaders: [],
      dialog: false
    }
  },
  created() {
    this.originHeaders = JSON.parse(JSON.stringify(this.defaultHeaders))
  },
  computed: {
    colNumber() {
      return Math.ceil(this.originHeaders.length / this.itemPerCol)
    }
  },
  watch: {
    originHeaders: {
      handler(val) {
        this.$emit(
          'change',
          val.filter(item => item.show)
        )
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style scoped>
.setting__board {
  display: flex;
  background: #ffffff;
}
.setting__cols {
  margin-right: 24px;
  min-width: 200px;
}
.setting-table-header-wrapper {
  position: relative;
  display: inline-block;
  text-align: right;
}
</style>
