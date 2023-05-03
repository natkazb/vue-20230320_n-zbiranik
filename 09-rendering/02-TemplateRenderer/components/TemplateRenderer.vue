<script>
import { compile, h } from 'vue';

const Temp = {
  name: 'Temp',

  props: {
    template: {
      type: String,
      required: true,
    },
    properties: {
      type: Object,
      default: () => ({}),
    },

    components: {
      type: [Object, Array],
      default: () => [],
    },
  },

  render() {
    return h({render: compile(this.template), components: this.components, props: {bindings: this.properties}}, {bindings: this.properties});
  },
};

export default {
  name: 'TemplateRenderer',

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

  render() {
    return h(Temp, {components: this.components, properties: this.bindings, template: this.template});
  },

};
</script>
