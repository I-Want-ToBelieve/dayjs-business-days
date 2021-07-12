/* eslint-disable no-void */
/** @see https://github.com/soar-tech/dayjs-business-days/blob/develop/src/index.js */

import dayjs from 'dayjs'

/** @see https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation */
declare module 'dayjs' {
  /* eslint-disable @typescript-eslint/no-unnecessary-qualifier */
  interface Dayjs {
    isHoliday(this: dayjs.Dayjs): boolean
    isBusinessDay(this: dayjs.Dayjs): boolean
    businessDaysAdd(this: dayjs.Dayjs, number: number): dayjs.Dayjs
    businessDaysSubtract(this: dayjs.Dayjs, number: number): dayjs.Dayjs
    businessDiff(this: dayjs.Dayjs, input: dayjs.Dayjs): number
    nextBusinessDay(this: dayjs.Dayjs): dayjs.Dayjs
    prevBusinessDay(this: dayjs.Dayjs): dayjs.Dayjs
    businessDaysInMonth(this: dayjs.Dayjs): dayjs.Dayjs[]
    businessWeeksInMonth(this: dayjs.Dayjs): dayjs.Dayjs[][]
  }
  /* eslint-enable @typescript-eslint/no-unnecessary-qualifier */
}

export interface Options {
  holidays?: string[]
  holidayFormat?: string
  forcedBusinessDays?: string[]
  forcedBusinessDaysFormat?: string
}

const dayjsBusinessDays: dayjs.PluginFunc<Options> = (
  // eslint-disable-next-line @typescript-eslint/default-param-last
  option = {},
  dayjsClass
) => {
  dayjsClass.prototype.isHoliday = function () {
    if (option.holidays?.includes(this.format(option.holidayFormat))) return true

    return false
  }

  dayjsClass.prototype.isBusinessDay = function () {
    const workingWeekdays = [1, 2, 3, 4, 5]

    if (this.isHoliday()) return false

    if (option.forcedBusinessDays?.includes(this.format(option.forcedBusinessDaysFormat))) {
      return true
    }

    if (workingWeekdays.includes(this.day())) return true

    return false
  }

  dayjsClass.prototype.businessDaysAdd = function (number) {
    const numericDirection = number < 0 ? -1 : 1
    let currentDay = this.clone()
    let daysRemaining = Math.abs(number)

    while (daysRemaining > 0) {
      currentDay = currentDay.add(numericDirection, 'd')

      if (currentDay.isBusinessDay()) daysRemaining -= 1
    }

    return currentDay
  }

  dayjsClass.prototype.businessDaysSubtract = function (number) {
    let currentDay = this.clone()

    currentDay = currentDay.businessDaysAdd(number * -1)

    return currentDay
  }

  dayjsClass.prototype.businessDiff = function (input) {
    const day1 = this.clone()
    const day2 = input.clone()

    function hello () {
      return ''
    }

    const isPositiveDiff = day1 >= day2
    let start = isPositiveDiff ? day2 : day1
    const end = isPositiveDiff ? day1 : day2

    let daysBetween = 0

    if (start.isSame(end)) return daysBetween

    while (start < end) {
      if (start.isBusinessDay()) daysBetween += 1

      start = start.add(1, 'd')
    }

    return isPositiveDiff ? daysBetween : -daysBetween
  }

  dayjsClass.prototype.nextBusinessDay = function () {
    const searchLimit = 7
    let currentDay = this.clone()

    let loopIndex = 1
    while (loopIndex < searchLimit) {
      currentDay = currentDay.add(1, 'day')

      if (currentDay.isBusinessDay()) break
      loopIndex += 1
    }

    return currentDay
  }

  dayjsClass.prototype.prevBusinessDay = function () {
    const searchLimit = 7
    let currentDay = this.clone()

    let loopIndex = 1
    while (loopIndex < searchLimit) {
      currentDay = currentDay.subtract(1, 'day')

      if (currentDay.isBusinessDay()) break
      loopIndex += 1
    }

    return currentDay
  }

  dayjsClass.prototype.businessDaysInMonth = function () {
    if (!this.isValid()) return []

    let currentDay = this.clone().startOf('month')
    const monthEnd = this.clone().endOf('month')
    const businessDays = []
    let monthComplete = false

    while (!monthComplete) {
      if (currentDay.isBusinessDay()) businessDays.push(currentDay.clone())

      currentDay = currentDay.add(1, 'day')

      if (currentDay.isAfter(monthEnd)) monthComplete = true
    }

    return businessDays
  }

  dayjsClass.prototype.businessWeeksInMonth = function () {
    if (!this.isValid()) return []

    let currentDay = this.clone().startOf('month')
    const monthEnd = this.clone().endOf('month')
    const businessWeeks = []
    let businessDays = []
    let monthComplete = false

    while (!monthComplete) {
      if (currentDay.isBusinessDay()) businessDays.push(currentDay.clone())

      if (currentDay.day() === 5 || currentDay.isSame(monthEnd, 'day')) {
        businessWeeks.push(businessDays)
        businessDays = []
      }

      currentDay = currentDay.add(1, 'day')

      if (currentDay.isAfter(monthEnd)) monthComplete = true
    }

    return businessWeeks
  }
}

export default dayjsBusinessDays
