<template>
  <slot v-if="pending" name="pending" />
  <slot v-else-if="error" name="rejected" :error="error" />
  <slot v-else-if="result" name="fulfilled" :result="result" />
</template>

<script>

import {fetchMeetupById} from "../../../02-components/07-PageMeetup/meetupService";

export default {
  name: 'PromiseWrapper',

  props: {
    promise: {
      type: Promise,
      required: true,
    },
  },

  data() {
    return {
      error: undefined,
      result: undefined,
      pending: true,
    };
  },

  watch: {
    promise: {
      immediate: true,
      handler() {
        this.pending = true
        this.promise.then(
          result => {
            this.result = result
            this.error = undefined
            this.pending = false
          },
          error => {
            this.error = error
            this.result = undefined
            this.pending = false
          }
        )
      }
    },
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
  }
};
</script>
