<template>
  <div v-if="show" class="toast" :class="class">
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
    },
    show: {
      type: Boolean,
      default: true
    },
  },

  components: { UiIcon },

  computed: {
    class() {
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