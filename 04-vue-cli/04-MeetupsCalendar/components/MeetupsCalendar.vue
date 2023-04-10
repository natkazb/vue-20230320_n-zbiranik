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
      <div v-for="(date, index) in dates" class="calendar-view__cell" :class="{'calendar-view__cell_inactive': !date.active}" :tabindex="index">
        <div class="calendar-view__cell-day">{{ date.day }}</div>
        <div class="calendar-view__cell-content">
          <a v-for="meetup in date.meetups" :href="`/meetups/${meetup.id}`" class="calendar-event">{{ meetup.title }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MeetupsCalendar',

  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      currentMonth: new Date(new Date().setDate(1))
    };
  },

  computed: {
    titleMonth() {
      return new Date(this.currentMonth).toLocaleDateString(navigator.language, {
        month: 'long',
        year: 'numeric',
      })
    },
    dates() {
      const mapDays = {0: 7, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6}
      const lastDayMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 0)
      const days = lastDayMonth.getDate()
      let dates = new Array(days)
      const currentMonthMeetups = this.meetups.filter(elem => elem.date > this.currentMonth && elem.date < lastDayMonth)
      for (let i=0; i<days; i++) {
        dates[i] = {
          day: i+1,
          active: true,
          meetups: []
        }
      }
      currentMonthMeetups.forEach((element) => {
        const day = new Date(element.date).getDate()
        dates[day-1].meetups.push(element)
      })
      const firstDay = mapDays[this.currentMonth.getDay()]
      let lastDayPrevMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth(), 0).getDate()
      // добавить в начало дни предыдущего месяца
      for (let i=0; i<(firstDay-1); i++) {
        dates.unshift({
          day: lastDayPrevMonth--,
          active: false,
        })
      }
      const lastDay = mapDays[lastDayMonth.getDay()]
      // добавить в конец дни следующего месяца
      for (let i=0; i<(7-lastDay); i++) {
        dates.push({
          day: i+1,
          active: false,
        })
      }
      return dates
    }
  },

  methods: {
    prevMonth() {
      this.currentMonth = new Date(this.currentMonth.setMonth(this.currentMonth.getMonth()-1));
    },
    nextMonth() {
      this.currentMonth = new Date(this.currentMonth.setMonth(this.currentMonth.getMonth()+1));
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

.calendar-event {
  --max-lines: 2;
  --line-height: 16px;

  display: block;
  text-align: left;
  text-decoration: none;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 14px;
  font-weight: 600;
  line-height: var(--line-height);
  color: var(--white);
  padding: 4px 6px;
  border-radius: 2px;
  background-color: var(--blue);
  margin-top: 4px;
}

@media all and (min-width: 767px) {
  .calendar-event {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    max-height: calc(var(--max-lines) * var(--line-height) + 6px);
  }
}
</style>
