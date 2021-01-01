<template>
  <v-dialog
    v-model="dialog"
    :fullscreen="$vuetify.breakpoint.smAndDown"
    :overlay="false"
    transition="dialog-transition"
    width="400"
  >
    <v-card>
      <v-card-title class="primary white--text font-weight-regular"
        >CÀI ĐẶT CỘT HIỂN THỊ</v-card-title
      >
      <v-card-text>
        <v-row no-gutters>
          <v-col cols="6" class="py-0" v-for="i in colNumber" :key="i">
            <v-checkbox
              class="nowrap pa-2"
              color="#0D47A1"
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
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn medium depressed dark color="#0D47A1" @click="change">
          OK
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    defaultHeaders: {
      type: Array,
      default() {
        return []
      },
    },
    value: {
      type: Array,
      default() {
        return []
      },
    },
    state: Boolean,
  },
  data() {
    return {
      itemPerCol: 4,
      originHeaders: [],
      dialog: false,
    }
  },
  created() {
    this.originHeaders = JSON.parse(JSON.stringify(this.defaultHeaders))
  },
  computed: {
    colNumber() {
      return Math.ceil(this.originHeaders.length / this.itemPerCol)
    },
  },
  methods: {
    change() {
      this.$emit(
        'change',
        this.originHeaders.filter((item) => item.show)
      )
      this.dialog = false
    },
  },
  watch: {
    state(state) {
      this.dialog = true
    },
  },
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
