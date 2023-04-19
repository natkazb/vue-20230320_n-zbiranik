<template>
  <form class="meetup-form" @submit.prevent="sendForm">
    <div class="meetup-form__content">
      <fieldset class="meetup-form__section">
        <UiFormGroup label="Название">
          <UiInput name="title" v-model="localMeetup.title"/>
        </UiFormGroup>
        <UiFormGroup label="Дата">
          <UiInputDate type="date" name="date" v-model="localMeetup.date"/>
        </UiFormGroup>
        <UiFormGroup label="Место">
          <UiInput name="place" v-model="localMeetup.place"/>
        </UiFormGroup>
        <UiFormGroup label="Описание">
          <UiInput multiline rows="3" name="description" v-model="localMeetup.description"/>
        </UiFormGroup>
        <UiFormGroup label="Изображение">
          <!--
               Предлагается сохранять файл для будущей загрузки во временное поле imageToUpload
               и передавать в объекте со всеми данными формы
          -->
          <ui-image-uploader
            name="image"
            :preview="localMeetup.image"
            @select="selectFile"
            @remove="localMeetup.imageToUpload = null"
          />
        </UiFormGroup>
      </fieldset>

      <h3 class="meetup-form__agenda-title">Программа</h3>
      <meetup-agenda-item-form v-for="(agendaItem, index) in localMeetup.agenda"
                               :key="agendaItem.id"
                               :agenda-item="localMeetup.agenda[index]"
                               class="meetup-form__agenda-item"
                               @update:agendaItem="updateAgenda" @remove="removeAgenda(index)"
      />
      <div class="meetup-form__append">
        <button class="meetup-form__append-button" type="button" data-test="addAgendaItem" @click="addAgenda">
          + Добавить этап программы
        </button>
      </div>
    </div>

    <div class="meetup-form__aside">
      <div class="meetup-form__aside-stick">
        <!-- data-test атрибуты используются для поиска нужного элемента в тестах, не удаляйте их -->
        <ui-button variant="secondary" block class="meetup-form__aside-button" data-test="cancel" @click="cancel">
          Отмена
        </ui-button>
        <ui-button variant="primary" block class="meetup-form__aside-button" data-test="submit" type="submit">
          {{ submitText }}
        </ui-button>
      </div>
    </div>
  </form>
</template>

<script>
import MeetupAgendaItemForm from './MeetupAgendaItemForm.vue';
import UiButton from './UiButton.vue';
import UiFormGroup from './UiFormGroup.vue';
import UiImageUploader from './UiImageUploader.vue';
import UiInput from './UiInput.vue';
import UiInputDate from './UiInputDate.vue';
import {klona} from 'klona';
import {createAgendaItem} from '../meetupService.js';

export default {
  name: 'MeetupForm',

  components: {
    MeetupAgendaItemForm,
    UiButton,
    UiFormGroup,
    UiImageUploader,
    UiInput,
    UiInputDate,
  },

  props: {
    meetup: {
      type: Object,
      required: true,
    },

    submitText: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      localMeetup: klona(this.meetup)
    };
  },
  emits: ['cancel', 'submit'],
  methods: {
    selectFile(newFile) {
      this.localMeetup.imageToUpload = newFile.name
    },
    sendForm() {
      this.$emit('submit', klona(this.localMeetup))
    },
    cancel() {
      this.$emit('cancel')
    },
    addAgenda() {
      let newItem = createAgendaItem()
      const lastItem = this.localMeetup.agenda.at(-1)
      newItem.startsAt = lastItem ? lastItem.endsAt : newItem.startsAt
      this.localMeetup.agenda.push(newItem)
    },
    updateAgenda(newValue) {
      const index = this.localMeetup.agenda.findIndex(item => item.id === newValue.id);
      this.localMeetup.agenda[index] = newValue
    },
    removeAgenda(index) {
      this.localMeetup.agenda.splice(index, 1)
    }
  }
};
</script>

<style scoped>
.meetup-form__section {
  border: none;
}

.meetup-form__agenda-title {
  font-weight: 700;
  font-size: 28px;
  line-height: 150%;
  color: var(--body-color);
  margin: 0 0 24px 0;
}

.meetup-form__aside {
  margin: 48px 0;
}

.meetup-form__aside-button {
  margin: 0 0 12px 0;
}

.meetup-form__agenda-item + .meetup-form__agenda-item {
  margin-top: 24px;
}

.meetup-form__append {
  margin-top: 24px;
}

.meetup-form__append-button {
  box-shadow: none;
  border: none;
  background-color: transparent;
  padding: 0;
  outline: none;
  color: var(--blue);
  cursor: pointer;
  font-size: 20px;
  line-height: 28px;
}

.meetup-form__append-button:hover {
  text-decoration: underline;
}

@media all and (min-width: 992px) {
  .meetup-form {
    display: flex;
    flex-direction: row;
  }

  .meetup-form__content {
    flex: 1 0 calc(100% - 320px);
  }

  .meetup-form__aside {
    flex: 1 0 320px;
    max-width: 320px;
    width: 100%;
    padding-left: 137px;
    margin: 0;
  }

  .meetup-form__aside-stick {
    position: sticky;
    top: 32px;
  }
}
</style>
