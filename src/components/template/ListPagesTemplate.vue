<template>
  <div class="template__list">
    <slot name="top">
      <div class="mb-3 text-xs-right" v-if="!!$slots['create-form']">
        <base-form-dialog
          title="Add New"
          @done="cb => $emit('create', cb)"
          @cancel="$emit('cancel-create')"
        >
          <v-btn slot="activator" color="primary" depressed class="ma-0"><v-icon class="mr-2"></v-icon> Add new</v-btn>
          <slot name="create-form" />
        </base-form-dialog>
      </div>
    </slot>

    <div
      class="mb-2 flex-center-between"
      style="flex-direction: row-reverse;"
      :style="{'flex-wrap': $vuetify.breakpoint.mdAndDown ? 'wrap' : 'nowrap'}"
    >
      <div
        class="flex-center"
        style="margin-left: auto; justify-content: flex-end;"
        :style="{'flex-wrap': $vuetify.breakpoint.smAndDown ? 'wrap' : 'nowrap'}"
      >
        <slot name="filters" />

        <base-input
          v-if="!hideSearch"
          :value="search"
          :readonly="readonly"
          @input="onSearchChange"
          placeholder="Search"
          prepend-icon="search"
          class="mb-2 ml-2"
          hide-details
          style="width: 320px;"
          clearable
        />
      </div>

      <v-slide-y-reverse-transition>
        <slot name="actions">
          <v-tooltip bottom v-if="!hideActions">
            <v-btn
              slot="activator"
              @click="$emit('remove')"
            >
              <v-icon style="font-size: 20px; opacity: .8;">delete</v-icon>
            </v-btn>
            Delete
          </v-tooltip>
        </slot>
      </v-slide-y-reverse-transition>
    </div>

    <slot />

    <base-quick-view-panel ref="quickView">
      <slot name="preview" />
    </base-quick-view-panel>
  </div>
</template>

<script>
export default {
  props: {
    hideSearch: Boolean,
    hideActions: { type: Boolean, default: true },
    search: String,
    selected: Array,
    debounceTime: Number
  },
  data () {
    return {
      lastChangeAt: 0,
      readonly: false
    }
  },
  methods: {
    preview () {
      this.$refs.quickView.show()
    },
    onSearchChange (text) {
      if (!this.debounceTime) {
        this.$emit('update:search', text)
      } else {
        this.lastChangeAt = Date.now()
        setTimeout(() => {
          if (Date.now() - this.lastChangeAt >= this.debounceTime) {
            this.readonly = true
            this.$emit('update:search', text, () => {
              this.readonly = false
            })
          }
        }, this.debounceTime)
      }
    }
  }
}
</script>
