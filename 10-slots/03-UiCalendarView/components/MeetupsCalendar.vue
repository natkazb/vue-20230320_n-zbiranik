<template>
  <UiCalendarView :dates="dates" v-model="currentMonth">
    <template #default="{ event }">
      <UiCalendarEvent v-if="event" tag="a" :href="`/meetups/${event.id}`">
        {{ event.title }}
      </UiCalendarEvent>
    </template>
  </UiCalendarView>
</template>

<script>
import UiCalendarView from './UiCalendarView.vue';
import UiCalendarEvent from './UiCalendarEvent.vue';

export default {
  name: 'MeetupsCalendar',

  components: {
    UiCalendarEvent,
    UiCalendarView,
  },

  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      currentMonth: new Date(new Date().getFullYear(), new Date().getMonth(), 1, 0, 0, 0, 0),
    };
  },

  computed: {
    dates() {
      const lastDayMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 0, 23,59,59,0)
      const days = lastDayMonth.getDate()
      const newDates = new Array(days)
      const currentMonthMeetups = this.meetups.filter(elem => elem.date >= this.currentMonth && elem.date <= lastDayMonth)
      for (let i=0; i<days; i++) {
        newDates[i] = {
          day: i+1,
          active: true,
          events: []
        }
      }
      currentMonthMeetups.forEach((element) => {
        const day = new Date(element.date).getDate()
        newDates[day-1].events.push(element)
      })
      return newDates
    },
  },
};
</script>

<style scoped></style>
