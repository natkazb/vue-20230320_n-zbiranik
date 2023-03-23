import { createApp } from './vendor/vue.esm-browser.js';
const OPERATORS = {
  sum: "sum",
  subtract: "subtract",
  multiply: "multiply",
  divide: "divide",
}
const Data = {
  data() {
    return {
      value1: 0,
      value2: 0,
      operator: null
    }
  },
  computed: {
    calcValue() {
      let value = 0
      switch (this.operator) {
        case OPERATORS.sum:
          value = this.value1 + this.value2
          break;
        case OPERATORS.subtract:
          value = this.value1 - this.value2
          break;
        case OPERATORS.multiply:
          value = this.value1 * this.value2
          break;
        case OPERATORS.divide:
          value = this.value1 / this.value2
          break;
        default:
          console.log('Оператор не выбран')
      }
      return value
    }
  }
}
// Создайте Vue приложение
createApp(Data).mount('#app')
