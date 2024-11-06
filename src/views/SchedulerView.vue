<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import { format } from "date-fns";

const data = [
  {
    room: {
      name: "Classic Single",
      img: "https://i.pinimg.com/474x/4b/93/d4/4b93d4cff0f9c02b49598927f43e316e.jpg",
    },
    booking_schedule: [
      {
        guest: "Liam Huston",
        start_date: "2024-11-01T00:00:00",
        end_date: "2024-11-03T00:00:00",
      },
      {
        guest: "Mandy Till",
        start_date: "2024-11-04T00:00:00",
        end_date: "2024-11-05T00:00:00",
      },
      {
        guest: "Nora J",
        start_date: "2024-11-13T00:00:00",
        end_date: "2024-11-16T00:00:00",
      },
    ],
  },
  {
    room: {
      name: "Lux Double",
      img: "https://www.shutterstock.com/image-illustration/modern-interior-living-room-features-260nw-2515213679.jpg",
    },
    booking_schedule: [
      {
        guest: "Li Chang",
        start_date: "2024-11-01T00:00:00",
        end_date: "2024-11-04T00:00:00",
      },
      {
        guest: "Liam Huston",
        start_date: "2024-11-05T00:00:00",
        end_date: "2024-11-06T00:00:00",
      },
      {
        guest: "Rosalie Hamsworth",
        start_date: "2024-11-06T00:00:00",
        end_date: "2024-11-08T00:00:00",
      },
      {
        guest: "Nora J",
        start_date: "2024-11-13T00:00:00",
        end_date: "2024-11-16T00:00:00",
      },
    ],
  },
];

const monthAllDays = ref<Date[]>([]);
interface Month {
  month: number;
  year: number;
}
const selectedMonth = ref<Month>({
  month: new Date().getMonth(),
  year: new Date().getFullYear(),
});
const getDayOfWeek = (date: Date): string => {
  return format(date, "EEEE");
};
const getDateOfWeek = (date: Date): string => {
  return format(date, "d");
};
const isDateInRange = (start: string, end: string, day: Date): boolean => {
  const startDate = new Date(start).getTime();
  const endDate = new Date(end).getTime();
  const dayDate = new Date(day).getTime();
  return dayDate >= startDate && dayDate <= endDate;
};
const getCellClass = (day: Date): { holiday: boolean; today: boolean } => {
  return {
    holiday: isHoliday(day),
    today: isToday(day),
  };
};
const getDaysDifference = (start: string, end: string): number => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  return Math.floor(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
  );
};
const isToday = (day: Date): boolean => {
  const today = new Date();
  return day.toDateString() === today.toDateString();
};
const isHoliday = (date: Date) => {
  if (isNaN(date.getTime())) {
    return false;
  }
  return [0, 6].includes(date.getDay());
};
const isFirstOrLastDayInEvent = (date: string, day: Date): boolean => {
  return new Date(date).toDateString() === new Date(day).toDateString();
};

const getAllDaysInMonth = (selectedMonth: Month): Date[] => {
  const { month, year } = selectedMonth;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  return Array.from(
    { length: daysInMonth },
    (_, i) => new Date(year, month, i + 1),
  );
};

watch(selectedMonth, (newValue, oldValue) => {
  if (newValue.month === oldValue.month && newValue.year === oldValue.year) {
    return;
  }
  monthAllDays.value = getAllDaysInMonth(newValue);
});
onMounted(() => {
  console.log(selectedMonth.value);
  monthAllDays.value = getAllDaysInMonth(selectedMonth.value);
  console.log(monthAllDays.value);
});
</script>

<template>
  <div>
    <VueDatePicker month-picker v-model="selectedMonth"></VueDatePicker>
  </div>
  <div ref="scheduler" class="scheduler">
    <div class="scheduler__wrapper-body position-relative">
      <div class="scheduler__aside">
        <div class="scheduler__aside-header"></div>
        <div v-for="el in data" class="scheduler__aside-row">
          <div class="user-info">
            <div class="avatar">
              <div
                class="avatar-box"
                :style="{
                  backgroundImage: `url(${el.room.img || '/src/assets/vue.svg'})`,
                }"
              ></div>
            </div>
            <div>
              <span>{{ el.room.name }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="scheduler__main-block">
        <div class="scheduler__header">
          <div
            v-for="day in monthAllDays"
            class="week-day"
            :class="getCellClass(day)"
          >
            <h6>{{ getDateOfWeek(day) }}</h6>
            <span>{{ getDayOfWeek(day) }}</span>
          </div>
        </div>
        <div v-for="el in data" :key="el.room.name" class="scheduler__main-row">
          <div
            v-for="day in monthAllDays"
            class="main-row-cell"
            :class="[getCellClass(day)]"
          >
            <div v-for="item in el.booking_schedule">
              <template
                v-if="isDateInRange(item.start_date, item.end_date, day)"
              >
                <div
                  :class="[
                    isFirstOrLastDayInEvent(item.start_date, day)
                      ? 'first-date'
                      : '',
                    isFirstOrLastDayInEvent(item.end_date, day)
                      ? 'last-date'
                      : '',
                  ]"
                >
                  <div class="event-marker"></div>
                  <span
                    :class="
                      getDaysDifference(item.start_date, item.end_date) > 1
                        ? 'full-guest-name'
                        : ''
                    "
                    class="guest-name"
                  >
                    {{ item.guest }}
                  </span>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
