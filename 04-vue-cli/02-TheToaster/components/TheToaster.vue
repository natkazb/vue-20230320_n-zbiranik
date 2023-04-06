<template>
  <div class="toasts">
    <OneToast v-for="(toast, index) in toasts" :key="index" :show="toast.show" :type="toast.type" :message="toast.message" />
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
      const count = this.toasts.push({
        message,
        type: 'success',
        show: true
      });
      setTimeout(() => {
        this.toasts[count-1].show = false;
      }, this.$options.delay);
    },

    error(message) {
      const count = this.toasts.push({
        message,
        type: 'error',
        show: true
      });
      setTimeout(() => {
        this.toasts[count-1].show = false;
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

.toast {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
}

.toast + .toast {
  margin-top: 20px;
}

.toast__icon {
  margin-right: 12px;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}
</style>
