import { defineComponent } from '../vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import MeetupView from '../../06-MeetupView/components/MeetupView.js';
import { fetchMeetupById } from '../meetupService.js';

export default defineComponent({
  name: 'PageMeetup',
  props: {
    meetupId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      meetup: {
        id: null,
        title: '',
        description: '',
        imageId: null,
        image: null,
        date: 0,
        organizer: '',
        place: '',
        agenda: []
      },
      loading: true,
      error: '',
    }
  },
  components: {
    UiAlert,
    UiContainer,
    MeetupView
  },
  watch: {
    meetupId: {
      immediate: true,
      async handler() {
        try {
          this.loading = true
          this.error = ''
          this.meetup = await fetchMeetupById(this.meetupId)
        } catch(err) {
          this.error = err.message
        }
        this.loading = false
      },
    }
  },

  template: `
    <div class="page-meetup">
      <meetup-view v-if="!loading && !error" :meetup="meetup" />

      <UiContainer v-if="loading">
        <UiAlert>Загрузка...</UiAlert>
      </UiContainer>

      <UiContainer v-if="error">
        <UiAlert>{{ error }}</UiAlert>
      </UiContainer>
    </div>`,
});
