
import { Subject } from 'rxjs'
import { takeUntil, debouceTime, debounceTime } from 'rxjs/operators'

const RxWatcher = {
  install (Vue, options) {
    ;(Vue.prototype.$rxWatch = function (name, time = 0) {
      if (!this.$rxWatchUnsubscribles) {
        this.$rxWatchUnsubscribles = new Subject()
      }
      const sub = new Subject()
      this.$watch(name, newVal => sub.next(newVal))
      if (time > 0) {
        return sub.pipe(
          takeUntil(this.$rxWatchUnsubscribles),
          debounceTime(time)
        )
      }
      return sub.pipe(takeUntil(this.$rxWatchUnsubscribles))
    }),
    (Vue.prototype.$rxWatchs = function (names, time = 0) {
      if (!this.$rxWatchUnsubscribles) {
        this.$rxWatchUnsubscribles = new Subject()
      }
      const sub = new Subject()
      names.forEach(name => {
        this.$watch(name, newVal => sub.next({ name, value: newVal }))
      })
      if (time > 0) {
        return sub.pipe(
          takeUntil(this.$rxWatchUnsubscribles),
          debounceTime(time)
        )
      }
      return sub.pipe(takeUntil(this.$rxWatchUnsubscribles))
    })
    Vue.mixin({
      destroyed () {
        if (this.$rxWatchUnsubscribles) {
          this.$rxWatchUnsubscribles.next()
          this.$rxWatchUnsubscribles.complete()
        }
      }
    })
  }
}

export default RxWatcher
