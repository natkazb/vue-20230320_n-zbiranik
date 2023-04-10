<template>
  <div class="toasts">
    <OneToast v-for="(toast, index) in toasts" :key="index" :type="toast.type" :message="toast.message" />
  </div>
</template>

<script>
import OneToast from './OneToast.vue';

export default {
  name: 'TheToaster',

  delay: 5000,

  data() {
    return {
      toasts: []
    };
  },

  components: { OneToast },

  methods: {
    success(message) {
      this.toasts.push({
        message,
        type: 'success'
      });
      setTimeout(() => {
        this.toasts.splice(0, 1);
      }, this.$options.delay);
    },

    error(message) {
      this.toasts.push({
        message,
        type: 'error'
      });
      setTimeout(() => {
        this.toasts.splice(0, 1);
      }, this.$options.delay);
    }
  },
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}
</style>
