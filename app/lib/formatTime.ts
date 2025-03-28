import {
    differenceInDays,
    differenceInHours,
    differenceInMilliseconds,
    differenceInMinutes,
    differenceInMonths,
    differenceInSeconds,
    differenceInWeeks,
    differenceInYears,
    format,
    formatDistance,
    formatDistanceToNow,
    formatDuration,
    getTime,
    intervalToDuration,
} from 'date-fns'

type InputValue = Date | string | number | null

export function fDate(date: InputValue, newFormat?: string) {
    const fm = newFormat || 'dd MMM yyyy'
    return date ? format(new Date(date), fm) : ''
}

export function fDateTime(date: InputValue, newFormat?: string) {
    const fm = newFormat || 'dd MMM yyyy HH:mm'
    return date ? format(new Date(date), fm) : ''
}

export function getDateFromUtcDate(date: InputValue) {
    if (date === null)
        return new Date()
    const local = new Date(date)
    const offset = local.getTimezoneOffset()
    return new Date(local.getTime() - offset * 60000)
}

export function fUtcDateTime(date: InputValue, newFormat?: string) {
    const newDate = getDateFromUtcDate(date)
    const fm = newFormat || 'dd MMM yyyy HH:mm'
    return date ? format(newDate, fm) : ''
}

export function convertUtcUnixTimeSec(date: InputValue) {
    if (date === null)
        return new Date()
    const local = new Date(date)
    const offset = local.getTimezoneOffset()
    return new Date(local.getTime() - offset * 60000).getTime() / 1000
}

export function fTimestamp(date: InputValue) {
    return date ? getTime(new Date(date)) : ''
}

export function fToNow(date: InputValue) {
    const formattedDate = date
        ? formatDistanceToNow(new Date(date), {
                addSuffix: true,
            })
        : ''

    return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)
}

export function fDateToDate(date: InputValue, otherDate: InputValue, suffix: boolean = true) {
    const formattedDate
        = date && otherDate
            ? formatDistance(new Date(date), new Date(otherDate), {
                    addSuffix: suffix,
                })
            : '-'

    return formattedDate
}

export function fSecEpochDateTime(date: number, newFormat?: string) {
    if (!date) {
        return ''
    }

    return fDateTime(date * 1000, newFormat)
}

export function fMsEpocDateTime(date: number, newFormat?: string) {
    if (!date) {
        return ''
    }

    return fDateTime(date, newFormat)
}

export function fSecToHuman(sec: number) {
    if (sec !== null && sec !== undefined) {
        const minutes = Math.floor(sec / 60)
        const seconds = sec % 60
        return formatDuration({ minutes, seconds }, { format: ['minutes', 'seconds'], zero: minutes > 0 })
    }
    return formatDuration({ seconds: 0 }, { format: ['seconds'] })
}

export function fSecToHuman2(sec: number, mathFunction: 'round' | 'floor' | 'ceil' = 'floor') {
    const mathFunc = Math[mathFunction as keyof Math] as (x: number) => number

    const durations = intervalToDuration({
        start: 0,
        end: sec * 1000,
    })

    const totalDays = durations?.days || 0

    const weeks = Math.floor(totalDays / 7)
    const remainingDays = totalDays % 7

    const result = []

    if ((durations?.years ?? 0) >= 1) {
        result.push(formatDuration({ years: mathFunc(durations.years ?? 0) }))
    }
    if ((durations?.months ?? 0) >= 1) {
        result.push(formatDuration({ months: mathFunc(durations.months ?? 0) }))
    }
    if (weeks >= 1) {
        result.push(formatDuration({ weeks: mathFunc(weeks) }))
    }
    if (remainingDays >= 1) {
        result.push(formatDuration({ days: mathFunc(durations.days ?? 0) }))
    }
    if ((durations?.hours ?? 0) >= 1) {
        result.push(formatDuration({ hours: mathFunc(durations.hours ?? 0) }))
    }
    if ((durations?.minutes ?? 0) >= 1) {
        result.push(formatDuration({ minutes: mathFunc(durations.minutes ?? 0) }))
    }
    if ((durations?.seconds ?? 0) >= 1) {
        result.push(formatDuration({ seconds: mathFunc(durations.seconds ?? 0) }))
    }

    return result.slice(0, 2).join(' ')
}

export function fHourToHuman(sec: number, mathFunction: 'round' | 'floor' | 'ceil' = 'floor') {
    const mathFunc = Math[mathFunction as keyof Math] as (x: number) => number

    const durations = intervalToDuration({
        start: 0,
        end: sec * 1000,
    })

    const totalDays = durations?.days || 0

    const weeks = Math.floor(totalDays / 7)
    const remainingDays = totalDays % 7
    const result = []

    if ((durations?.years ?? 0) >= 1) {
        result.push(formatDuration({ years: mathFunc(durations.years ?? 0) }))
    }

    if ((durations?.months ?? 0) >= 1) {
        result.push(formatDuration({ months: mathFunc(durations.months ?? 0) }))
    }

    if (weeks >= 1 && remainingDays === 0) {
        result.push(formatDuration({ weeks: mathFunc(weeks) }))
    }

    if (remainingDays >= 1 && weeks === 0) {
        result.push(formatDuration({ days: mathFunc(remainingDays ?? 0) }))
    }

    if (remainingDays >= 1 && weeks >= 1) {
        result.push(formatDuration({ days: mathFunc(totalDays ?? 0) }))
    }

    if ((durations?.hours ?? 0) >= 1) {
        result.push(formatDuration({ hours: mathFunc(durations.hours ?? 0) }))
    }

    return result.slice(0, 2).join(' ')
}

interface DurationTime {
    value: number
    translates: string
}

export function fDurationTime(start: Date | string | number, end: Date | string | number): DurationTime {
    const startDate = new Date(start)
    const endDate = new Date(end)

    const DurationTime: DurationTime = {
        value: 0,
        translates: 'second',
    }

    const milliseconds = differenceInMilliseconds(endDate, startDate)
    if (milliseconds < 1000) {
        DurationTime.value = milliseconds
        DurationTime.translates = 'millisecond'
    }

    const seconds = differenceInSeconds(endDate, startDate)
    if (seconds < 60) {
        DurationTime.value = seconds
        DurationTime.translates = 'second'
    }

    const minutes = differenceInMinutes(endDate, startDate)
    if (minutes < 60 && minutes > 0) {
        DurationTime.value = minutes
        DurationTime.translates = 'minute'
    }

    const hours = differenceInHours(endDate, startDate)
    if (hours < 24 && hours > 0) {
        DurationTime.value = hours
        DurationTime.translates = 'hour'
    }

    const days = differenceInDays(endDate, startDate)
    if (days < 7 && days > 0) {
        DurationTime.value = days
        DurationTime.translates = 'day'
    }

    const weeks = differenceInWeeks(endDate, startDate)
    if (weeks < 4 && weeks > 0) {
        DurationTime.value = weeks
        DurationTime.translates = 'week'
    }

    const months = differenceInMonths(endDate, startDate)
    if (months < 12 && months > 0) {
        DurationTime.value = months
        DurationTime.translates = 'month'
    }

    const years = differenceInYears(endDate, startDate)
    if (years > 0) {
        DurationTime.value = years
        DurationTime.translates = 'year'
    }

    return DurationTime
}

export function calculateDateDifference(startEpoch: number, endEpoch: number): string {
    const startDate = new Date(startEpoch * 1000)
    const endDate = endEpoch === 0 ? new Date() : new Date(endEpoch * 1000)

    const startYear = startDate.getFullYear()
    const endYear = endDate.getFullYear()

    const startMonth = startDate.getMonth()
    const endMonth = endDate.getMonth()

    const startDay = startDate.getDate()
    const endDay = endDate.getDate()

    let years = endYear - startYear
    let months = endMonth - startMonth

    if (months < 0) {
        years -= 1
        months += 12
    }

    let days = endDay - startDay
    if (days < 0) {
        const previousMonth = new Date(endYear, endMonth, 0)
        days += previousMonth.getDate()
        months -= 1

        if (months < 0) {
            years -= 1
            months += 12
        }
    }

    let result = ''
    if (years > 0)
        result += `${years} years `
    if (months > 0)
        result += `${months} months `
    if (months < 1 && days > 0)
        result += `${days || 1} days `

    return result.trim() || '1 day'
}
