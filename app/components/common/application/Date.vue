<script setup lang="ts">
import { Button, buttonVariants } from '@/components/ui/button'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import {
    RangeCalendarCell,
    RangeCalendarCellTrigger,
    RangeCalendarGrid,
    RangeCalendarGridBody,
    RangeCalendarGridHead,
    RangeCalendarGridRow,
    RangeCalendarHeadCell,
} from '@/components/ui/range-calendar'
import { cn } from '@/lib/utils'
import {
    CalendarDate,
    type DateValue,
} from '@internationalized/date'
import {
    Calendar as CalendarIcon,
    ChevronLeft,
    ChevronRight,
} from 'lucide-vue-next'
import { type DateRange, RangeCalendarRoot, useDateFormatter } from 'radix-vue'
import { createMonth, type Grid, toDate } from 'radix-vue/date'
import { type Ref, ref, watch } from 'vue'

const { startSince, endSince } = defineProps<{
    startSince: number
    endSince: number
}>()

function epochToCalendarDate(epochSeconds: number): CalendarDate {
    if (!epochSeconds || epochSeconds < 0) {
        throw new Error('Invalid epoch time provided.')
    }

    const date = new Date(epochSeconds * 1000)
    return new CalendarDate(
        date.getUTCFullYear(),
        date.getUTCMonth() + 1,
        date.getUTCDate(),
    )
}

const value = ref({
    start: epochToCalendarDate(startSince),
    end: epochToCalendarDate(endSince),
}) as Ref<DateRange>

const locale = ref('en-US')
const formatter = useDateFormatter(locale.value)

const firstMonthPlaceholder = ref(value.value.start) as Ref<DateValue>
const secondMonthPlaceholder = ref(value.value.end) as Ref<DateValue>

const firstMonth = ref(
    createMonth({
        dateObj: firstMonthPlaceholder.value,
        locale: locale.value,
        fixedWeeks: true,
        weekStartsOn: 0,
    }),
) as Ref<Grid<DateValue>>
const secondMonth = ref(
    createMonth({
        dateObj: secondMonthPlaceholder.value,
        locale: locale.value,
        fixedWeeks: true,
        weekStartsOn: 0,
    }),
) as Ref<Grid<DateValue>>

defineExpose({
    value,
})

function updateMonth(reference: 'first' | 'second', months: number) {
    if (reference === 'first') {
        firstMonthPlaceholder.value = firstMonthPlaceholder.value.add({ months })
    }
    else {
        secondMonthPlaceholder.value = secondMonthPlaceholder.value.add({
            months,
        })
    }
}

watch(value, (newValue) => {
    if (newValue.start && newValue.end && newValue.end.compare(newValue.start) < 0) {
        value.value.end = newValue.start
    }
})

watch(firstMonthPlaceholder, (newPlaceholder) => {
    firstMonth.value = createMonth({
        dateObj: newPlaceholder,
        weekStartsOn: 0,
        fixedWeeks: false,
        locale: locale.value,
    })
})

watch(secondMonthPlaceholder, (newPlaceholder) => {
    secondMonth.value = createMonth({
        dateObj: newPlaceholder,
        weekStartsOn: 0,
        fixedWeeks: false,
        locale: locale.value,
    })
})
</script>

<template>
    <Popover>
        <PopoverTrigger as-child>
            <Button
                variant="secondary" :class="cn(
                    'w-full justify-start text-left font-normal',
                    !value && 'text-muted-foreground',
                )"
            >
                <CalendarIcon class="mr-2 h-4 w-4" />
                <template v-if="value.start">
                    <template v-if="value.end">
                        {{
                            formatter.custom(toDate(value.start), {
                                dateStyle: "medium",
                            })
                        }}
                        -
                        {{
                            formatter.custom(toDate(value.end), {
                                dateStyle: "medium",
                            })
                        }}
                    </template>
                    <template v-else>
                        {{
                            formatter.custom(toDate(value.start), {
                                dateStyle: "medium",
                            })
                        }}
                    </template>
                </template>
                <template v-else>
                    Pick a date
                </template>
            </Button>
        </PopoverTrigger>
        <PopoverContent class="w-auto p-0">
            <RangeCalendarRoot v-slot="{ weekDays }" v-model="value" class="p-3">
                <div class="flex flex-col gap-y-4 mt-4 sm:flex-row sm:gap-x-4 sm:gap-y-0">
                    <div class="flex flex-col gap-4">
                        <div class="flex items-center justify-between">
                            <button
                                :class="cn(
                                    buttonVariants({ variant: 'secondary' }),
                                    'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
                                )" @click="updateMonth('first', -1)"
                            >
                                <ChevronLeft class="h-4 w-4" />
                            </button>
                            <div class="text-captionL font-medium">
                                {{
                                    formatter.fullMonthAndYear(
                                        toDate(firstMonth.value),
                                    )
                                }}
                            </div>
                            <button
                                :class="cn(
                                    buttonVariants({ variant: 'secondary' }),
                                    'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
                                )" @click="updateMonth('first', 1)"
                            >
                                <ChevronRight class="h-4 w-4" />
                            </button>
                        </div>
                        <RangeCalendarGrid>
                            <RangeCalendarGridHead>
                                <RangeCalendarGridRow>
                                    <RangeCalendarHeadCell v-for="day in weekDays" :key="day">
                                        {{ day }}
                                    </RangeCalendarHeadCell>
                                </RangeCalendarGridRow>
                            </RangeCalendarGridHead>
                            <RangeCalendarGridBody>
                                <RangeCalendarGridRow v-for="(weekDates, index) in firstMonth.rows" :key="index">
                                    <RangeCalendarCell
                                        v-for="weekDate in weekDates" :key="weekDate.toString()"
                                        :date="weekDate"
                                    >
                                        <RangeCalendarCellTrigger :day="weekDate" :month="firstMonth.value" />
                                    </RangeCalendarCell>
                                </RangeCalendarGridRow>
                            </RangeCalendarGridBody>
                        </RangeCalendarGrid>
                    </div>
                    <div class="flex flex-col gap-4">
                        <div class="flex items-center justify-between">
                            <button
                                :class="cn(
                                    buttonVariants({ variant: 'secondary' }),
                                    'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
                                )" @click="updateMonth('second', -1)"
                            >
                                <ChevronLeft class="h-4 w-4" />
                            </button>
                            <div class="text-captionL font-medium">
                                {{
                                    formatter.fullMonthAndYear(
                                        toDate(secondMonth.value),
                                    )
                                }}
                            </div>
                            <button
                                :class="cn(
                                    buttonVariants({ variant: 'secondary' }),
                                    'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
                                )" @click="updateMonth('second', 1)"
                            >
                                <ChevronRight class="h-4 w-4" />
                            </button>
                        </div>
                        <RangeCalendarGrid>
                            <RangeCalendarGridHead>
                                <RangeCalendarGridRow>
                                    <RangeCalendarHeadCell v-for="day in weekDays" :key="day">
                                        {{ day }}
                                    </RangeCalendarHeadCell>
                                </RangeCalendarGridRow>
                            </RangeCalendarGridHead>
                            <RangeCalendarGridBody>
                                <RangeCalendarGridRow v-for="(weekDates, index) in secondMonth.rows" :key="index">
                                    <RangeCalendarCell
                                        v-for="weekDate in weekDates" :key="weekDate.toString()"
                                        :date="weekDate"
                                    >
                                        <RangeCalendarCellTrigger :day="weekDate" :month="secondMonth.value" />
                                    </RangeCalendarCell>
                                </RangeCalendarGridRow>
                            </RangeCalendarGridBody>
                        </RangeCalendarGrid>
                    </div>
                </div>
            </RangeCalendarRoot>
        </PopoverContent>
    </Popover>
</template>
