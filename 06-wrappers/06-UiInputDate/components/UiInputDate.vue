<template>
  <UiInput :type="type" :step="step" :modelValue="value" @input="handleInput">
    <template v-for="slotName in Object.keys($slots)" #[slotName]>
      <slot :name="slotName" />
    </template>
  </UiInput>
</template>

<script>
import UiInput from './UiInput.vue';

export default {
  name: 'UiInputDate',
  components: { UiInput },
  props: {
    type: {
      type: String,
      default: 'date',
      validator(value) {
        return ['date', 'time', 'datetime-local'].includes(value)
      }
    },
    modelValue: {
      type: Number,
      default: null,
    },
    step: {
      type: [Number, String],
    },
  },
  emits: ['update:modelValue'],
  computed: {
    value() {
      if (this.modelValue === null) {
        return ''
      }
      const currentDate = new Date(this.modelValue)
      const utc = new Date(currentDate.getTime() + currentDate.getTimezoneOffset() * 60000)
      if (this.type === 'date') {
        return currentDate.toISOString().split('T')[0]
      } else if (this.type === 'time') {
        return utc.toTimeString().substring(0, 5)
      } else {
        const datePart = currentDate.toISOString().split('T')[0]
        const timePart = utc.toTimeString().substring(0, 5)
        return `${datePart}T${timePart}`
      }
    },
  },
  methods: {
    handleInput($event) {
      this.$emit('update:modelValue', $event.target.valueAsNumber);
    },
  },
};
</script>
