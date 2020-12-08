<template>
  <div class="layout__form">
    <div class="layout__form__content">
      <slot />
    </div>
    <v-slide-y-reverse-transition>
      <div class="layout__form__actions bg--natural" v-if="!hideActions">
        <slot name="extends" />
        <slot name="actions">
          <v-btn v-if="resetable" @click="askReset" color="secondary" class="px-4 mr-2">Reset</v-btn>
          <v-btn class="px-4" color="success" @click="done">{{okText}}</v-btn>
        </slot>
      </div>
    </v-slide-y-reverse-transition>
  </div>
</template>

<script>
export default {
  props: {
    resetable: Boolean,
    snapshot: String,
    hideActions: Boolean,
    okText: { type: String, default: 'Save' }
  },
  methods: {
    askReset () {
      if (this.$snapshot.validate(this.snapshot)) return
      this.$dialog.confirm({
        title: 'Reset',
        text: 'Are you sure?',
        done: this.reset
      })
    },
    reset () {
      this.$emit('reset')
    },
    done () {
      if (this.$snapshot.validate(this.snapshot)) {
        this.$alert.warn('No change was made!')
      } else {
        this.$emit('done')
      }
    }
  }
}
</script>

<style lang="scss">
.layout__form {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.layout__form__content {
  flex-grow: 1;
  padding-bottom: 24px;
}
.layout__form__actions {
  z-index: 1;
  text-align: right;
  position: sticky;
  bottom: 0;
  padding: 16px 0;
  transform: translateY(24px);
}
</style>
