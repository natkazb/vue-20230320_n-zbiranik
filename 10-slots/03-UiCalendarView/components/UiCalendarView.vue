<template>
  <div class="calendar-view">
    <div class="calendar-view__controls">
      <div class="calendar-view__controls-inner">
        <button class="calendar-view__control-left" type="button" @click="prevMonth()" aria-label="Previous month"></button>
        <div class="calendar-view__date">{{ titleMonth }}</div>
        <button class="calendar-view__control-right" type="button" @click="nextMonth()" aria-label="Next month"></button>
      </div>
    </div>

    <div class="calendar-view__grid">
      <div v-for="(date, index) in formatDates" class="calendar-view__cell" :class="{'calendar-view__cell_inactive': !date.active}" :tabindex="index" :key="index">
        <div class="calendar-view__cell-day">{{ date.day }}</div>
        <div class="calendar-view__cell-content">
          <template v-for="event in date.events">
            <slot :event="event" />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {klona} from "klona";

const MAP_DAYS = {0: 7, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6}

export default {
  name: 'UiCalendarView',

  emits: ['update:modelValue'],

  props: {
    dates: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      currentMonth: new Date(new Date().getFullYear(), new Date().getMonth(), 1, 0, 0, 0, 0)
    };
  },

  computed: {
    titleMonth() {
      return new Date(this.currentMonth).toLocaleDateString(navigator.language, {
        month: 'long',
        year: 'numeric',
      })
    },
    formatDates() {
      //console.log(this.dates)
      const lastDayMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 0, 23,59,59,0)
      const firstDay = MAP_DAYS[this.currentMonth.getDay()]
      let newDates = klona(this.dates)
      let lastDayPrevMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth(), 0).getDate()
      // добавить в начало дни предыдущего месяца
      for (let i=0; i<(firstDay-1); i++) {
        newDates.unshift({
          day: lastDayPrevMonth--,
          active: false,
        })
      }
      const lastDay = MAP_DAYS[lastDayMonth.getDay()]
      // добавить в конец дни следующего месяца
      for (let i=0; i<(7-lastDay); i++) {
        newDates.push({
          day: i+1,
          active: false,
        })
      }
      return newDates
    }
  },

  methods: {
    prevMonth() {
      this.currentMonth = new Date(this.currentMonth.setMonth(this.currentMonth.getMonth()-1));
      this.$emit('update:modelValue', this.currentMonth);
    },
    nextMonth() {
      this.currentMonth = new Date(this.currentMonth.setMonth(this.currentMonth.getMonth()+1));
      this.$emit('update:modelValue', this.currentMonth);
    }
  }
};
</script>

<style scoped>
.calendar-view {
}

.calendar-view__controls {
  text-align: center;
  font-weight: 700;
  font-size: 24px;
  line-height: 1;
  color: var(--blue);
  background-color: var(--blue-extra);
  padding: 24px;
  display: flex;
  justify-content: center;
}

.calendar-view__controls-inner {
  max-width: 325px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  text-transform: capitalize;
}

.calendar-view__controls-inner button {
  border: none;
  padding: 0;
}

.calendar-view__control-left,
.calendar-view__control-right {
  width: 30px;
  height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s all;
  background: url('@/assets/icons/icon-pill-active.svg') left center no-repeat;
  background-size: cover;
}

.calendar-view__control-left:hover,
.calendar-view__control-right:hover {
  opacity: 0.8;
}

.calendar-view__control-right {
  transform: rotate(180deg);
}

.calendar-view__grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
}

.calendar-view__grid {
  border: 1px solid var(--grey);
  border-bottom: none;
}

.calendar-view__cell {
  position: relative;
  height: auto;
  padding: 6px 8px;
  background-color: var(--white);
  color: var(--grey-8);
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  border-bottom: 1px solid var(--grey);
  border-left: 1px solid var(--grey);
  text-align: right;
}

.calendar-view__cell.calendar-view__cell_inactive {
  background-color: var(--grey-light);
}

@media all and (max-width: 767px) {
  .calendar-view__cell:nth-child(5n + 1) {
    border-left: none;
  }
}

@media all and (min-width: 767px) {
  .calendar-view__grid {
    grid-template-columns: repeat(7, 1fr);
  }

  .calendar-view__cell {
    height: 144px;
  }

  .calendar-view__cell:nth-child(7n + 1) {
    border-left: none;
  }
}
</style>
