<template>
  <UiCalendarView :meetups="meetups">
    <template #default="{ meetup }">
      <UiCalendarEvent v-if="meetup" tag="a" :href="`/meetups/${meetup.id}`">
        {{ meetup.title }}
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
};
</script>

<style scoped></style>
