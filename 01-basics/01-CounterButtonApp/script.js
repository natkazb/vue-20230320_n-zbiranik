import { createApp } from './vendor/vue.esm-browser.js';
const Data = {
  data() {
    return {
      counter: 0
    }
  },
  methods: {
    inc() {
      this.counter++;
    }
  }
}
// Создайте Vue приложение
createApp(Data).mount('#app')
