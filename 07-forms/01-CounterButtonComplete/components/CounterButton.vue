<template>
  <button @click="inc">{{ localCount }}</button>
</template>

<script>

export default {
  name: 'CounterButton',
  props: {
    count: {
      type: Number,
      default: 0
    },
  },
  emits: ['update:count'],
  data() {
    return {
      localCount: this.count,
    };
  },
  watch: {
    count(newValue) {
      this.localCount = newValue
    }
  },
  methods: {
    inc() {
      this.localCount++;
      this.$emit('update:count', this.localCount);
    }
  }
};
</script>
