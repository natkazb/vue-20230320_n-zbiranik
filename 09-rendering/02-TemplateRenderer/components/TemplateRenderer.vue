<script>
import { compile, h } from 'vue';

export default {
  name: 'TemplateRenderer',

  //components: () => this.components,

  props: {
    template: {
      type: String,
      required: true,
    },

    bindings: {
      type: Object,
      default: () => ({}),
    },

    components: {
      type: [Object, Array],
      default: () => [],
    },
  },

  methods: {
    camelize(str) {
      return str
        .split('-') // разбивает 'my-long-word' на массив ['my', 'long', 'word']
        .map(
          (word, index) => word[0].toUpperCase() + word.slice(1)
        )
        .join(''); // соединяет ['my', 'Long', 'Word'] в 'myLongWord'
    }
  },

  render() {
    return h({render: compile(this.template, {isCustomElement: (tag) => !!this.components[this.camelize(tag)]}), props: {bindings: this.bindings}}, {bindings: this.bindings});
  },

};
</script>
