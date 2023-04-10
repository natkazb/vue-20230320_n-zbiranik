<template>
  <div class="toast" :class="typeClass" >
      <UiIcon class="toast__icon" :icon="icon" />
      <span>{{ message }}</span>
    </div>
</template>

<script>
import UiIcon from './UiIcon.vue';

export default {
  name: 'OneToast',

  props: {
    type: {
      type: String,
      default: ''
    },
    message: {
      type: String,
      default: ''
    }
  },

  components: { UiIcon },

  computed: {
    typeClass() {
      return {
        'toast_success': this.type === 'success',
        'toast_error': this.type === 'error'
      };
    },
    icon() {
      let iconType = ''
      switch(this.type) {
        case 'success': iconType = 'check-circle';
          break;
        case 'error': iconType = 'alert-circle';
          break;
        default: break;
      }
      return iconType;
    }
  }

};
</script>

<style scoped>
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
