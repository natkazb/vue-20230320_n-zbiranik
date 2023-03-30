import { defineComponent } from '../vendor/vue.esm-browser.js';
import { agendaItemIcons, agendaItemDefaultTitles } from '../meetupService.js';

export default defineComponent({
  name: 'MeetupAgendaItem',
  props: {
    agendaItem: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  computed: {
    imgIcon() {
      return agendaItemIcons[this.agendaItem.type] ? `/assets/icons/icon-${agendaItemIcons[this.agendaItem.type]}.svg` : ''
    },
    imgAlt() {
      return this.agendaItem.type || ''
    },
    title() {
      return this.agendaItem.title || agendaItemDefaultTitles[this.agendaItem.type] || ''
    },
    description() {
      return this.agendaItem.description || false
    },
    isTalk() {
      return this.agendaItem.type === 'talk'
    },
    speaker() {
      return this.agendaItem.speaker || ''
    },
    language() {
      return this.agendaItem.language || ''
    },
    times() {
      return `${this.agendaItem.startsAt || ''} - ${this.agendaItem.endsAt || ''}`;
    }
  },

  template: `
    <div class="agenda-item">
      <div class="agenda-item__col">
        <img :src="imgIcon" class="icon" :alt="imgAlt" />
      </div>
      <div class="agenda-item__col">{{ times }}</div>
      <div class="agenda-item__col">
        <h3 class="agenda-item__title">{{ title }}</h3>
        <p v-if="isTalk" class="agenda-item__talk">
          <span>{{ speaker }}</span>
          <span class="agenda-item__dot"></span>
          <span class="agenda-item__lang">{{ language }}</span>
        </p>
        <p v-if="description">{{ description }}</p>
      </div>
    </div>`,
});
